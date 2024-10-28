import amalitechLogo from '../assets/amalitechlogo.svg'

export default function Navbar(){
return (
    <nav className="fixed h-[96px] pt-[30px] z-20 px-[80px] pb-[10px] top-0  bg-white w-full flex flex-row    border-[1px] border-[#D0D5DD]">
        <span id='amalitech logo'>
<img src={amalitechLogo} alt='amalitech logo' className='h-[35px]'/>

        </span>
        <ul className="inline-flex gap-[8px] text-lg md:gap-10 font-[600]   flex-1 justify-center leading-[20px] text-[14px]  ">
            <li className='text-[#667085] cursor-pointer'>Home</li>
            <li className='text-[#667085] cursor-pointer'>Projects</li>
            <li className='text-[#667085] cursor-pointer'>Contact us</li>
        </ul>
    </nav>
)
}
