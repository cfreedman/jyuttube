import { useState } from "react";

import Logo from "./components/Logo";
import SettingsMenu from "./components/SettingsMenu";

interface RenderSettings {
  hanzi: boolean;
  jyutping: boolean;
  pinyin: boolean;
}

type LanguageFields = "hanzi" | "jyutping" | "pinyin";

const defaultRenderSettings: RenderSettings = {
  hanzi: false,
  jyutping: true,
  pinyin: false,
};

function App() {
  const [settings, setSettings] = useState(defaultRenderSettings);

  // useEffect(() => {
  //   const fetchSettings = async () => {
  //     await chrome.storage.local.get("renderSettings").then((value) => {
  //       const castValue = Object.prototype.hasOwnProperty.call(
  //         value,
  //         "renderSettings"
  //       )
  //         ? (value.renderSettings as RenderSettings)
  //         : defaultRenderSettings;

  //       setSettings(castValue);
  //     });
  //   };

  //   fetchSettings();
  // }, []);

  // useEffect(() => {
  //   chrome.storage.local.set({ renderSettings: settings });
  // }, [settings]);

  const toggleSettings = async (field: LanguageFields) => {
    const toggled_settings = { ...settings };
    toggled_settings[field] = !settings[field];
    setSettings(toggled_settings);
  };

  const settingsMenu = {
    hanzi: {
      toggled: settings.hanzi,
      onChange: () => toggleSettings("hanzi"),
    },
    jyutping: {
      toggled: settings.jyutping,
      onChange: () => toggleSettings("jyutping"),
    },
    pinyin: {
      toggled: settings.pinyin,
      onChange: () => toggleSettings("pinyin"),
    },
  };

  return (
    <>
      <Logo />
      <p className="introText">
        Please select below what combination of subtitles you want displayed on
        your Youtube videos.
      </p>
      <SettingsMenu
        hanzi={settingsMenu.hanzi}
        jyutping={settingsMenu.jyutping}
        pinyin={settingsMenu.pinyin}
      />
    </>
  );
}

export default App;
