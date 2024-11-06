import { useState,useEffect,useContext } from 'react';
import amalitechLogo from '../assets/amalitechlogo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import avatar from "../assets/Avatar.svg"
import { useNavigate } from "react-router-dom"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from "../contexts/UserContext";
import { supabase } from '../supabase';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate=useNavigate()
    const[logout,setLogout]=useState(false)
   
    const[authstate,setAuthstate]=useState<boolean>(false)
    
    const {userDispatch } = useContext(UserContext);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
   
    
    const logOut = async () => {
        await supabase.auth.signOut();
        userDispatch({ type: "LOGOUT", payload: null });
        localStorage.removeItem("user");
        setAuthstate(false)
    };
    const checkUser=()=>{
        const users=localStorage.getItem('user')
    
if(users){
const changeUser=JSON.parse(users)

if(changeUser){
    
    setAuthstate(true)
}
else{
    setAuthstate(false)
}  
} 
    }
    useEffect(()=>{
checkUser()
    },[checkUser])
// console.log(authstate)
    return (
        <>
            <div className='mt-[96px]'></div>
            <nav className="fixed h-[96px] pt-[10px] justify-between items-center z-20 md:px-[80px] px-[10px] pb-[10px] top-0 bg-white w-full flex flex-row border-[1px] border-[#D0D5DD]">
                <span id="amalitech-logo">
                    <img src={amalitechLogo} alt="amalitech logo" className="md:h-[35px]" />
                </span>
        
               
{
    authstate ? (
        <ul className="hidden md:flex flex-row gap-[8px] text-lg md:gap-10 font-[600] md:flex-1 justify-center md:leading-[20px] md:text-[14px]">
        <li onClick={()=>navigate('/admin')} className="text-[#667085] cursor-pointer">Analytics</li>
        <li onClick={()=>navigate('/projects')} className="text-[#667085] cursor-pointer">Projects</li>
        <li onClick={()=>navigate('demo-page')} className="text-[#667085] cursor-pointer">Demo Requests</li>
    </ul>
    ):(  <ul className="hidden md:flex flex-row gap-[8px] text-lg md:gap-10 font-[600] md:flex-1 justify-center md:leading-[20px] md:text-[14px]">
        <li onClick={()=>navigate('/')} className="text-[#667085] cursor-pointer">Home</li>
        <li onClick={()=>navigate('projects')} className="text-[#667085] cursor-pointer">Projects</li>
        <li onClick={()=>navigate('')} className="text-[#667085] cursor-pointer">Contact us</li>
    </ul>)
}
           
                <span className="md:hidden cursor-pointer" onClick={toggleMenu}>
                   <MenuIcon />
                </span>

                {
    authstate && (
        <div className='md:flex hidden flex-row items-center gap-2 relative'>
<NotificationsNoneIcon style={{fontSize:"24px"}} className='cursor-pointer'/>
<img src={avatar}/>
<div className=''>

<KeyboardArrowDownIcon onClick={()=>setLogout(!logout)} className='cursor-pointer'/>
    {
        logout && (
<span onClick={logOut} className='absolute cursor-pointer flex flex-row gap-1 p-2 right-0 -bottom-12 bg-white shadow-md border  '>
Sign out <LogoutIcon/>
</span>
        )
    }

</div>

        </div>
    )
 }
            </nav>

            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={toggleMenu}
                ></div>
            )}
 
           
            <div
                className={`fixed top-0 left-0 h-full w-[250px] bg-white shadow-lg z-30 transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out`}
            >
                <div className="p-5 flex justify-between items-center gap-4">
                    <img src={amalitechLogo} alt="amalitech logo" className="h-[35px]" />
                    <CloseIcon onClick={toggleMenu} className="cursor-pointer" />
                </div>

                {
    authstate && (
        <div className='flex flex-row items-center justify-between  px-[20px] gap-2 relative'>
            <h1 className='text-[#667085]'>Welcome</h1>
            <span className='hidden md:block'>
            <NotificationsNoneIcon style={{fontSize:"24px"}} className=' cursor-pointer  '/>

            </span>
            <span className='flex flex-row items-center gap-1'>

            <img src={avatar} className='w-8 md:w-auto'/>
<div className=''>

<KeyboardArrowDownIcon onClick={()=>setLogout(!logout)} className='cursor-pointer'/>
    {
        logout && (
<span onClick={logOut} className='absolute md:hidden cursor-pointer flex flex-row gap-1 p-2 bg-white shadow-md border  '>
Sign out <LogoutIcon/>
</span> )
    }

</div>
            </span>

       

        </div>
    )
 }

{
    authstate ? (
        <ul className="flex md:hidden flex-col mt-10 p-4  text-lg gap-10 font-[600]  justify-center leading-[20px] text-[14px]">
        <li onClick={()=>navigate('/admin')} className="text-[#667085] cursor-pointer">Analytics</li>
        <li onClick={()=>navigate('/projects')} className="text-[#667085] cursor-pointer">Projects</li>
        <li onClick={()=>navigate('demo-page')} className="text-[#667085] cursor-pointer">Demo Requests</li>
    </ul>
    ):(  <ul className="flex md:hidden flex-col mt-10 p-4  text-lg gap-10 font-[600]  justify-center leading-[20px] text-[14px]">
        <li onClick={()=>navigate('/')} className="text-[#667085] cursor-pointer">Home</li>
        <li onClick={()=>navigate('projects')} className="text-[#667085] cursor-pointer">Projects</li>
        <li onClick={()=>navigate('')} className="text-[#667085] cursor-pointer">Contact us</li>
    </ul>)
}
            </div>
        </>
    );
}
