const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const dataUrlToImage = (dataUrl: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = dataUrl
    img.onload = () => resolve(img)
    img.onerror = reject
  })
}

// Validar si las caras en ambas imágenes coinciden

const dataUrlToFile = (dataUrl: string, filename: string): File => {
  const dataUrlParts = dataUrl.split(',')
  const mimeString = dataUrlParts[0].split(':')[1].split(';')[0]
  const byteString = atob(dataUrlParts[1])
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const uint8Array = new Uint8Array(arrayBuffer)

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }

  const blob = new Blob([arrayBuffer], { type: mimeString })
  return new File([blob], filename, { type: mimeString })
}
export { fileToDataUrl, dataUrlToImage, dataUrlToFile }
