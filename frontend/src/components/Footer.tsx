import amalitechLogo from '../assets/logoImage.png';
import facebook from '../assets/facebook (2).svg';
import twitter from "../assets/twitter.svg";
import Instagram from "../assets/instagram.png";
import Linkedin from "../assets/linkedin.png";
import youtube from "../assets/youtube.png";

export default function Footer() {
    return (
        <footer className='bg-[#3A3A3A] pt-[64px] pb-[48px]'>
            <section className='flex flex-col xl:flex-row gap-[48px] px-[32px]'>
                <img src={amalitechLogo} alt='amalitech logo' className='w-[288px] h-[48px]' />

                <div className='md:flex grid grid-cols-2 md:flex-row gap-20 flex-1 justify-around'>
                    <ul className='flex flex-col gap-[16px]'>
                        <li className='text-[14px] leading-[20px] font-[600] text-white'>
                            Home
                        </li>
                        <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>
                            <a href="https://amalitech.com/who-we-are/">About Us</a>
                        </li>
                        <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>
                            <a href="https://amalitech.com/our-services/">Services</a>
                        </li>
                    </ul>

                    <ul className='flex flex-col gap-[16px]'>
                        <li className='text-[14px] leading-[20px] font-[600] text-white'>
                            Company
                        </li>
                        <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>
                            <a href="https://amalitech.org/privacy-policy-2/">Privacy Policy</a>
                        </li>
                        <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>
                            <a href="https://amalitech.org/imprint/">Imprint</a>
                        </li>
                        <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>
                            <a href="https://amalitech.com/locations-contact/">Contact</a>
                        </li>
                    </ul>

                    <ul className='flex flex-col gap-[16px]'>
                        <li className='text-[14px] leading-[20px] font-[600] text-white'>
                            Service Centers
                        </li>
                        <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>
                            <a href="https://amalitech.org/">Ghana</a>
                        </li>
                        <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>
                            <a href="https://amalitech.org/">Rwanda</a>
                        </li>
                    </ul>

                    <ul className='flex flex-col gap-[16px]'>
                        <li className='text-[14px] leading-[20px] font-[600] text-white'>
                            About AmaliTech
                        </li>
                        <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>
                            <a href="https://amalitech.com/locations-contact/">Contact</a>
                        </li>
                        <li className='text-[#BBBBBB] leading-[24px] text-[16px] font-[500]'>
                            <a href="https://amalitech.com/insights/">Insights</a>
                        </li>
                    </ul>
                </div>
            </section>

            <section className='flex flex-col-reverse gap-4 items-center lg:items-start lg:flex-row px-[32px] lg:gap-[32px] border-t-[1px] border-opacity-10 border-[#DDDDDD] mt-8 xl:w-[1280px] pt-4 mx-auto'>
                <span className='text-[#DDDDDD]'>
                    &copy; 2023. All rights reserved.
                </span>

                <span className='flex flex-row flex-1 gap-6 lg:gap-10 justify-end'>
                    <a href="https://www.facebook.com/AmalitechgGmbH/" target="_blank" rel="noopener noreferrer">
                        <img src={facebook} className='w-[15px] sm:w-auto' alt="Facebook" />
                    </a>
                    <a href="https://twitter.com/AmaliTech_gGmbh/highlights" target="_blank" rel="noopener noreferrer">
                        <img src={twitter} className='w-[15px] sm:w-auto' alt="Twitter" />
                    </a>
                    <a href="https://www.instagram.com/amalitech_ggmbh/?hl=en" target="_blank" rel="noopener noreferrer">
                        <img src={Instagram} className='w-[15px] sm:w-auto' alt="Instagram" />
                    </a>
                    <a href="https://gh.linkedin.com/company/amalitech" target="_blank" rel="noopener noreferrer">
                        <img src={Linkedin} className='w-[15px] sm:w-auto' alt="LinkedIn" />
                    </a>
                    <a href="https://m.youtube.com/channel/UC9roo4fnQL0caJQSAm7tB3A" target="_blank" rel="noopener noreferrer">
                        <img src={youtube} className='w-[15px] sm:w-auto' alt="YouTube" />
                    </a>
                </span>
            </section>
        </footer>
    );
}
