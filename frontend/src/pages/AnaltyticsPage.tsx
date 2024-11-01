import { useContext, useEffect } from "react"
import Acquisition from "../components/AnalyticsCards/Acquisition"
import BrowsersCard from "../components/AnalyticsCards/BrowsersCard"
import Cards from "../components/AnalyticsCards/Cards"
import BasicBars from "../components/AnalyticsCards/Chartline"
import SessionCard from "../components/AnalyticsCards/SessionCard"
import VisitCharts from "../components/AnalyticsCards/VisitCharts"
import { UserContext } from "../contexts/UserContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function AnaltyticsPage() {
    const { user, userDispatch } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        const checkUser = () => {
            console.log(user)
            if (!user || user == null) {
                try {
                    console.log("Checking user")
                    axios.get('http://localhost:3000/api/v1/auth/user', { withCredentials: true})
                    .then((res) => {
                        console.log("Response data", res)
                        if (res.data.user != null) {
                            userDispatch({ type: 'LOGIN', payload: res.data.user })
                        }
                        // else{
                        //     window.open('https://intern-final-project.onrender.com/auth/microsoft', '_self')
                        // }
                    }).catch((err) => {
                        console.log("Error", err);
                        // if(err.response && err.response.status == 401) {
                            window.open('http://localhost:3000/auth/microsoft', '_self')
                        // }
                    })
                } catch (err) {
                    console.error(err)
                    navigate("/")
                }
            }
        }
        checkUser()
    }, [navigate, user, userDispatch, axios])

    const login = () => {
        window.open('http://localhost:3000/auth/microsoft', '_self')
    }

    const logout = () => {
        window.location.href = 'http://localhost:3000/logout'
    }

    return (
        <div className="lg:px-[80px] px-[20px] mt-[96px] pt-10 bg-[#F9FAFB] pb-20 ">
            <div className="mb-2 space-y-[8px] pt-[10px]">
                <h1 className="font-[600] lg:mb-10 text-[20px] text-[#101828] leading-[30px]">
                    Welcome to Dashboard, {user?.name || user?.email} 👋
                </h1>
                <button onClick={login}>Login</button> <br />

                <button onClick={logout}>logout</button>
                <h2 className="text-[#344054] text-[16px] font-[500]">
                    Website Audience Metrics
                </h2>
                <h3 className="text-[#667085] font-[400] leading-[18px] text-sm ">
                    Audience to which the users belonged while on the current date range
                </h3>
            </div>

            <div className="lg:flex grid grid-cols-2 gap-4 lg:flex-row lg:gap-10 lg:gap-[32px]">
                <Cards title="Total Visitors" content="13,596" />
                <Cards title="Page Views" content="13,596" />
                <Cards title="Page Sessions" content="16,596" />
                <Cards title="Total Visitors" content="13,596" />
            </div>

            <div className="flex flex-col lg:flex-row gap-2 lg:gap-[32px]">
                <BrowsersCard />
                <VisitCharts />
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-[32px]">
                <Acquisition />
                <SessionCard />
            </div>

            <div className="border bg-white mt-10 ">
                <BasicBars />
            </div>
        </div>
    )
}