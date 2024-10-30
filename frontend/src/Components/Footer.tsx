import amalitechLogo from '../assets/logoImage.png'
import facebook from '../assets/facebook (2).svg'
import twitter from "../assets/twitter.svg"
import Instagram from "../assets/instagram.png"
import Linkedin from "../assets/linkedin.png"
import youtube from "../assets/youtube.png"
export default function Footer(){
return (
    <footer className='bg-[#3A3A3A] pt-[64px] pb-[48px]'>

<section className='flex flex-col xl:flex-row gap-[48px]    px-[32px]'>
    <img src={amalitechLogo} alt='amalitech logo' className='w-[288px] h-[48px]'/>

    <div className='md:flex grid grid-cols-2 md:flex-row gap-20 flex-1 justify-around  '>

        <ul className='flex flex-col gap-[16px]'>
            <li className='text-[14px] leading-[20px] font-[600] text-white'>
                Home
            </li>
            <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>About us</li>
            <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>
                Services 
            </li>
        </ul>

        <ul className='flex flex-col gap-[16px]'>
            <li className='text-[14px] leading-[20px] font-[600] text-white'>Company</li>
        <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>Privacy policy</li>
        <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>Imprint</li>
        <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>Contact</li>
        </ul>

<ul className='flex flex-col gap-[16px]'>
    <li className='text-[14px] leading-[20px] font-[600] text-white'>Service Centers</li>
    <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>Ghana</li>
    <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>Rwanda</li>
</ul>

<ul className='flex flex-col gap-[16px]'>
    <li className='text-[14px] leading-[20px] font-[600] text-white'>About AmaliTech</li>
    <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>Contact</li>
    <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>Insights</li>
</ul>
    </div>
</section>


<section className='flex flex-col-reverse gap-4 items-center lg:items-start lg:flex-row px-[32px] lg:gap-[32px] border-t-[1px] border-opacity-10 border-[#DDDDDD] mt-8 xl:w-[1280px] pt-4 mx-auto '>
   


    <span className='text-[#DDDDDD]'>
    &copy; 2023. All rights resevered. 

    </span>


    <span className='flex flex-row flex-1 gap-6 lg:gap-10 justify-end'>
        <img src={facebook} className='w-[15px] sm:w-auto'/>
        <img src={twitter} className='w-[15px] sm:w-auto' />
        <img src={Instagram} className='w-[15px] sm:w-auto'/>
        <img src={Linkedin} className='w-[15px] sm:w-auto'/>
        <img src={youtube} className='w-[15px] sm:w-auto'/>
    </span>
</section>
    </footer>
)
}