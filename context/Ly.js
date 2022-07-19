import { createContext } from "react";

const LyricsContext = createContext({
  lyrics: [],
  setLyrics: () => {}
});

export {LyricsContext};