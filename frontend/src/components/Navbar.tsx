import { useState, useEffect, useContext } from 'react';
import amalitechLogo from '../assets/amalitechlogo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, useLocation } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from "../contexts/UserContext";
import { ActiveDemoRequestsContext } from '../contexts/ActiveDemoRequestsContext'; // Import ActiveDemoRequestsContext
import { supabase } from '../supabase';
import createNameAvatar from '../utils/createNameAvatar';
import axios from 'axios';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [logout, setLogout] = useState(false);
    const [authstate, setAuthstate] = useState<boolean>(false);
    const { user, userDispatch } = useContext(UserContext);
    const { activeDemoRequests, activeDemoRequestsDispatch } = useContext(ActiveDemoRequestsContext); // Consume the context
    
    const navbarContent: Array<{name: string, link: string}> = [
        { name: 'Home', link: '/' },
        { name: 'Projects', link: '/projects' },
        { name: 'Contact', link: 'https://amalitech.com/locations-contact/' }
    ];

    const adminNavbarContent: Array<{name: string, link: string}> = [
        { name: 'Analytics', link: '/admin' },
        { name: 'Projects', link: '/projects' },
        { name: 'Demo requests', link: '/demo-page' }
    ];

    // Toggle the menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setLogout(false);
    };

    // Log out user
    const logOut = async () => {
        console.log('sign out')
        await supabase.auth.signOut();
        console.log('done')
        userDispatch({ type: "LOGOUT", payload: null });
        localStorage.removeItem("user");
        setAuthstate(false);
    };

    useEffect(() => {
        if((!user || user == null) && location.pathname.includes("admin")){
            supabase.auth.onAuthStateChange(
                async (_event, session) => {
                    if (session) {
                        userDispatch({ type: "LOGIN", payload: session.user });
                        localStorage.setItem("user", JSON.stringify(session.user));
                    }
                }
            );
        }

        if(user && activeDemoRequests == 0){
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/demo-requests/active/count`)
            .then((res) => {
                activeDemoRequestsDispatch({ type: 'SET', payload: res.data.activeDemoRequestsCount });
            })
            .catch((error) => {
                console.error('Failed to fetch active demo requests:', error);
            });
        }
        const checkUser = () => {
            if (user != null) {
                setAuthstate(true);
            } else {
                setAuthstate(false);
            }
        };
        checkUser();
        setIsOpen(false);
        setLogout(false);
    }, [user, userDispatch, activeDemoRequestsDispatch, location.pathname, activeDemoRequests]);

    return (
        <>
            <div className='mt-[96px]'></div>
            <nav className="fixed h-[96px] pt-[10px] justify-between items-center z-20 md:px-[80px] px-[10px] pb-[10px] top-0 bg-white w-full flex flex-row border-[1px] border-[#D0D5DD]">
                <span id="amalitech-logo" className='w-[123.63px]'>
                    <img src={"/amalitech_logo.jpg"} alt="amalitech logo" className="md:h-[35px] w-full" />
                </span>
                
                {authstate ? (
                    <ul className="hidden md:flex flex-row gap-[8px] text-lg md:gap-10 font-[600] md:flex-1 justify-center md:leading-[20px] md:text-[14px]">
                        {
                            adminNavbarContent.map((item, index) => {
                                if(item.link !== "/demo-page"){
                                    return (
                                        <NavLink key={index} to={item.link} className={`${location.pathname === item.link ? "text-[#1570EF]" : "text-[#667085]"} leading-[20px] text-[14px] font-[600] cursor-pointer hover:text-[#1570EF]`}>
                                            {item.name}
                                        </NavLink>
                                    )
                                }else{
                                    return(
                                        <div key={index} className='flex gap-[8px]'>
                                            <NavLink to={item.link} className={`${location.pathname === item.link ? "text-[#1570EF]" : "text-[#667085]"} leading-[20px] text-[14px] font-[600] cursor-pointer hover:text-[#1570EF]`}>{item.name}</NavLink>
                                            <h2 className="font-[#6941C6] font-[500] bg-[#D92D20] leading-[18px] text-[12px] p-1 w-[22px] h-[22px] rounded-full text-white flex items-center justify-center">
                                                {activeDemoRequests}
                                            </h2>
                                        </div>
                                    )
                                }
                            })
                        }
                    </ul>
                ) : (
                    <ul className="hidden md:flex flex-row gap-[8px] text-lg md:gap-10 font-[600] md:flex-1 justify-center md:leading-[20px] md:text-[14px]">
                        {
                            navbarContent.map((item, index) => {
                                return (
                                    <NavLink key={index} to={item.link} className={`${location.pathname === item.link ? "text-[#1570EF]" : "text-[#667085]"} leading-[20px] text-[14px] font-[600] cursor-pointer hover:text-[#1570EF]`}>{item.name}</NavLink>
                                )
                            })
                        }
                    </ul>
                )}

                <span className="md:hidden cursor-pointer" onClick={toggleMenu}>
                    <MenuIcon />
                </span>

                {authstate && (
                    <div className='md:flex hidden flex-row items-center gap-2 relative'>
                        <NotificationsNoneIcon style={{ fontSize: "24px" }} className='cursor-pointer' />
                        <span className="w-[40px] h-[40px] rounded-[50%] bg-gradient-to-r from-cyan-200 to-blue-100 flex items-center text-[#344054] justify-center">
                            {createNameAvatar(user?.email)}
                        </span>
                        <div className="relative">
                            <KeyboardArrowDownIcon
                                onClick={() => setLogout(!logout)}
                                className={`cursor-pointer transition-transform duration-300 ${logout ? "rotate-180" : ""}`}
                            />
                            {logout && (
                                <span onClick={logOut} className='absolute bg-white border rounded-[8px] cursor-pointer flex gap-2 p-1 shadow text-[#667085] leading-[20px] text-[14px] font-[400]'>
                                    <h1 className="flex w-[max-content]">Sign out</h1>
                                    <LogoutIcon />
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={toggleMenu}
                ></div>
            )}

            <div
                className={`fixed top-0 left-0 h-full w-[250px] bg-white shadow-lg z-30 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
            >
                <div className="p-5 flex justify-between items-center gap-4">
                    <img src={amalitechLogo} alt="amalitech logo" className="h-[35px]" />
                    <CloseIcon onClick={toggleMenu} className="cursor-pointer" />
                </div>

                {authstate && (
                    <div className='flex flex-row items-center justify-between px-[20px] gap-2 relative'>
                        <h1 className='text-[#667085]'>Welcome</h1>
                        <span className='hidden md:block'>
                            <NotificationsNoneIcon style={{ fontSize: "24px" }} className='cursor-pointer' />
                        </span>
                        <span className='flex flex-row items-center gap-1'>
                            <span className="w-[40px] h-[40px] rounded-[50%] bg-gradient-to-r from-cyan-200 to-blue-100 flex items-center text-[#344054] justify-center">
                                {createNameAvatar(user?.email)}
                            </span>
                            <div className="relative md:hidden">
                                <KeyboardArrowDownIcon
                                    onClick={() => setLogout(!logout)}
                                    className={`cursor-pointer transition-transform duration-300 ${logout ? "rotate-180" : ""}`}
                                />
                                {logout && (
                                    <span onClick={logOut} className='absolute bg-white border rounded-[8px] cursor-pointer flex gap-2 p-1 shadow text-[#667085] leading-[20px] text-[14px] font-[400]'>
                                        <h1 className="flex w-[max-content]">Sign out</h1>
                                        <LogoutIcon />
                                    </span>
                                )}
                            </div>
                        </span>
                    </div>
                )}

                {authstate ? (
                    <ul className="flex md:hidden flex-col mt-10 p-4 text-lg gap-10 justify-center">
                        {
                            adminNavbarContent.map((item, index) => {
                                if(item.link !== "/demo-page"){
                                    return (
                                        <NavLink key={index} to={item.link} className={`${location.pathname === item.link ? "text-[#1570EF]" : "text-[#667085]"} leading-[20px] text-[14px] font-[600] cursor-pointer hover:text-[#1570EF]`}>
                                            {item.name}
                                        </NavLink>
                                    )
                                }else{
                                    return(
                                        <div key={index} className='flex gap-[8px]'>
                                            <NavLink to={item.link} className={`${location.pathname === item.link ? "text-[#1570EF]" : "text-[#667085]"} leading-[20px] text-[14px] font-[600] cursor-pointer hover:text-[#1570EF]`}>{item.name}</NavLink>
                                            <h2 className="font-[#6941C6] font-[500] bg-[#D92D20] leading-[18px] text-[12px] p-1 w-[22px] h-[22px] rounded-full text-white flex items-center justify-center">
                                                {activeDemoRequests}
                                            </h2>
                                        </div>
                                    )
                                }
                            })
                        }
                    </ul>
                ) : (
                    <ul className="flex md:hidden flex-col mt-10 p-4 text-lg gap-10 justify-center">
                        {
                            navbarContent.map((item, index) => {
                                return (
                                    <NavLink key={index} to={item.link} className={`${location.pathname === item.link ? "text-[#1570EF]" : "text-[#667085]"} leading-[20px] text-[14px] font-[600] cursor-pointer hover:text-[#1570EF]`}>{item.name}</NavLink>
                                )
                            })
                        }
                    </ul>
                )}
            </div>
        </>
    );
}
