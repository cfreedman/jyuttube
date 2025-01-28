import { TranscriptFetcher, TranscriptTranslator } from "../utils/translation.ts";
import CaptionSearcher from "../utils/searcher.ts";

console.log("Running render");
const videoContainer = document.getElementById("movie_player");

if (!videoContainer) {
  throw new Error("Unable to find video player container in the current document");
}
const video = document.getElementsByTagName("video")[0];

const captionContainer = document.createElement("div");
captionContainer.setAttribute("id", "jyuttube_caption_container");
captionContainer.className = "caption_container";

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

// const normalVideoHeight = videoContainer.clientHeight;
// const fullScreenVideoHeight = window.screen.height;
// captionContainer.style.top =
//   (normalVideoHeight * 0.7).toString() +
//   "px";

// Handle fullscreen changes to reposition caption box - come back to this

// document.addEventListener("fullscreenchange", (event) => {
//   console.log("Switched into or out of fullscreen");
//   if (!document.fullscreenElement) {
//     console.log(document.getElementById("jyuttube_caption_container"));
//     document.getElementById("jyuttube_caption_container").style.top = (normalVideoHeight * 0.75).toString + "px";
//   } else {
//     document.getElementById("jyuttube_caption_container");
//     document.getElementById("jyuttube_caption_container").style.top = (fullScreenVideoHeight * 0.9).toString() +
//   "px";
//   }
// });

interface RenderSettings {
  hanzi: boolean;
  jyutping: boolean;
  pinyin: boolean;
}

const defaultRenderSettings: RenderSettings = {
  hanzi: false,
  jyutping: true,
  pinyin: false,
};

const handleCaptionVisibility = (settings: RenderSettings) => {
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

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local" || Object.prototype.hasOwnProperty.call(changes, "renderSettings")) {
    return;
  }

  handleCaptionVisibility(changes.renderSettings as RenderSettings);
});

const currentTranscript = await new TranscriptFetcher(
  window.location.href
).fetchTranscript();
const translatedTranscript = new TranscriptTranslator(
  currentTranscript
).translate();
const captionSearcher = new CaptionSearcher(translatedTranscript);

video.ontimeupdate = () => {
  for (const child of captionContainer.children) {
    child.innerHTML = captionSearcher.search(video.currentTime)
  }
};

