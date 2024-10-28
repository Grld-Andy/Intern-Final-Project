import AboutCard from "../Components/AboutCard"
import Card from "../Components/Card"
import Navbar from "../Components/Navbar"
import bgImage from '../assets/bgimage.jpg.jfif'
import industrial from '../assets/Industrial.png'
import Leader from '../assets/Leader.png'
import social from '../assets/Social media.png'
import nextImage from '../assets/Alex (1) 1.png'
import ProjectCard from "../Components/ProjectCard"
import ProjectList from "../Components/ProjectList"
import next from "../assets/sideimge.jpg"
import sideImage from '../assets/next.png'
import footerImage from '../assets/Content (1).png'
import Footer from "../Components/Footer"
export default function Home(){
    return (
       
        <section className="bg-[#F9FAFB]">
            <Navbar/>
<div className="relative">
            <section className=" mt-[96px]">
<div className="">
    <img src={bgImage} alt="instructor explaining corporate showcase" className="lg:h-[839px]  w-full aspect-square  object-cover  object-top  "/>
</div>

<div id="about" className="bg-black ">
<span className="absolute flex flex-col lg:w-[1030px] lg:h-[336px] gap-4 top-1/2 left-[80px] transform -translate-y-1/2 z-10">
<h1 className="font-semibold text-[48px] text-white leading-[60px] font-[700]">
    Explore Amalitech's Groundbreaking Works & Projects Pioneering Innovation and Impactful Change.
</h1>

<h2 className="text-[18px] leading-[28px] text-white font-normal font-[400] text-">
    Show casing our visionary in tech projects that inspire you.
</h2>

<button className="bg-[#1570EF] border-[#1570EF] lg:w-[131px] border rounded-[8px] text-white py-[10px] px-[18px]  leading-[24px] font-sembold">Explore now</button>
</span>
</div>

<div className="absolute w-full h-full bg-black top-0 opacity-40">

</div>
            </section>


            <section className="absolute top-[680px] shadow-lg lg:min-w-[1280px] lg:min-h-[528px]  bg-white left-[80px] right-[80px]  border-[1px]  ">
<div className="flex flex-col gap-10 p-[48px]">
<AboutCard/>
<div className="flex flex-row gap-[113px]">
    <Card 
    imageUrl={industrial}
    title="Innovative Technology" content="We leverage the latest in software development, AI, and digital transformation to create tailored solutions for diverse industries."/>
<Card
imageUrl={social}
title="Social impact"
content="Our projects are not just about technology; they are driven by a commitment to uplift communities and create opportunities for growth."
/>

<Card 
imageUrl={Leader}
title="Expert Teams" content="Our highly skilled professionals are dedicated to delivering exceptional results, ensuring that every project meets the highest standards of quality and efficiency."/>
</div>
</div>




            </section>

            </div> 
            
            <section>

            <img src={nextImage} alt="business women meeting" className="lg:min-h-[449px] mt-[500px] w-full bg-cover "/>

            <div className="bg-[#0C4767] w-full py-[76px] px-[80px]">
              

<div className="w-fit mx-auto flex flex-col gap-[40px]">
<span>
                    <h1 className="font-[600] text-[48px] text-white  leading-[60px]">Why our Projects stand out</h1>
                </span>
        <ProjectCard/>
        </div>    
         
            </div>
            </section>


            <section className="pt-[64px] px-[80px] lg:min-w-[1440px] xl:min-w-[1440px] lg:min-h-[919px] flex flex-col gap-[40px] mx-auto pb-[48px] ">

<p className="text-center font-[600] text-[48px] leading-[60px] text-[#1D2939] ">Our recent projects</p>


           
                <ProjectList/>
            </section>


            <section className="relative">

                <div className="">
                <img src={next} className="lg:h-[404px] aspect-square  object-cover  object-top w-full"/>


                </div>
<div>
    <h1 className="text-white absolute font-[700] text-[48px] leading-[60px] lg:min-w-[966px] text-center top-1/2 left-1/2 transform -translate-x-1/2 z-10 -translate-y-1/2">We showcase projects that build lasting partnerships by meeting our clients' evolving needs.</h1>
</div>

<div className="absolute w-full h-full bg-black bg-opacity-40 top-0">

</div>
            </section>


            <section className="px-[80px] pt-[64px] ">
                <div className="bg-white flex shadow-xl flex-row lg:gap-[131px] justify-center lg:min-w-[1248px] lg:min-h-[652px] border items-center border-[#D0D5DD]">
                
<span className="space-y-[24px]">
    <h1 className="text-[48px] leading-[60px] lg:w-[576px] font-[600]">
        Would you like to discuss with us about one our amazing project?
    </h1>

    <button className="bg-[#1570EF] border-[#1570EF] lg:min-w-[85px] border rounded-[8px] text-white py-[10px] px-[18px] text-[16px]  leading-[24px] font-sembold">Contact us</button>

</span>
<img src={sideImage} alt="name of the person" className="lg:w-[386px] lg:h-[550px]"/>       </div>

            </section>
 
 

 <div className="relative">
 <div className="pt-[64px] px-[80px] mb-20 ">
    <img src={footerImage} alt="close up colleagues talking" className="lg:min-w-[1216px] object-cover lg:h-[386px]"/>
    <div className="absolute bg-opacity-40 lg:min-w-[1216px] lg:h-[386px] bottom-0 h-full bg-black">

</div>
 </div>

 
 </div>

 <Footer/>
            </section>      
    )
}