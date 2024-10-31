import React from 'react'
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'

interface Props{
    page: string
    id?: string
}

const AddProjectHeader: React.FC<Props> = ({page, id}) => {

  return (
    <>
        <div className="w-full md:h-[150px] py-[16px] px-[80px] border border-[#d0d5dd] bg-gradient-to-r from-[#bed6f840] to-[#dbe6f040] flex flex-col gap-[16px]">
            <div className="flex justify-between">
                <div className="flex gap-[8px] flex-col">
                <h1 className="text-[24px] leading-[32px] font-bold text-[#344054]">
                    {
                        id?<>Edit Project</>:<>Add Project</>
                    }
                </h1>
                <div className="flex gap-[8px] items-center">
                    <h2 className="text-[12px] leading-[18px] font-medium text-[#667085]">Projects</h2>
                    <ChevronRightIcon style={{width: "16px", height: "16px", color: "#667085", position: "relative", top: "1px"}}/>
                    <h2 className="text-[12px] leading-[18px] font-medium text-[#1570ef]">
                        {
                            id?<>Edit Project</>:<>Add Project</>
                        }
                    </h2>
                </div>
                </div>
            </div>
            <div className="flex gap-[24px] md:justify-normal justify-between text-[#667085]">
                {
                        page == "technical-details" ?
                        <div className="flex gap-[8px] items-center">
                            <CheckCircleIcon style={{width: "16px", height: "16px"}}/>
                            <h3 className="text-[14px] leading-[20px] font-medium">Basic information</h3>
                        </div>
                        :<button className="rounded-lg border border-[#1570ef] bg-[#eff8ff] flex justify-center items-center gap-[8px] text-[#1570ef] px-[14px] py-[8px]">
                            <DescriptionOutlinedIcon style={{width: "20px", height: "20px"}}/>
                            <h3 className="text-[14px] leading-[20px] font-medium">Project Overview</h3>
                        </button>
                }

                {
                    page == "technical-details" ?
                    <button className="rounded-lg border border-[#1570ef] bg-[#eff8ff] flex justify-center items-center gap-[8px] text-[#1570ef] px-[14px] py-[8px]">
                        <PermIdentityOutlinedIcon style={{width: "20px", height: "20px"}}/>
                        <h3 className="text-[14px] leading-[20px] font-medium">Technical details and development</h3>
                    </button>
                    :<div className="flex justify-center text-[#667085] items-center gap-[8px]">
                        <PermIdentityOutlinedIcon style={{width: "20px", height: "20px"}}/>
                        <h3 className="text-[14px] leading-[20px] font-medium">Technical details and development</h3>
                    </div>
                }
                
                <div className="flex gap-[8px] items-center">
                    <RemoveRedEyeOutlinedIcon/>
                    <h2 className="text-[14px] leading-[20px] font-medium">Preview</h2>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddProjectHeader
