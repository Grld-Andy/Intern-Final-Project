import axios from "axios"

const getUser = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/user`, { withCredentials: true})
    .then((res) => {
        console.log("Response data", res)
        if (res.data.user != null) {
            return res.data.user
        }
    }).catch((err) => {
        console.log("Error", err);
    })
}

export default getUser