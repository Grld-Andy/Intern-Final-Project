import axios from "axios"

const getUser = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/user`, { withCredentials: true})
    .then((res) => {
        if (res.data.user != null) {
            return res.data.user
        }
    })
}

export default getUser