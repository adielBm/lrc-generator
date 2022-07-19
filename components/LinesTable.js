import React, { useContext } from 'react'
import { LyricsContext } from '../context/Ly';
import Line from './Line'

export default function LinesTable() {

  const {lyrics} = useContext(LyricsContext);

  return (
    <div className="col-span-3 space-y-4 p-4">
      {lyrics.map((line, idx) => <Line key={idx} idx={idx} />)}
    </div>
  )
}
