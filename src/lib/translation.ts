import { getJyutpingText } from "to-jyutping";
import pinyin from "pinyin";
import { YoutubeTranscript, TranscriptResponse } from "youtube-transcript";

import { LanguageFields } from "./settings";

type TranslationBlock = {
  [key in LanguageFields]: string;
};

export interface TranscriptTranslation extends Pick<TranscriptResponse, "duration" | "offset"> {
  translation: TranslationBlock;
}

export default class TranscriptTranslator {
  transcript: TranscriptResponse[];

  constructor() {
    this.transcript = [];
  }

  async init(url: string) {
    const transcript = await YoutubeTranscript.fetchTranscript(url);

    this.transcript = transcript;
  }

  translate() {
    const result: TranscriptTranslation[] = this.transcript.map(
      ({ text, duration, offset }) => {
        const split_text = text.split(/(\w+)/).filter(Boolean);
        const translation = split_text
          .map((text_block, index) => {
            if (/\w+/.test(text_block)) {
              const text = (() => {switch (index) {
                case 0:
                  return text_block + " ";
                case split_text.length - 1:
                  return " " + text_block;
                default:
                  return " " + text_block + " ";
              }})()

              const hanzi_text = text;
              const jyutping_text = text;
              const pinyin_text = text;
              return { hanzi: hanzi_text, jyutping: jyutping_text, pinyin: pinyin_text } as TranslationBlock
            } else {
              const hanzi_text = text_block;
              const jyutping_text = getJyutpingText(text_block);
              const pinyin_text = pinyin(text_block, { heteronym: false, group: true }).flat()[0];
              return { hanzi: hanzi_text, jyutping: jyutping_text, pinyin: pinyin_text } as TranslationBlock
            }
          })
          .reduce((accumulated_translation: TranslationBlock, next_block: TranslationBlock): TranslationBlock => {
            return {
              hanzi: accumulated_translation.hanzi + next_block.hanzi,
              jyutping: accumulated_translation.jyutping + next_block.jyutping,
              pinyin: accumulated_translation.pinyin + next_block.pinyin,
            }
          });

        return {
          translation,
          duration,
          offset
        };
      }
    );

    return result;
  }
}

console.log("Trying to translate");

// const currentTranscript = await new TranscriptFetcher(
//   window.location.href
// ).fetchTranscript();
// const translatedTranscript = new TranscriptTranslator(
//   currentTranscript
// ).translate();

// console.log(translatedTranscript);
