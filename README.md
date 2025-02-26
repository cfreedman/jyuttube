# Jyuttube

Jyuttube is a Chrome extension developed primarily for the transliteration of Chinese character Youtube captions in their romanized English counterparts.
Available romanization standards are [Jyutping](https://en.wikipedia.org/wiki/Jyutping), the most popular method for writing Cantonese using the Roman alphabet, and [Pinyin](https://en.wikipedia.org/wiki/Pinyin), the standard Mandarin romanization method.

My initial motivation in developing this tool was to aid in Chinese language learners using Youtube to casually watch or use as a primary source of language input in their language learning endeavors. For those using the [comprehensible input](https://en.wikipedia.org/wiki/Input_hypothesis) method for language learning, getting into a flow for listening is critical for reaching a consistent quantity of listening time per day/week/month to progress in your fluency goals.

For Chinese languages specifically, an obstacle to this can be the disconnect between learners' character recognition and overall vocabulary, since they may **_know_** (or at least be able to recognize) a word in speech but not know the its character in written form. In the midst of listening, needing to stop and look up a singular word that you otherwise in isolation knew and perhaps only needed a visual clue to recognize can be a common occurrence leading to cumulative disruption and time inefficiency.

My hope is that offering romanization visuals captioned videos will bridge the gap for learners whose oral vocabulary outstrips their written one, and it hopefully gives them a crutch to gain more continuous comprehension of videos and minimize disruption.

### Usage

The displayed captions can be customized using the three switches in the popup windows for the Chrome extension. Available text captions are the original hanzi characters, Jyutping, and Pinyin. You can choose any combination of the three to view, and the settings will be saved to your local browser storage.

Captions should appear in the center-bottom position of Youtube videos with qualifying, Chinese character captions. Note that videos without attached captions (i.e. without the option to "Show Transcript" in the bottom of the video description panel) are not compatible with this extension. That includes Youtube, auto-generated captions, user-submitted captions (I believe), and captions editted into the actual video frame by the video uploader (although I hope to work in the future on an extension feature for this last case).

**NOTE - Extension will not currently work in Youtube fullscreen mode due to Youtube automatically despawning and reconstructed portions of the DOM tree - hopefully working on a fix for this in the future**

### Running Locally

For those wishing to run the extension and possibly hack on it themselves in a local environment, it is based on a `create-vite` project framework. You can make and view changes only to the popup portion of the extension by running `npm run dev` to start the dev server.

In order to run the entire extension locally, you must build the project using `npm run build`, and then follow to the instructions detailed [here](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world) for uploading the `dist` folder into your local Chrome extensions.

**Thanks for your attention and hope this is useful to you!**
