import React from 'react'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined'
import { Link } from "react-router-dom"
import Project from '../models/Project'
import isNewProject from '../utils/isNewProject'

interface Props{
    project: Project
}

const ProjectCell: React.FC<Props> = ({project}) => {
  return (
        <div className="relative overflow-hidden">
            <div className="relative overflow-hidden h-[193px]">
                {
                    isNewProject(project.createdat) &&
                    <button className="absolute top-2 left-2 bg-white text-[#1570ef] border border-[#d0d5dd] rounded-full px-2 py-0.5 flex items-center gap-2">
                        <AutoAwesomeOutlinedIcon />
                        <p className="text-sm font-medium leading-5">New</p>
                    </button>
                }
                <img src={project.coverphotourl} alt="project" className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col border border-[#d0d5dd] gap-2">
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-lg leading-7 text-ellipsis overflow-hidden line-clamp-1">{project.title}</h1>
                    <MoreVertOutlinedIcon className="cursor-pointer"/>
                </div>
                <p className="h-[60px] text-sm font-normal leading-5 text-ellipsis overflow-hidden line-clamp-3">
                    {project.description}
                </p>
                <Link to={`/projects/${project.id}`}>
                    <h2 className="text-[#1570ef] cursor-pointer font-medium text-base leading-6 flex items-center">
                        Read more <ArrowOutwardOutlinedIcon />
                    </h2>
                </Link>
            </div>
        </div>
    )
}

export default ProjectCell
