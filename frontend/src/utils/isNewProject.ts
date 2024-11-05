const isNewProject = (date: Date|undefined) => {
    if(date === undefined) return ""
    const lastDate = new Date(date)
    const secondsDiff = Math.floor((Date.now() - lastDate.getTime()) / 1000)
    // less than a week
    if(secondsDiff < 60 * 60 * 24 * 7) {
        return true
    }
    return false
}

export default isNewProject