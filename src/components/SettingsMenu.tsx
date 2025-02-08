import { JSX } from "react";

import Switch from "./Switch";
import "../styles/settings_menu.css";

type LanguageToggleSettings = {
  toggled: boolean;
  onChange: () => void;
};

type SettingsMenuProps = {
  hanzi: LanguageToggleSettings;
  jyutping: LanguageToggleSettings;
  pinyin: LanguageToggleSettings;
};

export default function SettingsMenu({
  hanzi,
  jyutping,
  pinyin,
}: SettingsMenuProps): JSX.Element {
  return (
    <div className="settingsMenu">
      <div className="switchContainer">
        <p className="switchLabel">Hanzi</p>
        <Switch toggled={hanzi.toggled} onChange={hanzi.onChange} />
      </div>
      <div className="switchContainer">
        <p className="switchLabel">Jyutping</p>
        <Switch toggled={jyutping.toggled} onChange={jyutping.onChange} />
      </div>
      <div className="switchContainer">
        <p className="switchLabel">Pinyin</p>
        <Switch toggled={pinyin.toggled} onChange={pinyin.onChange} />
      </div>
    </div>
  );
}
