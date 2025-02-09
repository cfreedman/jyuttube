import { TranscriptTranslation, TranslationBlock } from "./translation";

export default class CaptionSearcher {
  #transcript: TranscriptTranslation[];

  constructor(transcript: TranscriptTranslation[]) {
    this.#transcript = transcript;
  }

  search(timestamp: number): TranslationBlock {
    const timestampBlock = this.#transcript.find(
      (block) =>
        timestamp >= block.offset && timestamp <= block.offset + block.duration
    );

    return timestampBlock
      ? timestampBlock.translation
      : { hanzi: "", jyutping: "", pinyin: "" };
  }
}
