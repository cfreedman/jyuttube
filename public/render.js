// import { TranscriptResponse } from "youtube-transcript";

// import { TranscriptFetcher, TranscriptTranslator } from "./translation.ts";

console.log("Running render");
const videoContainer = document.getElementById("movie_player");

if (!videoContainer) {
  throw new Error("Unable to find video player container in the current document");
}
const video = document.getElementsByTagName("video")[0];

const captionContainer = document.createElement("div");
captionContainer.setAttribute("id", "jyuttube_caption_container");

captionContainer.style.display = "flex";
captionContainer.style.flexDirection = "column";
captionContainer.style.alignItems = "center";
captionContainer.style.justifyContent = "center";
captionContainer.style.backgroundColor = "black";
captionContainer.style.color = "white";
captionContainer.style.fontSize = "24px";
captionContainer.style.position = "relative";
captionContainer.style.zIndex = "5000";
captionContainer.style.width = "fit-content";
captionContainer.style.margin = "0 auto";

const normalVideoHeight = videoContainer.clientHeight;
const fullScreenVideoHeight = window.screen.height;
captionContainer.style.top =
  (normalVideoHeight * 0.7).toString() +
  "px";

document.addEventListener("fullscreenchange", (event) => {
  console.log("Switched into or out of fullscreen");
  if (!document.fullscreenElement) {
    console.log(document.getElementById("jyuttube_caption_container"));
    document.getElementById("jyuttube_caption_container").style.top = (normalVideoHeight * 0.75).toString + "px";
  } else {
    document.getElementById("jyuttube_caption_container");
    document.getElementById("jyuttube_caption_container").style.top = (fullScreenVideoHeight * 0.9).toString() +
  "px";
  }
});

const hanziCaptions = document.createElement("p");
const jyutpingCaptions = document.createElement("p");
const pinyinCaptions = document.createElement("p");
hanziCaptions.innerText = "This is where the hanzi caption will go.";
jyutpingCaptions.innerText = "This is where the jyutping caption will go.";
pinyinCaptions.innerText = "This is where the pinyin caption will go.";

captionContainer.appendChild(hanziCaptions);
captionContainer.appendChild(jyutpingCaptions);
captionContainer.appendChild(pinyinCaptions);
videoContainer.appendChild(captionContainer);


// video.ontimeupdate = () => {
//   captionContainer.innerHTML = captionSearcher.search(video.currentTime);
// };

// interface RenderSettings {
//   hanzi: boolean;
//   jyutping: boolean;
//   pinyin: boolean;
// }

// type LanguageFields = "hanzi" | "jyutping" | "pinyin";

const defaultRenderSettings = {
  hanzi: false,
  jyutping: true,
  pinyin: false,
};

const handleCaptionVisibility = (settings) => {
  hanziCaptions.style.visibility = settings.hanzi.toString();
  hanziCaptions.style.visibility = settings.jyutping.toString();
  hanziCaptions.style.visibility = settings.pinyin.toString();

}

const fetchSettings = async () => {
  const settings = await chrome.storage.local.get("renderSettings").then((value) => {
    return Object.prototype.hasOwnProperty.call(
      value,
      "renderSettings"
    )
      ? value.renderSettings
      : defaultRenderSettings;
  });

  handleCaptionVisibility(settings);
};

fetchSettings();

const settingsListener = (changes, area) => {
  if (area !== "local" || Object.prototype.hasOwnProperty.call(changes, "renderSettings")) {
    return;
  }

  handleCaptionVisibility(changes.renderSettings);
}

chrome.storage.onChanged.addListener(settingsListener);


// class CaptionSearcher {
//   #transcript: TranscriptResponse[];

//   constructor(transcript: TranscriptResponse[]) {
//     this.#transcript = transcript;
//   }

//   search(timestamp: number) {
//     let left = 0;
//     let right = this.#transcript.length - 1;

//     while (left <= right) {
//       const mid = (left + right) / 2;

//       if (
//         this.#transcript[mid].offset <= timestamp &&
//         timestamp <=
//           this.#transcript[mid].offset + this.#transcript[mid].duration
//       ) {
//         return this.#transcript[mid].text;
//       } else if (this.#transcript[mid].offset > timestamp) {
//         right = mid - 1;
//       } else if (
//         this.#transcript[mid].offset + this.#transcript[mid].duration <
//         timestamp
//       ) {
//         left = mid + 1;
//       }
//     }

//     return "";
//   }
// }

// const currentTranscript = await new TranscriptFetcher(
//   window.location.href
// ).fetchTranscript();
// const translatedTranscript = new TranscriptTranslator(
//   currentTranscript
// ).translate();
// console.log(translatedTranscript);
// const captionSearcher = new CaptionSearcher(translatedTranscript);

