import { getJyutpingText } from "to-jyutping";
import { YoutubeTranscript, TranscriptResponse } from "youtube-transcript";

class TranscriptFetcher {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async fetchTranscript() {
    const transcript = await YoutubeTranscript.fetchTranscript(this.url);

    return transcript;
  }
}

class TranscriptTranslator {
  transcript: TranscriptResponse[];

  constructor(transcript: TranscriptResponse[]) {
    this.transcript = transcript;
  }

  translate() {
    const result: TranscriptResponse[] = this.transcript.map(
      ({ text, ...rest }) => {
        const split_text = text.split(/(\w+)/).filter(Boolean);
        const translated_text = split_text
          .map((text_block, index) => {
            if (/\w+/.test(text_block)) {
              switch (index) {
                case 0:
                  return text_block + " ";
                case split_text.length - 1:
                  return " " + text_block;
                default:
                  return " " + text_block + " ";
              }
            } else {
              return getJyutpingText(text_block);
            }
          })
          .join("");

        return {
          text: translated_text,
          lang: "jyutping",
          ...rest,
        };
      }
    );

    return result;
  }
}

console.log("Trying to translate");

const currentTranscript = await new TranscriptFetcher(
  window.location.href
).fetchTranscript();
const translatedTranscript = new TranscriptTranslator(
  currentTranscript
).translate();

console.log(translatedTranscript);
