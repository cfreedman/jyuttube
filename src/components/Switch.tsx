import { JSX } from "react";

import "../styles/switch.css";

type SwitchProps = {
  toggled: boolean;
  onChange: () => void;
};

export default function Switch({
  toggled,
  onChange,
}: SwitchProps): JSX.Element {
  return (
    <label>
      <input
        type="checkbox"
        checked={toggled}
        onChange={onChange}
        className="hiddenInput"
      />
      <span className="switch" />
    </label>
  );
}
