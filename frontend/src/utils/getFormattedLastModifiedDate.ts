import monthsArray from "./monthsArray"

const getFormattedLastModifiedDate = (date: Date|undefined) => {
    if(date === undefined) return ""
    const lastDate = new Date(date)
    const secondsDiff = Math.floor((Date.now() - lastDate.getTime()) / 1000)
    // less than a second
    if(secondsDiff < 1) {
        return `Last modified now`
    }
    // less than a minute
    if(secondsDiff < 60) {
        return `Last modified ${secondsDiff} seconds ago`
    }
    // less than an hour
    if(secondsDiff < 60 * 60) {
        return `Last modified ${Math.floor(secondsDiff / 60)} minutes ago`
    }
    // less than a day
    if(secondsDiff < 60 * 60 * 24) {
        return `Last modified ${Math.floor(secondsDiff / 3600)} hours ago`
    }
    // less than a week
    if(secondsDiff < 60 * 60 * 24 * 7) {
        return `Last modified ${Math.floor(secondsDiff / 86400)} days ago`
    }
    // less than a month
    if(secondsDiff < 60 * 60 * 24 * 7 * 4) {
        return `Last modified ${Math.floor(secondsDiff / 604800)} weeks ago`
    }
    // less than a year
    if(secondsDiff < 60 * 60 * 24 * 365) {
        return `Last modified ${Math.floor(secondsDiff / 2592000)} months ago`
    }
    // more than a year
    const year = lastDate.getFullYear()
    const month = lastDate.getMonth()
    const day = lastDate.getDate()
    return `Last modified ${day} ${monthsArray[month]}, ${year}`
}

export default getFormattedLastModifiedDate