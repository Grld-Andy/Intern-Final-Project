import AboutCard from "../components/AboutCard"
import Card from "../components/Card"
import Navbar from "../components/Navbar"
import bgImage from '../assets/bgimage.jpg.jfif'
import industrial from '../assets/Industrial.png'
import Leader from '../assets/Leader.png'
import social from '../assets/Social media.png'
import nextImage from '../assets/Alex (1) 1.png'
import ProjectCard from "../components/ProjectCard"

import next from "../assets/sideimge.jpg"
import sideImage from '../assets/next.png'
import footerImage from '../assets/Content (1).png'
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import Project from "../models/Project"
import axios from "axios"
import ProjectCell from "../components/ProjectCell"
import ProjectsSkeletonGrid from "../components/ProjectsPage/ProjectsSkeletonGrid"

export default function Home() {
    const[projects,setProjects]=useState<Project[]>([])
    const [status, setStatus] = useState<string>("loading")

    useEffect(() => {
        setStatus("loading")
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/projects`)
        .then((res) => {
            if(res.data){
                setProjects(res.data.projects)
                setStatus("done")
            }
        }).catch((err) => {
            console.error(err)
            setStatus("failed")
        })
    }, [])

    return (
        <section className="bg-[#F9FAFB]">
            <Navbar />
            
            <div className="relative">
                {/* Hero Section */}
                <section className="relative">
                    <div>
                        <img 
                            src={bgImage} 
                            alt="Instructor explaining corporate showcase" 
                            className="md:h-[839px] w-full aspect-square object-cover object-top"
                        />
                    </div>

                    <div id="about" className="bg-black">
                        <span className="absolute flex flex-col 2xl:w-[1030px] items-center md:items-start text-center md:text-start lg:h-[336px] gap-4 top-1/2 md:top-1/2 lg:left-[80px] w-[90%] sm:w-2/3 md:w-auto lg:pl-0 transform -translate-y-1/2 z-10 px-2">
                            <h1 className="md:text-[48px] sm:text-[25px] text-white md:leading-[60px] font-[700]">
                                Explore Amalitech's Groundbreaking Works & Projects Pioneering Innovation and Impactful Change.
                            </h1>
                            <h2 className="text-[18px] sm:leading-[28px] text-white font-[400]">
                                Showcasing our visionary tech projects that inspire you.
                            </h2>
                            <button className="bg-[#1570EF] border-[#1570EF] lg:w-[131px] w-[150px] border rounded-[8px] text-white py-[10px] px-[18px] leading-[24px] font-sembold">
                                Explore now
                            </button>
                        </span>
                    </div>

                    <div className="absolute w-full h-full bg-black top-0 opacity-40"></div>
                </section>

                {/* About Section */}
                <section className="2xl:absolute md:top-[670px] lg:absolute w-fit xl:shadow-lg xl:min-h-[528px] bg-white xl:left-[80px] xl:right-[80px] border-[1px]">
                    <div className="flex flex-col gap-10 md:p-[48px] p-4">
                        <AboutCard />
                        <div className="flex flex-col lg:flex-row gap-4 md:gap-[113px]">
                            <Card 
                                imageUrl={industrial}
                                title="Innovative Technology" 
                                content="We leverage the latest in software development, AI, and digital transformation to create tailored solutions for diverse industries."
                            />
                            <Card 
                                imageUrl={social}
                                title="Social Impact" 
                                content="Our projects are not just about technology they are driven by a commitment to uplift communities and create opportunities for growth."
                            />
                            <Card 
                                imageUrl={Leader}
                                title="Expert Teams" 
                                content="Our highly skilled professionals are dedicated to delivering exceptional results, ensuring that every project meets the highest standards of quality and efficiency."
                            />
                        </div>
                    </div>
                </section>
            </div>

            {/* Next Image Section */}
            <section>
                <img 
                    src={nextImage} 
                    alt="Business women meeting" 
                    className="2xl:min-h-[449px] h-[200px] md:h-[400px] lg:mt-[450px] mt-[6%] xl:mt-[60vh] 2xl:mt-[58vh] w-full object-cover aspect-square object-top"
                />
                <div className="bg-[#0C4767] md:w-full py-[76px] xl:px-[80px] px-[20px]">
                    <div className="w-fit mx-auto flex flex-col gap-[40px]">
                        <span>
                            <h1 className="font-[600] text-[35px] md:text-[48px] text-white leading-[60px]">
                                Why our Projects Stand Out
                            </h1>
                        </span>
                        <ProjectCard />
                    </div>    
                </div>
            </section>

            {/* Recent Projects Section */}
            <section className="pt-[64px] px-[20px] lg:px-[80px] 2xl:min-w-[1440px] xl:min-h-[919px] flex flex-col gap-[40px] mx-auto pb-[48px]">
                <p className="text-center font-[600] text-[48px] leading-[60px] text-[#1D2939]">
                    Our Recent Projects
                </p>
                {/* projects grid */}
                {
                    status === "loading"?
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-8 h-[2290px] lg:h-[742px] md:h-[1129px] md:mx-0 mx-20">
                        {
                            Array.from({length: 6}).map((_, index) => (
                                <ProjectsSkeletonGrid key={index}/>
                            ))
                        }
                    </div>:
                    status === "done" && projects.length > 0?
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-8 min-h-[660px] md:mx-0 mx-20">
                        {
                            projects.map((project, index) => (
                                <ProjectCell project={project} key={index}/>
                            ))
                        }
                    </div>:<h1 className="text-[#344054] font-semibold text-xl">Coming soon...</h1>
                }
                <div className="flex justify-center">
                    <a href="/projects">
                        <button className="bg-[#1570EF] border-[#1570EF] rounded-lg text-white py-[10px] px-[18px]">
                            View All Projects
                        </button>
                    </a>
                </div>
            </section>

            {/* Showcase Projects Section */}
            <section className="relative">
                <div>
                    <img 
                        src={next} 
                        className="lg:h-[404px] h-[300px] aspect-square object-cover object-top w-full"
                    />
                </div>
                <div>
                    <h1 className="text-white absolute font-[700] lg:text-[48px] text-[18px] sm:text-[25px] lg:leading-[60px] lg:min-w-[966px] text-center top-1/2 left-1/2 transform -translate-x-1/2 z-10 -translate-y-1/2">
                        We showcase projects that build lasting partnerships by meeting our clients' evolving needs.
                    </h1>
                </div>
                <div className="absolute w-full h-full bg-black bg-opacity-40 top-0"></div>
            </section>

            {/* Contact Us Section */}
            <section className="md:px-[80px] px-[20px] pt-[64px]">
                <div className="bg-white flex shadow-xl flex-col-reverse p-4 px-6 lg:flex-row md:gap-[131px] gap-10 justify-center lg:min-[100px] 2xl:min-w-[1248px] xl:min-h-[652px] border items-center border-[#D0D5DD]">
                    <span className="space-y-[24px] w-full flex flex-col items-center lg:items-start">
                        <h1 className="md:text-[48px] text-[25px] md:leading-[60px] text-center md:text-start xl:w-[576px] font-[600]">
                            Would you like to discuss one of our amazing projects?
                        </h1>
                        <button className="bg-[#1570EF] border-[#1570EF] w-fit xl:min-w-[85px] border rounded-[8px] text-white py-[10px] px-[18px] text-[16px] leading-[24px] font-sembold">
                            Contact Us
                        </button>
                    </span>
                    <img 
                        src={sideImage} 
                        alt="Name of the person" 
                        className="md:w-[386px] lg:h-[550px] object-cover aspect-square object-top h-[300px]"
                    />       
                </div>
            </section>

            {/* Footer Section */}
            <div className="relative px-[20px] lg:px-[80px] lg:w-[70vw] mt-[8%] mb-[8%]">
                <div className="relative max-w-full">
                    <img 
                        src={footerImage} 
                        className="aspect-square object-cover h-[400px] lg:h-[500px] object-top w-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div> 
                </div>
            </div>

            <Footer />
        </section>
    )
}
