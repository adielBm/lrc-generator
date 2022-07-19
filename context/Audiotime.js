import { createContext } from "react";

const Audiotime = createContext({
  audiotime: null,
  setAudiotime: () => {},
});

export {Audiotime};