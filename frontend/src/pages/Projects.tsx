import React, { FormEventHandler, useContext, useEffect, useRef, useState } from "react"
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FilterListIcon from '@mui/icons-material/FilterList'
import { UserContext } from "../contexts/UserContext"
import ProjectCell from "../components/ProjectCell"
import axios from "axios"
import Project from "../models/Project"
import Footer from "../components/Footer"
import projectStacks from "../utils/projectStacks"
import FilterCheckbox from "../components/ProjectsPage/FilterCheckbox"
import RadioButton from "../components/ProjectsPage/RadioButton"
import ProjectsSkeletonGrid from "../components/ProjectsPage/ProjectsSkeletonGrid"

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Array<Project>>([])
    const [totalProjects, setTotalProjects] = useState<number>(0)
    const [filters, setFilters] = useState<Array<string>>([])
    const [sort, setSort] = useState<string>("Sort by most recent")
    const [page, setPage] = useState<number>(1)
    const [search, setSearch] = useState<string>("")
    const {user} = useContext(UserContext)
    const [status, setStatus] = useState<string>("loading")
    const limit = 6
    const prevSearch = useRef<string>("")

    const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        const filterBy = filters.join(",")
        const sortBy = sort == "Sort by most recent" ? "mostRecent" : "oldestFirst"
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/projects/filter?limit=${limit}&sort=${sortBy}&stackNames=${filterBy}&title=${search}`, {withCredentials: true})
        .then((res) => {
            if(res.data){
                setProjects(res.data.projects)
                setPage(1)
                setTotalProjects(res.data.totalProjects)
                setStatus("done")
            }
        }).catch((err) => {
            console.error(err)
            setStatus("failed")
        })
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/projects/filter?limit=${limit}`, {withCredentials: true})
        .then((res) => {
            if(res.data){
                setProjects(res.data.projects)
                setTotalProjects(res.data.totalProjects)
                setStatus("done")
            }
        })
        .catch((err) => {
            setProjects([])
            console.error(err)
            setStatus("failed")
        })
    }, [])

    useEffect(() => {
        setStatus("loading")
        setPage(prevSearch.current == search ? page : 1)
        prevSearch.current = search
        const filterBy = filters.join(",")
        const sortBy = sort == "Sort by most recent" ? "mostRecent" : "oldestFirst"
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/projects/filter?limit=${limit}&page=${page}&sort=${sortBy}&stackNames=${filterBy}&title=${search}`, {withCredentials: true})
        .then((res) => {
            if(res.data){
                setProjects(res.data.projects)
                setTotalProjects(res.data.totalProjects)
                setStatus("done")
            }
        }).catch((err) => {
            console.error(err)
            setStatus("failed")
        })
    }, [sort, filters, page, search])

    const clearFilters = () => {
        setFilters([])
    }

    const updateFilters = (value:string) => {
        if(filters.includes(value)) {
            setFilters(filters.filter((filter) => filter !== value))
        } else {
            setFilters([...filters, value])
        }
    }


    const nextPage = () => {
        if(6 * page >= totalProjects) return
        setPage(page + 1)
    }

    const prevPage = () => {
        if(page <= 1) return
        setPage(page - 1)
    }

  return (
    <div className="text-[#344054] bg-[#F9FAFB]">
        {/* hero image and search bar */}
        <div className="bg-[linear-gradient(#17020266,#17020266),url('/Projects_page/project_hero.jpg')] bg-cover bg-[10%_25%] flex flex-col justify-center items-center relative w-full h-[482px] mb-20">
            <h1 className="text-white text-[38px] font-bold">Projects</h1>
            <form onSubmit={handleSearch} className="absolute flex bg-white top-[432px] border border-[#d0d5dd] p-6 gap-2 shadow-md">
                <div className="flex border border-[#d0d5dd] rounded-lg p-2 md:w-[364px] gap-2 items-center">
                    <SearchOutlinedIcon />
                    <input value={search} onChange={(e) => {setSearch(e.target.value)}} type="text" placeholder="Search projects by name" className="w-full text-base font-normal leading-6 border-none outline-none text-[14px]" />
                </div>
                <button className="bg-[#1570ef] rounded-lg text-white px-4 py-2 font-semibold text-base">Search</button>
            </form>
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
                        {projectStacks.map((stack:string, index:number) => (
                            <FilterCheckbox checked={filters.includes(stack)} key={index} stack={stack} updateFilters={updateFilters}/>
                        ))}
                    </div>
                </div>
                <hr />
                
                {/* sort by date */}
                <div className="flex flex-col gap-2">
                    <h1 className="font-medium text-base leading-6 text-[#1d2939]">Date</h1>
                    <div className="flex flex-col gap-4 p-1">
                        {["Sort by most recent", "Sort by oldest first"].map((sortBy, index) => (
                            <RadioButton checked={sortBy === sort} key={index} sortBy={sortBy} setSort={setSort}/>
                        ))}
                    </div>
                </div>

                {/* clear filters */}
                <div className="w-full flex justify-end text-red-700 font-semibold text-sm leading-5">
                    <div onClick={clearFilters} className="cursor-pointer">
                        <HighlightOffIcon /> Clear filter(s)
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="flex justify-between items-center h-11 mb-8">
                    <h1 className="font-semibold text-[24px] leading-8">Projects ({totalProjects})</h1>
                    {
                        user &&
                        <a href="/add-project/project-overview">
                            <button className="bg-[#1570ef] text-white font-semibold rounded-lg px-4 py-2 text-base leading-6">Add Project</button>
                        </a>
                    }
                </div>

                {/* projects grid */}
                {
                    status === "loading"?
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-8 h-[2290px] lg:h-[742px] md:h-[1129px]">
                        {
                            Array.from({length: 6}).map((_, index) => (
                                <ProjectsSkeletonGrid key={index}/>
                            ))
                        }
                    </div>:
                    status === "done" && projects.length > 0?
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-8 min-h-[660px]">
                        {
                            projects.map((project, index) => (
                                <ProjectCell project={project} key={index}/>
                            ))
                        }
                    </div>:<h1 className="text-[#344054] font-semibold text-xl">No projects found</h1>
                }
                <hr />

                {/* pagination */}
                <div className="flex items-center justify-between gap-4 p-3 text-sm leading-5 text-[#344054]">
                    <h1>Page {page} of {`${Math.ceil(totalProjects/limit)}`}</h1>
                    <div className="flex gap-3">
                        <button type="button" onClick={prevPage} className={`bg-white border border-[#d0d5dd] rounded-lg px-4 py-2 font-medium shadow-sm ${page === 1 ? "opacity-50 pointer-events-none" : ""}`}>Previous</button>
                        <button type="button" onClick={nextPage} className={`bg-white border border-[#d0d5dd] rounded-lg px-4 py-2 font-medium shadow-sm ${page === Math.ceil(totalProjects/limit) || page === 0 ? "opacity-50 pointer-events-none" : ""}`}>Next</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-[35px]">
            <Footer/>
        </div>
    </div>
  )
}

export default Projects
