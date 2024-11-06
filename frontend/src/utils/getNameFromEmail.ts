const getNameFromEmail = (email: string|undefined) => {
    if(!email) return ""
    const fullName = email.split("@")[0]
    const nameList = fullName.split(".")
    const titlizedName = nameList.map((name) => name.charAt(0).toUpperCase() + name.slice(1))
    const userName = titlizedName.join(" ")
    return userName
}

export default getNameFromEmail