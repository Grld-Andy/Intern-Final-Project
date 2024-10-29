import React, { useContext, useEffect } from "react"
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

import FilterListIcon from '@mui/icons-material/FilterList'
import { UserContext } from "../contexts/UserContext"
import ProjectCell from "../components/ProjectCell"
import axios from "axios"

const Projects: React.FC = () => {
    const {user} = useContext(UserContext)

    useEffect(() => {
        axios.get("")
        .then(() => {})
        .catch(() => {})
    }, [])

  return (
    <div className="text-[#344054] bg-[#F9FAFB]">

        {/* hero image and search bar */}
        <div className="bg-[linear-gradient(#17020266,#17020266),url('/Projects_page/project_hero.jpg')] bg-cover bg-[10%_25%] flex flex-col justify-center items-center relative w-full h-[482px] mb-20">
            <h1 className="text-white text-[38px] font-bold">Projects</h1>
            <div className="absolute flex bg-white top-[432px] border border-[#d0d5dd] p-6 gap-2 shadow-md">
                <div className="flex border border-[#d0d5dd] rounded-lg p-2 w-[364px] gap-2 items-center">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search projects by name" className="w-full text-base font-normal leading-6 border-none outline-none text-[14px]" />
                </div>
                <button className="bg-[#1570ef] rounded-lg text-white px-4 py-2 font-semibold text-base">Search</button>
            </div>
        </div>
        
        <div className="flex gap-10 px-8">
            {/* filter */}
            <div className="w-[275px] h-min p-6 flex flex-col gap-6 bg-white shadow-md">
                <div className="flex items-center pb-[8px] justify-between gap-2 border-b">
                    <h1 className="font-medium text-lg leading-7 p-1 text-[#1d2939]">Filter</h1>
                    <FilterListIcon />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="font-medium text-[16px] leading-7 p-1 text-[#1d2939]">Stack</h1>
                    <div className="flex flex-col gap-4 p-1">
                        {["MEANstack", "MERNstack", "JAMstack", ".Net Stack", "Spring Boot Stack", "Flutter/Firebase Stack", "Django Stack", "Serverless Stack"].map((stack, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                                <label className="text-sm font-normal text-[#667085] cursor-pointer leading-5">{stack}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <hr />
                
                {/* sort by date */}
                <div className="flex flex-col gap-2">
                    <h1 className="font-medium text-base leading-6 text-[#1d2939]">Date</h1>
                    <div className="flex flex-col gap-4 p-1">
                        {["Sort by most recent", "Sort by oldest first"].map((sort, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <input type="radio" name="sort" className="w-4 h-4 cursor-pointer" />
                                <label className="text-sm font-normal text-[#667085] cursor-pointer leading-5">{sort}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* clear filters */}
                <div className="text-right text-red-700 cursor-pointer font-semibold text-sm leading-5">
                    <HighlightOffIcon /> Clear filter(s)
                </div>
            </div>

            <div className="w-full">
                <div className="flex justify-between items-center h-11 mb-8">
                    <h1 className="font-semibold text-[24px] leading-8">Projects (20)</h1>
                    {
                        user &&
                        <button className="bg-[#1570ef] text-white font-semibold rounded-lg px-4 py-2 text-base leading-6">Add Project</button>
                    }
                </div>

                {/* projects grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <ProjectCell key={index}/>
                    ))}
                </div>
                <hr />

                {/* pagination */}
                <div className="flex items-center justify-between gap-4 p-3 text-sm leading-5 text-[#344054]">
                    <h1>Page 1 of 10</h1>
                    <div className="flex gap-3">
                        <button className="bg-white border border-[#d0d5dd] rounded-lg px-4 py-2 font-medium shadow-sm">Previous</button>
                        <button className="bg-white border border-[#d0d5dd] rounded-lg px-4 py-2 font-medium shadow-sm">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Projects
