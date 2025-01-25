import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

interface RenderSettings {
  hanzi: boolean;
  jyutping: boolean;
  pinyin: boolean;
}

const defaultRenderSettings = {
  hanzi: false,
  jyutping: true,
  pinyin: false,
};

function App() {
  const [count, setCount] = useState(0);
  const [settings, setSettings] = useState(defaultRenderSettings);

  const getSettings = async () => {
    const settings: RenderSettings = await chrome.storage.local.get(
      "renderSettings"
    );

    if (settings && typeof settings == RenderSettings) {
      setSettings(settings);
    }
  };

  const renderOptions = {};
  const renderOptionsForm = document.getElementById("renderOptionsForm");

  renderOptionsForm?.addEventListener("change", (event) => {});

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
        <label>
          <input type="checkbox" value="Hanzi" onChange={() => {}} />
          Hanzi
        </label>
        <label>
          <input type="checkbox" value="Jyutping" onChange={() => {}} />
          Jyutping
        </label>
        <label>
          <input type="checkbox" value="Pinyin" onChange={() => {}} />
          Pinyin
        </label>
      </form>
    </>
  );
}

export default App;
