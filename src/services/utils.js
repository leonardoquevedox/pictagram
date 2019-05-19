const base64ToFile = (base64, filename) => {
  let byteString = ''
  if (base64.split(',')[0].indexOf('base64') >= 0) byteString = atob(base64.split(',')[1])
  else byteString = unescape(base64.split(',')[1])
  const mimeString = base64
    .split(',')[0]
    .split(':')[1]
    .split(';')[0]

  // write the bytes of the string to a typed array
  const u8arr = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    u8arr[i] = byteString.charCodeAt(i)
  }
  return new File([u8arr], filename, { type: mimeString })
}

const blobToFile = (blob, filename) => new File([blob], filename)

export default { base64ToFile, blobToFile }
