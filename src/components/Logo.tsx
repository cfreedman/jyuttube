import { JSX } from "react";

import TubeLogo from "../assets/tube_logo.png";
import "../styles/logo.css";

export default function Logo(): JSX.Element {
  return (
    <div className="logoContainer">
      <p className="logoText">Jyut</p>
      <img src={TubeLogo} alt="Tube logo" className="logoImage" />
    </div>
  );
}
