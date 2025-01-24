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
