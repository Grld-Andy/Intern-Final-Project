const createNameAvatar = (email: string|undefined) => {
    if(!email) return ""
    const fullName = email.split("@")[0]
    const nameList = fullName.split(".")
    const titlizedName = nameList.map((name) => name.charAt(0).toUpperCase())
    const userAvatar = titlizedName.join("")
    return userAvatar
}

export default createNameAvatar