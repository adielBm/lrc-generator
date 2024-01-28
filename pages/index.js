import Head from "next/head";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import Line from "../components/Line";
import LinesTable from "../components/LinesTable";
import { Audiotime } from "../context/Audiotime";
import { LyricsContext } from "../context/Ly";
import getLrc from "../utilits/getLrc";
import download from "../utilits/saveFile";
import secendsFormat from "../utilits/secendsFormat";

export default function Home() {
  const [audio, setAudio] = useState();

  // title song
  const [titleSong, setTitleSong] = useState();
  // album song
  const [albumSong, setAlbumSong] = useState();
  // artist song
  const [artistSong, setArtistSong] = useState();

  const [lyrics, setLyrics] = useState([]);
  const value = useMemo(() => ({ lyrics, setLyrics }), [lyrics]);

  const [audiotime, setAudiotime] = useState([]);
  const valueAudiotime = useMemo(
    () => ({ audiotime, setAudiotime }),
    [audiotime]
  );

  const audioEl = useRef(null);
  const textareaEl = useRef(null);

  const copyTextToLyrics = () => {
    const arr = textareaEl.current.value.split(/\r\n|\n\r|\n|\r/);
    let lyrics = arr.map((line) => ({ text: line, time: null }));
    console.log(lyrics);
    lyrics = lyrics.filter((line) => {
      if (line.text.length < 2) {
        return false;
      }
      return true;
    });
    console.log(lyrics);
    setLyrics(lyrics);
    textareaEl.current.value = "";
  };

  const handleTimeUpdate = (event) => {
    console.log(audioEl);
    setAudiotime(secendsFormat(event.target.currentTime));
  };

  const handleExportFile = () => {
    download(
      `${titleSong}.lrc`,
      getLrc(
        lyrics,
        titleSong,
        artistSong,
        albumSong,
        secendsFormat(audioEl.current.duration)
      )
    );
  };

  const addFile = (e) => {
    if (e.target.files[0]) {
      setTitleSong(e.target.files[0].name.split(".")[0]);
      setAudio(URL.createObjectURL(e.target.files[0]));
      audioEl.current.load();
      audioEl.current.playbackRate = 2;
      console.log(audioEl);
    }
  };

  // fucntion to change playbackRate
  const changePlaybackRate = (rate) => {
    audioEl.current.playbackRate = rate;
  };

  return (
    <div>
      <Head>
        <title>LRC generator</title>
        <meta
          name="description"
          content="A nice tool for creating LRC files. (synced lyrics)"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        ></link>
      </Head>

      <main>
        <LyricsContext.Provider value={value}>
          <Audiotime.Provider value={valueAudiotime}>
            <div>
              <div className="flex items-center bg-[#5499ff] p-2 gap-2 justify-center sticky top-0 shadow-xl">
                <div className="w-44 text-2xl font-bold flex justify-items-center align-middle">
                  {titleSong ? titleSong : ""}
                </div>
                <audio
                  onTimeUpdate={handleTimeUpdate}
                  ref={audioEl}
                  id="audio"
                  className="w-7/12"
                  controls
                >
                  <source src={audio}></source>
                </audio>

                <div>
                  {/* label for playback rate*/}
                  <div className="text-xl text-center">Speed</div>
                  {/* input for playback rate */}
                  <input
                    onChange={(e) => changePlaybackRate(e.target.value)}
                    type="range"
                    min="1"
                    max="3"
                    step="0.5"
                    defaultValue="2"
                    className="w-28"
                  />
                </div>

                <br />
                <label className="relative btn btn-primary rounded-full btn-file cursor-pointer">
                  Upload Song
                  <input
                    type="file"
                    onChange={addFile}
                    id="file"
                    accept="audio/*"
                    className="cursor-pointer"
                  />
                </label>
                <button
                  onClick={handleExportFile}
                  className="btn btn-success rounded-full"
                >
                  Export LRC file
                </button>
                {/* github icon */}

                <a
                  href="https://github.com/adielBm/lrc-generator"
                  target="_blank"
                  rel="noreferrer"
                  className="btn bg-slate-700 hover:bg-slate-900 text-gray-200 hover:text-gray-200 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-github"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
              </div>
              <div className="grid grid-cols-4 min-h-[90vh]">
                <div className="bg-[#a5c9ff] p-4 min-h-screen space-y-4">
                  {/* input text for title of song */}

                  <input
                    onChange={(e) => setTitleSong(e.target.value)}
                    value={titleSong}
                    placeholder="Title"
                    className="p-2 outline-none rounded-lg w-full"
                  />
                  {/* input text for album and artist of song */}
                  <input
                    onChange={(e) => setAlbumSong(e.target.value)}
                    placeholder="Album"
                    className="p-2 outline-none rounded-lg w-full"
                  />
                  <input
                    onChange={(e) => setArtistSong(e.target.value)}
                    placeholder="Artist"
                    className="p-2 outline-none rounded-lg w-full"
                  />
                  {/* button for add line */}
                  <button
                    onClick={copyTextToLyrics}
                    className="btn btn-primary rounded-full w-full"
                  >
                    Start Editing
                  </button>
                  <textarea
                    className="p-2 h-screen w-full outline-none rounded-lg"
                    ref={textareaEl}
                    placeholder="Insert lyrics here"
                  ></textarea>
                </div>
                <LinesTable />
              </div>
            </div>
          </Audiotime.Provider>
        </LyricsContext.Provider>
      </main>
    </div>
  );
}
