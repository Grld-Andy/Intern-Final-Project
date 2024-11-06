import monthsArray from "./monthsArray"

const getDemoRequestCreationString = (date: string) => {
    const createdDate = new Date(date)
    const year = createdDate.getFullYear()
    const month = createdDate.getMonth()
    const day = createdDate.getDate()
    const time = createdDate.toISOString().split('T')[1].slice(0, 5)
    return `${monthsArray[month]} ${day}, ${year} ${time}`
}

export default getDemoRequestCreationString