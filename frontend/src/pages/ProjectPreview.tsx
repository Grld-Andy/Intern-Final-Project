import React, { useContext, useEffect, useState } from "react"
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined"
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined"
import RequestDemoModal from "../components/RequestDemoModal"
import { UserContext } from "../contexts/UserContext"
import { useParams } from "react-router-dom"
import axios from "axios"
import Project from "../models/Project"
import Footer from "../components/Footer"
import getProjectCreationString from "../utils/getProjectCreationString"
import getFormattedLastModifiedDate from "../utils/getFormattedLastModifiedDate"
import parseLinkedDocs from "../utils/parseLinkedDocs"

const ProjectPreview: React.FC = () => {
  const {user} = useContext(UserContext)
  const {id} = useParams()
  const [fullDescription, setFullDescription] = useState<boolean>(false)
  const [project, setProject] = useState<Project | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/projects/${id}`)
    .then((res) => {
      setProject(res.data.project)
      parseLinkedDocs(res.data.project?.linkeddocs)
    }).catch((err) => {
      console.error(err)
    })
  }, [id])

  const handleShowModal = (show: boolean) => {
    setShowModal(show)
  }

  return (
    <>
      {
        showModal && <RequestDemoModal id={id} handleShowModal={handleShowModal}/>
      }
      <div className="project-preview bg-[#F9FAFB]">
        {/* hero image */}
        <div
          style={{
            backgroundImage: `linear-gradient(transparent, rgba(23, 2, 2, 0.4)), url(${project?.coverphotourl})`,
          }}
          className={`w-full h-[333px] bg-cover bg-center bg-no-repeat`}></div>

        {/* page container */}
        <div className={`page-container px-8 py-6 ${showModal && "h-0 overflow-hidden"}`}>
          <div className="header flex flex-col justify-between py-4 gap-6 border-b border-[#d0d5dd]">
            <h1 className="text-[48px] leading-[60px] font-bold text-[#1d2939]">{project?.title}</h1>
            <div className="flex justify-between items-center">
              <div className="time-list flex gap-2 items-center bg-[#f4eae9] p-[8px] pr-3 rounded-[100px] text-[#a4120e]">
                <div className="rounded-[16px] bg-white px-[8px] py-[2px] flex gap-2 justify-between items-center">
                  <CalendarTodayOutlinedIcon className="w-[24px] h-[24px]"/>
                  <span className="text-[14px] leading-5 font-normal">{getProjectCreationString(project?.createdat)}</span>
                </div>
                <p className="text-[14px] leading-5 font-normal">{getFormattedLastModifiedDate(project?.updatedat)}</p>
              </div>
              {
                user ?
                <a href={`/edit-project/project-overview/${id}`}>
                  <button className="bg-[#1570ef] rounded-lg text-white px-[18px] py-[10px] font-semibold text-base leading-[24px]">
                    Edit project
                  </button>
                </a>:
                <button
                  className="bg-[#1570ef] rounded-lg text-white px-[18px] py-[10px] font-semibold text-base leading-[24px]" onClick={() => handleShowModal(true)}>
                  Request demo
                </button>
              }
            </div>
          </div>

          <div className="grid md:grid-cols-[auto,1px,354px] gap-[47px] mt-[32px]">
            <div className="flex gap-[45px] flex-col">
              <div className="flex gap-[8px] flex-col">
                <h3 className="text-[#475467] font-medium text-[12px] leading-[18px]">Development Stack</h3>
                <div className="flex gap-[8px]">
                {
                  project?.developmentstack &&
                  project?.developmentstack.map((stack, index) => (
                    <div className="rounded-[16px] bg-[#f2f4f7] px-[8px] py-[2px]" key={index}>
                      <p className="text-[12px] leading-[18px] font-medium text-center">{stack.stackName}</p>
                    </div>
                  ))
                }
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-[#1d2939] font-semibold text-[20px] leading-[30px]">Project description</h1>
                <p className="text-[#344054] leading-[28px] text-[18px] font-normal">
                  {
                    project?.description &&
                    project?.description?.length < 350 ? project?.description :
                    <>
                      {
                        fullDescription ? project?.description : project?.description?.substring(0, 350) + "..."
                      }
                      {
                        fullDescription ?
                        <span onClick={() => setFullDescription(false)} className="font-semibold cursor-pointer text-[#1570ef]">See less</span>:
                        <span onClick={() => setFullDescription(true)} className="font-semibold cursor-pointer text-[#1570ef]">See more</span>
                      }
                    </>
                  }
                </p>
              </div>
              <div className="flex flex-col gap-[16px]">
                <h1 className="text-[#1d2939] font-semibold text-[20px] leading-[30px]">Project features</h1>
                <div className="grid grid-cols-2 gap-[16px]">
                  {
                    project?.projectfeatures &&
                    project?.projectfeatures.map((feature, index) => (
                      <div className="flex gap-2" key={index}>
                        <CheckCircleIcon className="text-[#1570ef]"/>
                        <p className="text-[18px] leading-[28px] text-[#344054] font-normal">{feature.featureName}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="flex flex-col gap-[16px]">
                <h1 className="text-[#1d2939] font-semibold text-[20px] leading-[30px]">Areas of Improvement/Future updates</h1>
                <div className="grid grid-cols-2 gap-[16px]">
                  {
                    project?.improvementareas &&
                    project?.improvementareas.map((area, index) => (
                      <div className="flex gap-2" key={index}>
                        <CheckCircleIcon className="text-[#1570ef]"/>
                        <p className="text-[18px] leading-[28px] text-[#344054] font-normal">{area.areaName}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="flex flex-col gap-[16px]">
                <h1 className="text-[#1d2939] font-semibold text-[20px] leading-[30px]">Technical details and Decisions</h1>
                <div className="w-full">
                  <video className="w-full" src={project?.technicaldetailsvideo} controls></video>
                </div>
              </div>
            </div>

            <div className="md:w-[1px] md:h-full w-full h-[1px] bg-[#d0d5dd]"></div>

            <div className="flex gap-[24px] flex-col w-[354px]">
              <div className="flex gap-[12px] p-[24px] flex-col">
                <div className="gap-[8px] flex">
                  <LinkOutlinedIcon style={{ width: 24, height: 24 }}/>
                  <h1 className="font-semibold text-[#344054] text-[16px] leading-[24px]">Linked Docs</h1>
                </div>
                  {
                    project?.linkeddocs &&
                    parseLinkedDocs(project?.linkeddocs).map((doc) => (
                      <div className="cursor-pointer w-[318px] min-h-[40px] py-[5px] px-[14px] border border-[#d0d5dd] justify-between rounded-lg flex items-center bg-white gap-2">
                      <div className="flex items-center w-full">
                        <h1 className="outline-none border-none w-full h-full text-[14px] font-normal leading-[20px] text-[#344054]">
                          <div>
                            {
                              doc?.text &&
                              <div dangerouslySetInnerHTML={{__html: doc?.text}}></div>
                            }
                          </div>
                        </h1>
                        <ArrowOutwardOutlinedIcon style={{ width: 24, height: 24 }} />
                      </div>
                    </div>
                    ))
                  }
              </div>
              <div className="flex gap-3 p-[24px] flex-col">
                <div className="flex gap-2">
                  <GroupOutlinedIcon className="w-[24px] h-[24px]"/>
                  <h1 className="text-[16px] leading-[24px] font-semibold text-[#344054]">Development team/Contributors</h1>
                </div>
                <div className="flex flex-col gap-[12px]">
                  {
                    Array.from({length: 4}).map((_, index) => (
                      <div className="grid gap-[12px] grid-cols-[auto,1fr,auto] items-center" key={index}>
                        <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden">
                          <img className="w-full h-full object-cover" src="/Projects_preview_page/frontend.jpg"/>
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-[#344054] font-semibold text-[14px] leading-[20px]">Member Name</h1>
                          <p className="text-[12px] leading-[18px] font-normal text-[#667085]">Member Role</p>
                        </div>
                        <button>
                          <DeleteOutlineIcon style={{ width: 16, height: 16 }}/>
                        </button>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[35px]">
            <Footer/>
        </div>
      </div>
    </>
  )
}

export default ProjectPreview
