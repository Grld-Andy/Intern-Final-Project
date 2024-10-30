const convertUrlToFile = async (url: string, baseName: string, extension: string): Promise<File> => {
    const response = await fetch(url)
    const blob = await response.blob()
    const fileName = `${baseName}_${100000 + Math.floor(Math.random() * 100000)}.${extension}`
    return new File([blob], fileName, { type: blob.type })
}
export default convertUrlToFile