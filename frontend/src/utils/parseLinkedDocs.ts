import * as cheerio from 'cheerio'

const parseLinkedDocs = (links: string) => {
    const $ = cheerio.load(links)
    const listItems = $("ul li")
    const docs: Array<{ text?: string }> = []
    listItems.each((_index, el) => {
        const text = $(el).text().trim()
        docs.push({ text })
    })
    console.log(docs)
    return docs
}

export default parseLinkedDocs
