import { useEffect, useState } from "react";

import Logo from "./components/Logo";
import SettingsMenu from "./components/SettingsMenu";
import {
  LanguageFields,
  defaultRenderSettings,
  RenderSettings,
} from "./lib/settings";

function App() {
  const [settings, setSettings] = useState(defaultRenderSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      await chrome.storage.local.get("renderSettings").then((value) => {
        const castValue = Object.prototype.hasOwnProperty.call(
          value,
          "renderSettings"
        )
          ? (value.renderSettings as RenderSettings)
          : defaultRenderSettings;

        setSettings(castValue);
        setLoading(false);
      });
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ renderSettings: settings });
  }, [settings]);

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
      {!loading && (
        <SettingsMenu
          hanzi={settingsMenu.hanzi}
          jyutping={settingsMenu.jyutping}
          pinyin={settingsMenu.pinyin}
        />
      )}
    </>
  );
}

export default App;
