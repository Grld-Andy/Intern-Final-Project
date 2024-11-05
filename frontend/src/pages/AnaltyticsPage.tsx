import { useContext, useEffect } from "react";
import Acquisition from "../components/AnalyticsCards/Acquisition";
import BrowsersCard from "../components/AnalyticsCards/BrowsersCard";
import Cards from "../components/AnalyticsCards/Cards";
import BasicBars from "../components/AnalyticsCards/Chartline";
import SessionCard from "../components/AnalyticsCards/SessionCard";
import VisitCharts from "../components/AnalyticsCards/VisitCharts";
import { UserContext } from "../contexts/UserContext";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";


export default function AnalyticsPage() {
    const { user, userDispatch } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Handle authentication state change
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session) {
                    // Update context and save user in local storage if session exists
                    console.log(session)
                    userDispatch({ type: "LOGIN", payload: session.user });
                    localStorage.setItem("user", JSON.stringify(session.user));
                    console.log("User details:", session.user);
                } else {
                    // Redirect to login if no active session
                    navigate('/auth');
                }
            }
        );

        // Check if there's an active session on component mount
        const checkUser = async () => {
            try {
                const {
                    data: { session },
                    error,
                } = await supabase.auth.getSession();
                if (error) throw error;

                if (session) {
                    // Update context and local storage if session exists
                    userDispatch({ type: "LOGIN", payload: session.user });
                    localStorage.setItem("user", JSON.stringify(session.user));
                } else {
                    navigate('/auth');
                }
            } catch (err) {
                console.error("Error fetching user:", err);
                navigate("/");
            }
        };

        checkUser();

        // Cleanup listener on component unmount
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [navigate, userDispatch]);

    const logout = async () => {
        await supabase.auth.signOut();
        userDispatch({ type: "LOGOUT", payload: null });
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="lg:px-[80px] px-[20px] mt-[96px] pt-10 bg-[#F9FAFB] pb-20 ">
            <div className="mb-2 space-y-[8px] pt-[10px]">
                <h1 className="font-[600] lg:mb-10 text-[20px] text-[#101828] leading-[30px]">
                    {user ? `Welcome to Dashboard, ${user.name || user.email} 👋` : ""}
                </h1>
                <button onClick={logout}>Logout</button>
                <h2 className="text-[#344054] text-[16px] font-[500]">
                    Website Audience Metrics
                </h2>
                <h3 className="text-[#667085] font-[400] leading-[18px] text-sm ">
                    Audience to which the users belonged while on the current date range
                </h3>
            </div>

            <div className="lg:flex grid grid-cols-2 gap-4 lg:flex-row lg:gap-[32px]">
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
    );
}