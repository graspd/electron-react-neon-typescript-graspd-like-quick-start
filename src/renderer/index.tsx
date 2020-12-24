import { render } from "react-dom";
import App from "./App";

interface ExtendedWindow extends Window {
  myAPI: {
    isElectron: () => boolean;
  };
}

declare const window: ExtendedWindow;

const root: HTMLElement | null = document.querySelector("#root");

if (window.myAPI?.isElectron()) {
  render(<App />, root);
}
