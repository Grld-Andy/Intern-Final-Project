import { useState } from 'react';
import amalitechLogo from '../assets/amalitechlogo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="fixed h-[96px] pt-[30px] justify-between z-20 md:px-[80px] px-[10px] pb-[10px] top-0 bg-white w-full flex flex-row border-[1px] border-[#D0D5DD]">
                <span id="amalitech-logo">
                    <img src={amalitechLogo} alt="amalitech logo" className="md:h-[35px]" />
                </span>

        
                <ul className="hidden md:flex flex-row gap-[8px] text-lg md:gap-10 font-[600] md:flex-1 justify-center md:leading-[20px] md:text-[14px]">
                    <li className="text-[#667085] cursor-pointer">Home</li>
                    <li className="text-[#667085] cursor-pointer">Projects</li>
                    <li className="text-[#667085] cursor-pointer">Contact us</li>
                </ul>

           
                <span className="md:hidden cursor-pointer" onClick={toggleMenu}>
                   <MenuIcon />
                </span>
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
                <div className="p-5 flex items-center gap-4">
                    <img src={amalitechLogo} alt="amalitech logo" className="h-[35px]" />
                    <CloseIcon onClick={toggleMenu} className="cursor-pointer" />
                </div>

                <ul className="flex flex-col mt-5 p-5 gap-4 text-lg font-[600] text-[#667085]">
                    <li onClick={toggleMenu} className="cursor-pointer">Home</li>
                    <li onClick={toggleMenu} className="cursor-pointer">Projects</li>
                    <li onClick={toggleMenu} className="cursor-pointer">Contact us</li>
                </ul>
            </div>
        </>
    );
}
