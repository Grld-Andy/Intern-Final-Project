export const exampleController = async(req, res) => {
    return res.status(200).json({
        status: "success",
        message: "This is an example route"
    })
}