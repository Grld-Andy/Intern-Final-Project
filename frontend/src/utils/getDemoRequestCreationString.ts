import monthsArray from "./monthsArray"

const getDemoRequestCreationString = (date: string, time: string) => {
    const createdDate = new Date(date)
    const year = createdDate.getFullYear()
    const month = createdDate.getMonth()
    const day = createdDate.getDate()
    time = time.slice(0, 5)
    return `${monthsArray[month]} ${day}, ${year} ${time}`
}

export default getDemoRequestCreationString