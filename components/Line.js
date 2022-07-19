import React, { useContext, useState } from 'react'
import { Audiotime } from '../context/Audiotime';
import { LyricsContext } from '../context/Ly'

export default function Line({ idx }) {

  const { lyrics, setLyrics } = useContext(LyricsContext);
  const { audiotime, setAudiotime } = useContext(Audiotime);

  const changeHandler = event => {
    const newLyrics = [...lyrics]
    newLyrics[idx].text = event.target.value
    setLyrics(newLyrics)
  };


  const handleButtonTime = () => {

  }

  const handleTapTime = () => {
    const newLyrics = [...lyrics]
    const currentTime = audiotime
    newLyrics[idx].time = currentTime
    setLyrics(newLyrics)
    const nextBtn = document.getElementById(`buttonTap-${idx + 1}`)
    if (nextBtn) {
      nextBtn.focus()
    } else {
      document.getElementById(`buttonTap-${idx}`).blur()
    }
  }

  const handleRemove = () => {
    let newLyrics = [...lyrics]
    newLyrics.splice(idx, 1);
    setLyrics(newLyrics)
  }


  const insert = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
  ]

  const handleAdd = () => {
    let newLyrics = [...lyrics]
    setLyrics(insert(newLyrics, idx + 1, {
      text: "", time: null
    }))
  }

  return (
    <div className="grid grid-cols-10 gap-4">
      {lyrics[idx].time
        ? <button onClick={handleButtonTime} id={`buttonTime-${idx}`} className='col-span-2 btn btn-ligth bg-[#a0ffb8] border-4 focus:border-4 focus:border-blue-600 text-black font-bold rounded-2xl'>{lyrics[idx].time}</button>
        : <button onClick={handleButtonTime} id={`buttonTime-${idx}`} className='col-span-2 btn btn-ligth bg-[#cee1ff] border-4 focus:border-4 focus:border-blue-600 text-black font-bold rounded-2xl'>{lyrics[idx].time}</button>
      }
      <button id={`buttonTap-${idx}`} onClick={handleTapTime} className='btn btn-ligth bg-indigo-100 border-4 focus:border-4 focus:border-red-600 focus:bg-red-100 text-black font-bold rounded-2xl'>Tap</button>
      <input type={"text"} onChange={changeHandler} value={lyrics[idx].text} className="p-2 text-xl col-span-5 bg-indigo-50 rounded-xl" />
      <button onClick={handleRemove} className='btn btn-danger font-bold rounded-2xl'>X</button>
      <button onClick={handleAdd} className='btn btn-success font-bold rounded-2xl'>+</button>

    </div>
  )
}
