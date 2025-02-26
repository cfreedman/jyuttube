import TranscriptTranslator from "../lib/translation.ts";
import CaptionSearcher from "../lib/searcher.ts";

type LanguageFields = "hanzi" | "jyutping" | "pinyin";

type RenderSettings = {
  [key in LanguageFields]: boolean;
};

const defaultRenderSettings: RenderSettings = {
  hanzi: false,
  jyutping: true,
  pinyin: false,
};

console.log("Running render");
// Should be a single container
const videoContainers = document.getElementsByClassName("html5-video-player");

if (!videoContainers) {
  throw new Error(
    "Unable to find video player container in the current document"
  );
}
const videoContainer = videoContainers[0];
const video = document.getElementsByTagName("video")[0];

const captionContainer = document.createElement("div");
captionContainer.setAttribute("id", "jyuttube_caption_container");
captionContainer.style.display = "flex";
captionContainer.style.position = "absolute";
captionContainer.style.bottom = "0";
captionContainer.style.left = "50%";
captionContainer.style.transform = "translate(-50%,0)";
captionContainer.style.flexDirection = "column";
captionContainer.style.alignItems= "center";
captionContainer.style.justifyContent= "center";
captionContainer.style.backgroundColor= "black";
captionContainer.style.color= "white";
captionContainer.style.fontSize= "18px";
captionContainer.style.zIndex= "5000";
captionContainer.style.width= "fit-content";
captionContainer.style.margin = "0 auto";
videoContainer.appendChild(captionContainer);

const hanziCaptions = document.createElement("p");
const jyutpingCaptions = document.createElement("p");
const pinyinCaptions = document.createElement("p");

for (const element of [hanziCaptions, jyutpingCaptions, pinyinCaptions]) {
  element.style.textAlign = "center";
  element.style.margin = "2px 0px";
  captionContainer.appendChild(element);
}

// Add in full-screen / wide-screen event listening changes here

const handleCaptionVisibility = (settings: RenderSettings) => {
  hanziCaptions.style.display = settings.hanzi ? "block" : "none";
  jyutpingCaptions.style.display = settings.jyutping ? "block" : "none";
  pinyinCaptions.style.display = settings.pinyin ? "block" : "none";
};

const fetchSettings = async () => {
  const settings = await chrome.storage.local
    .get("renderSettings")
    .then((value) => {
      return Object.prototype.hasOwnProperty.call(value, "renderSettings")
        ? value.renderSettings
        : defaultRenderSettings;
    });
  
  console.log("Setting caption visibility");
  console.log(settings);
  handleCaptionVisibility(settings);
};

fetchSettings();

chrome.runtime.onMessage.addListener(
  (message, _sender, sendResponse) => {
    console.log(`Received message and updating caption visibility with settings ${message}`);
    handleCaptionVisibility(message);
    sendResponse("Settings message successfully received");
  }
)

const translator = new TranscriptTranslator();
const initializeTranslator = async () => {
  await translator.init(window.location.href);

  return translator.translate();
};

initializeTranslator()
  .then((translation) => {
    const searcher = new CaptionSearcher(translation);

    video.ontimeupdate = () => {
      const timestampTranslation = searcher.search(video.currentTime);

      hanziCaptions.innerHTML = timestampTranslation.hanzi;
      jyutpingCaptions.innerHTML = timestampTranslation.jyutping;
      pinyinCaptions.innerHTML = timestampTranslation.pinyin;
    };
  })
  .catch((err) =>
    console.log(`Unable to initialize translator with error ${err}`)
  );
