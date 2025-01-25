import { TranscriptResponse } from "youtube-transcript";

import { TranscriptFetcher, TranscriptTranslator } from "./translation.ts";

console.log("Running render");
const captionBox = document.createElement("p");
captionBox.innerText = "This is where the caption will go.";

const video = document.getElementsByTagName("video")[0];
const videoHeight = video.style.height;

captionBox.style.backgroundColor = "black";
captionBox.style.color = "white";
captionBox.style.fontSize = "24px";
captionBox.style.position = "relative";
captionBox.style.zIndex = "5000";
captionBox.style.width = "fit-content";
captionBox.style.margin = "0 auto";
captionBox.style.top =
  (Number(videoHeight.substring(0, videoHeight.length - 2)) * 0.8).toString() +
  "px";

video.insertAdjacentElement("afterend", captionBox);

video.ontimeupdate = () => {
  captionBox.innerHTML = captionSearcher.search(video.currentTime);
};

class CaptionSearcher {
  #transcript: TranscriptResponse[];

  constructor(transcript: TranscriptResponse[]) {
    this.#transcript = transcript;
  }

  search(timestamp: number) {
    let left = 0;
    let right = this.#transcript.length - 1;

    while (left <= right) {
      const mid = (left + right) / 2;

      if (
        this.#transcript[mid].offset <= timestamp &&
        timestamp <=
          this.#transcript[mid].offset + this.#transcript[mid].duration
      ) {
        return this.#transcript[mid].text;
      } else if (this.#transcript[mid].offset > timestamp) {
        right = mid - 1;
      } else if (
        this.#transcript[mid].offset + this.#transcript[mid].duration <
        timestamp
      ) {
        left = mid + 1;
      }
    }

    return "";
  }
}

const currentTranscript = await new TranscriptFetcher(
  window.location.href
).fetchTranscript();
const translatedTranscript = new TranscriptTranslator(
  currentTranscript
).translate();
console.log(translatedTranscript);
const captionSearcher = new CaptionSearcher(translatedTranscript);
