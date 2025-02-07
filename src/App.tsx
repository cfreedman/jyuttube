import { useState } from "react";

import reactLogo from "./assets/react.svg";
import "./App.css";
import Switch from "./Switch";

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
  const [count, setCount] = useState(0);
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

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank"></a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>
        Please select below what combination of subtitles you want displayed on
        your Youtube videos.
      </p>
      <form className="form" id="renderOptionsForm">
        <Switch
          toggled={settings.hanzi}
          onChange={() => toggleSettings("hanzi")}
        />
        <label>
          <input
            type="checkbox"
            name="Hanzi"
            checked={settings.hanzi}
            onChange={() => toggleSettings("hanzi")}
          />
          Hanzi
        </label>
        <Switch
          toggled={settings.jyutping}
          onChange={() => toggleSettings("jyutping")}
        />
        <label>
          <input
            type="checkbox"
            name="Jyutping"
            checked={settings.jyutping}
            onChange={() => toggleSettings("jyutping")}
          />
          Jyutping
        </label>
        <Switch
          toggled={settings.pinyin}
          onChange={() => toggleSettings("pinyin")}
        />
        <label>
          <input
            type="checkbox"
            name="Pinyin"
            checked={settings.pinyin}
            onChange={() => toggleSettings("pinyin")}
          />
          Pinyin
        </label>
      </form>
    </>
  );
}

export default App;
