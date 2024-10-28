import amalitechLogo from '../assets/logoImage.png'

export default function Footer(){
return (
    <footer className='bg-[#3A3A3A] pt-[64px] pb-[48px]'>

<section className='flex flex-row gap-[48px]    px-[32px]'>
    <img src={amalitechLogo} alt='amalitech logo' className='lg:w-[288px] h-[48px]'/>

    <div className='flex  flex-row gap-20 flex-1 justify-around  '>

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


<section>
   


    <span>
    &copy; 2023. All rights resevered. 

    </span>
</section>
    </footer>
)
}