const getLrc = (arr, title, artist, album, length) => {
  let lrc = '';
  lrc += `[ti:${title}]\n[ar:${artist}]\n[al:${album}]\n[length:${length}]`
  arr.map(line => {
    lrc += `[${line.time}]${line.text}\n`;
  })
  return lrc;
}

export default getLrc;