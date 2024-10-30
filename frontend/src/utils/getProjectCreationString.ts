import monthsArray from "./monthsArray"

const getProjectCreationString = (date: Date|undefined) => {
    if(date === undefined) return ""
    const createdDate = new Date(date)
    const year = createdDate.getFullYear()
    const month = createdDate.getMonth()
    const day = createdDate.getDate()
    return `Created ${day} ${monthsArray[month]}, ${year}`
}

export default getProjectCreationString
