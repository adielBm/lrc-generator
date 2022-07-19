import Head from 'next/head'
import { createContext, useEffect, useMemo, useRef, useState } from 'react';
import Line from '../components/Line';
import LinesTable from '../components/LinesTable';
import { Audiotime } from '../context/Audiotime';
import { LyricsContext } from '../context/Ly';
import getLrc from '../utilits/getLrc';
import download from '../utilits/saveFile';
import secendsFormat from '../utilits/secendsFormat';

export default function Home() {

  const [audio, setAudio] = useState();
  const [titleSong, setTitleSong] = useState();

  const [lyrics, setLyrics] = useState([]);
  const value = useMemo(
    () => ({ lyrics, setLyrics }),
    [lyrics]
  );

  const [audiotime, setAudiotime] = useState([]);
  const valueAudiotime = useMemo(
    () => ({ audiotime, setAudiotime }),
    [audiotime]
  );



  const audioEl = useRef(null);
  const textareaEl = useRef(null);

  const copyTextToLyrics = () => {
    const arr = textareaEl.current.value.split(/\r\n|\n\r|\n|\r/)
    let lyrics = arr.map(line => ({ text: line, time: null }))
    console.log(lyrics)
    lyrics = lyrics.filter(line => {
      if (line.text.length < 2) {
        return false;
      }
      return true;
    })
    console.log(lyrics)
    setLyrics(lyrics)
    textareaEl.current.value = ""
  }

  const handleTimeUpdate = (event) => {
    console.log(audioEl)
    setAudiotime(secendsFormat(event.target.currentTime))
  }

  const handleExportFile = () => {
    download(`${titleSong}.lrc`, getLrc(lyrics, titleSong, 'Artist one', 'Ablum33', secendsFormat(audioEl.current.duration) ))
  }

  const addFile = (e) => {
    if (e.target.files[0]) {
      setTitleSong(e.target.files[0].name.split('.')[0])
      setAudio(URL.createObjectURL(e.target.files[0]));
      audioEl.current.load()
      audioEl.current.playbackRate = 1.3;
      console.log(audioEl)
    }
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"></link>
      </Head>
      <main>
        <LyricsContext.Provider value={value}>
          <Audiotime.Provider value={valueAudiotime} >
            <div>
              <div className="flex items-center bg-[#5499ff] p-2 gap-2 justify-center sticky top-0 shadow-xl">
                <div className="w-44 text-2xl font-bold flex justify-items-center align-middle">{titleSong ? titleSong : ''}</div>
                <audio onTimeUpdate={handleTimeUpdate} ref={audioEl} id="audio" className="w-7/12" controls>
                  <source src={audio}></source>
                </audio>
                <br />
                <label className="relative btn btn-primary rounded-full btn-file">
                  Browse
                  <input type="file" onChange={addFile} id="file" accept="audio/*" />
                </label>
                <button onClick={handleExportFile} className='btn btn-success rounded-full'>Export LRC file</button>

              </div>
              <div className="grid grid-cols-4 min-h-[90vh]">
                <div className='bg-[#a5c9ff] p-4 min-h-screen space-y-4'>
                  <button onClick={copyTextToLyrics} className='btn btn-primary rounded-full w-full'>Copy</button>
                  <textarea className='p-2 h-screen w-full outline-none rounded-lg' ref={textareaEl}></textarea>
                </div>
                <LinesTable />
              </div>
            </div>
          </Audiotime.Provider>
        </LyricsContext.Provider>

      </main>
    </div>
  )
}