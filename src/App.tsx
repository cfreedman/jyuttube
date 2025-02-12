import { useCallback, useEffect, useState } from "react";

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

  const messageContentPage = useCallback(async () => {
    console.log("Attempting to message current tabs about settings change");
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tab.id) {
      chrome.tabs
        .sendMessage(tab.id, settings)
        .then((response) => {
          console.log("New settings messaged to content page successfully");
          console.log(response);
        })
        .catch((err) => {
          console.log(
            `Error in messaging new settings to content page with error ${err}`
          );
        });
    } else {
      console.log("Unable to access tab id for current tab");
    }
  }, [settings]);

  useEffect(() => {
    console.log("Fetching setting from chrome local storage");
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
    console.log("Caching new settings in chrome storage");
    chrome.storage.local.set({ renderSettings: settings });
  }, [settings]);

  useEffect(() => {
    messageContentPage();
  }, [messageContentPage]);

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
