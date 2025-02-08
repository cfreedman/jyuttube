import TranscriptTranslator from "../lib/translation.ts";
// import CaptionSearcher from "../lib/searcher.ts";

type LanguageFields = "hanzi" | "jyutping" | "pinyin";

type RenderSettings =  {
  [key in LanguageFields]: boolean;
}

const defaultRenderSettings: RenderSettings = {
  hanzi: false,
  jyutping: true,
  pinyin: false,
};

console.log("Running render");
const videoContainer = document.getElementById("movie_player");

if (!videoContainer) {
  throw new Error("Unable to find video player container in the current document");
}
// const video = document.getElementsByTagName("video")[0];

const captionContainer = document.createElement("div");
captionContainer.setAttribute("id", "jyuttube_caption_container");
captionContainer.className = "captionContainer";

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


const translator = new TranscriptTranslator();
const initializeTranslator = async () => {
  await translator.init(window.location.href);

  const translation = translator.translate();
  for (const child of captionContainer.children) {
    child.innerHTML = translation[0].translation.hanzi;
  }
}

initializeTranslator();


// const translation = translator.translate();
// for (const child of captionContainer.children) {
//   child.innerHTML = translation[0].translation.hanzi;
// }

// const searcher = new CaptionSearcher(translation);

// video.ontimeupdate = () => {
//   for (const child of captionContainer.children) {
//     child.innerHTML = captionSearcher.search(video.currentTime)
//   }
// };

