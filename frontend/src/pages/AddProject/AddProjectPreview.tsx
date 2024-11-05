import React, { useContext, useEffect, useState } from "react"
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined"
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined"
import PublishProjectModal from "../../components/PublishProjectModal"
import Footer from "../../components/Footer"
import {ProjectFormContext} from "../../contexts/ProjectFormContext"
import getProjectCreationString from "../../utils/getProjectCreationString"
import getFormattedLastModifiedDate from "../../utils/getFormattedLastModifiedDate"
import { useNavigate } from "react-router-dom"

const AddProjectPreview: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const {projectForm} = useContext(ProjectFormContext)
  const [fullDescription, setFullDescription] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    scrollTo(0, 0)
    if(!projectForm?.title){
      navigate('/add-project/project-overview')
    }
  }, [navigate, projectForm])

  const handleShowModal = (show: boolean) => {
    setShowModal(show)
  }

  return (
    <>
      {
        showModal && 
        <PublishProjectModal handleShowModal={handleShowModal}/>
      }
      <div className={`project-preview bg-[#F9FAFB] ${showModal && "h-[89vh] overflow-hidden"}`}>
        {/* project progress */}
        <div className="w-full h-[150px] py-[16px] px-[80px] border border-[#d0d5dd] bg-gradient-to-r from-[#bed6f840] to-[#dbe6f040] flex flex-col gap-[16px]">
          <div className="flex justify-between">
            <div className="flex gap-[8px] flex-col">
              <h1 className="text-[24px] leading-[32px] font-bold text-[#344054]">
                Add Project
              </h1>
              <div className="flex gap-[8px] items-center">
                <h2 className="text-[12px] leading-[18px] font-medium text-[#667085]">Projects</h2>
                <ChevronRightIcon style={{width: "16px", height: "16px", color: "#667085", position: "relative", top: "1px"}}/>
                <h2 className="text-[12px] leading-[18px] font-medium text-[#667085]">
                  Add Project
                </h2>
              </div>
            </div>
            <button onClick={() => {handleShowModal(true)}} className="bg-[#1570ef] h-[40px] w-[128px] rounded-lg text-white flex justify-center items-center font-semibold text-[14px] leading-[20px]">
              Publish Project
            </button>
          </div>
          <div className="flex gap-[24px] md:justify-normal justify-between">
            <div className="flex md:gap-[24px] md:flex-row gap-[4px] flex-col">
              <div className="flex gap-[8px] items-center">
                <CheckCircleIcon style={{width: "16px", height: "16px", color: "#667085"}}/>
                <h3 className="text-[14px] leading-[20px] font-medium text-[#667085]">Basic information</h3>
              </div>
              <div className="flex gap-[8px] items-center">
                <CheckCircleIcon style={{width: "16px", height: "16px", color: "#667085"}}/>
                <h3 className="text-[14px] leading-[20px] font-medium text-[#667085]">Technical details and development</h3>
              </div>
            </div>
            <div className="rounded-lg border border-[#1570ef] bg-[#eff8ff] flex justify-center items-center gap-[8px] text-[#1570ef] px-[14px] py-[8px]">
              <RemoveRedEyeOutlinedIcon/>
              <h2 className="cursor-default text-[14px] leading-[20px] font-medium">Preview</h2>
            </div>
          </div>
        </div>
        {/* hero image */}
        <div
          style={{
            backgroundImage: `linear-gradient(transparent, rgba(23, 2, 2, 0.4)), url(${projectForm?.coverphotourl})`,
          }}
          className={`w-full h-[333px] bg-cover bg-center bg-no-repeat`}></div>

        {/* page container */}
        <div className={`page-container px-8 py-6 ${showModal && "h-screen overflow-hidden"}`}>
          <div className="header flex flex-col justify-between py-4 gap-6 border-b border-[#d0d5dd]">
            <h1 className="text-[48px] leading-[60px] font-bold text-[#1d2939]">{projectForm?.title}</h1>
            <div className="flex justify-between items-center">
              <div className="time-list flex gap-2 items-center bg-[#f4eae9] p-[8px] pr-3 rounded-[100px] text-[#a4120e]">
                <div className="rounded-[16px] bg-white px-[8px] py-[2px] flex gap-2 justify-between items-center">
                  <CalendarTodayOutlinedIcon className="w-[24px] h-[24px]"/>
                  <span className="text-[14px] leading-5 font-normal">{getProjectCreationString(new Date)}</span>
                </div>
                <p className="text-[14px] leading-5 font-normal">{getFormattedLastModifiedDate(new Date)}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-[auto,1px,354px] gap-[47px] mt-[32px]">
            <div className="flex gap-[45px] flex-col">
              <div className="flex gap-[8px] flex-col">
                <h3 className="text-[#475467] font-medium text-[12px] leading-[18px]">Development Stack</h3>
                <div className="flex gap-[8px]">
                {
                  projectForm?.developmentstack &&
                  projectForm?.developmentstack.map((stack, index) => (
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
                    projectForm?.description &&
                    projectForm?.description?.length < 350 ? projectForm?.description :
                    <>
                      {
                        fullDescription ? projectForm?.description : projectForm?.description?.substring(0, 350) + "..."
                      }
                      {
                        fullDescription ?
                        <span onClick={() => setFullDescription(false)} className="font-semibold cursor-pointer text-[#1570ef]"> See less</span>:
                        <span onClick={() => setFullDescription(true)} className="font-semibold cursor-pointer text-[#1570ef]">See more...</span>
                      }
                    </>
                  }
                </p>
              </div>
              <div className="flex flex-col gap-[16px]">
                <h1 className="text-[#1d2939] font-semibold text-[20px] leading-[30px]">Project features</h1>
                <div className="grid grid-cols-2 gap-[16px]">
                  {
                    projectForm?.projectfeatures &&
                    projectForm?.projectfeatures.map((feature, index) => (
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
                    projectForm?.improvementareas &&
                    projectForm?.improvementareas.map((area, index) => (
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
                  <video className="w-full" src={projectForm?.technicaldetailsvideo} controls></video>
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
                {/* {
                  project?.linkeddocs &&
                  project.linkeddocs.map((doc, index) => (
                    <div className="w-[318px] h-[40px] px-[14px] border border-[#d0d5dd] justify-between rounded-lg flex items-center bg-white gap-2">
                      <div className="flex items-center w-full">
                        <h1 className="outline-none border-none w-full h-full text-[14px] font-normal leading-[20px] text-[#344054]">Eventplanner_documentation_here.pdf</h1>
                        <ArrowOutwardOutlinedIcon style={{ width: 24, height: 24 }} />
                      </div>
                    </div>
                  ))
                } */}
                {
                  projectForm?.linkeddocs ?
                  <div className="w-[318px] h-[40px] px-[14px] border border-[#d0d5dd] justify-between rounded-lg flex items-center bg-white gap-2">
                    <div className="flex items-center w-full">
                      <h1 className="outline-none border-none w-full h-full text-[14px] font-normal leading-[20px] text-[#344054] text-ellipsis overflow-hidden line-clamp-1">
                        <div dangerouslySetInnerHTML={{__html: projectForm?.linkeddocs}} />
                      </h1>
                      <ArrowOutwardOutlinedIcon style={{ width: 24, height: 24 }} />
                    </div>
                  </div>
                  :<div className="w-[318px] h-[40px] px-[14px] border border-[#d0d5dd] justify-between rounded-lg flex items-center bg-white gap-2">
                    <div className="flex items-center w-full">
                      <h1 className="outline-none border-none w-full h-full text-[14px] font-normal leading-[20px] text-[#344054] text-ellipsis overflow-hidden line-clamp-1">
                        No Documentation
                      </h1>
                    </div>
                  </div>
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

export default AddProjectPreview
