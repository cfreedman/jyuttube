import { TranscriptTranslation } from "./translation";

export default class CaptionSearcher {
  #transcript: TranscriptTranslation[];

  constructor(transcript: TranscriptTranslation[]) {
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
        return this.#transcript[mid].translation;
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