import * as cheerio from 'cheerio'

const parseLinkedDocs = (links: string) => {
    const $ = cheerio.load(links)
    const anchorTag = $("a")
    const docs: Array<{link?: string, text?: string}> = []
    anchorTag.each((index, el) => {
        console.log(index)
        const link = $(el).attr("href")
        const text = $(el).text()
        docs.push({link, text })
    })
    return docs
}

export default parseLinkedDocs