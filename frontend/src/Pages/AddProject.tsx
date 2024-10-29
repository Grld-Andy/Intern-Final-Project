import React from 'react'
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import CancelIcon from '@mui/icons-material/Cancel'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined'

const AddProject: React.FC = () => {
    return (
        <div>
            {/* project progress */}
            <div className="w-full h-[150px] py-[16px] px-[80px] border border-[#d0d5dd] bg-gradient-to-r from-[#bed6f840] to-[#dbe6f040] flex flex-col gap-[16px]">
                <div className="flex justify-between">
                    <div className="flex gap-[8px] flex-col">
                    <h1 className="text-[24px] leading-[32px] font-bold text-[#344054]">Add project</h1>
                    <div className="flex gap-[8px] items-center">
                        <h2 className="text-[12px] leading-[18px] font-medium text-[#667085]">Projects</h2>
                        <ChevronRightIcon style={{width: "16px", height: "16px", color: "#667085", position: "relative", top: "1px"}}/>
                        <h2 className="text-[12px] leading-[18px] font-medium text-[#1570ef]">Add Project</h2>
                    </div>
                    </div>
                </div>
                <div className="flex gap-[24px] md:justify-normal justify-between text-[#667085]">
                    <div className="flex gap-[8px] items-center">
                        <CheckCircleIcon style={{width: "16px", height: "16px"}}/>
                        <h3 className="text-[14px] leading-[20px] font-medium">Basic information</h3>
                    </div>
                    <button className="rounded-lg border border-[#1570ef] bg-[#eff8ff] flex justify-center items-center gap-[8px] text-[#1570ef] px-[14px] py-[8px]">
                        <PermIdentityOutlinedIcon style={{width: "20px", height: "20px"}}/>
                        <h3 className="text-[14px] leading-[20px] font-medium">Technical details and development</h3>
                    </button>
                    <div className="flex gap-[8px] items-center">
                        <RemoveRedEyeOutlinedIcon/>
                        <h2 className="text-[14px] leading-[20px] font-medium">Preview</h2>
                    </div>
                </div>
            </div>

            {/* technical development */}
            <div className='w-full flex justify-center items-center py-[80px]'>
                <div className='w-[544px] flex gap-[24px] flex-col'>
                    <div className='flex gap-[6px] flex-col'>
                        <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Development stack</h1>
                        <div className='bg-white border overflow-hidden border-[#d0d5dd] rounded-lg shadow'>
                            <div className='w-full flex border-b-[1px] border-[#d0d5dd]'>
                                <input type="text" placeholder="Enter development stack, eg MERN" className='outline-none w-full h-[44px] rounded-lg px-[14px] py-[10px] text-[#667085] leading-[24px] font-normal text-[14px]'/>
                                <button className='py-[10px] px-[14px] bg-[#f2f4f7] text-[#101828] text-[16px] leading-[24px] font-semibold'>Add</button>
                            </div>
                            <div className='w-full flex flex-wrap py-[10px] px-[14px] gap-[10px]'>
                                {
                                    Array.from({length:7}).map((_, index) => (
                                        <div key={index} className='bg-[#f2f4f7] text-[#374151] py-[4px] pr-[10px] pl-[12px] rounded-[5px] flex gap-[4px] items-center'>
                                            <h2 className='text-[12px] leading-[18px] font-normal'>MERNstack</h2>
                                            <button className='relative bottom-[1px]'>
                                                <CancelIcon style={{width:"16px", height:"16px"}}/>
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-[6px] flex-col'>
                        <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Technical details and decisions</h1>
                        <div className='text-[#667085] bg-[#eaecf0] w-full h-[219px] flex gap-[40px] flex-col justify-center items-center rounded-lg'>
                            <div className='flex flex-col items-center gap-[16px]'>
                                <ImageOutlinedIcon style={{width:"24px", height:"24px"}}/>
                                <h1 className='w-[288px]'>Drag and drop a video to upload or</h1>
                            </div>
                            <button className='flex gap-[16px] bg-white rounded-lg text-[#344054] py-[8px] px-[14px]'>
                                <ControlPointOutlinedIcon style={{width:"20px", height:"20px"}}/>
                                <input className='hidden' type="file" name="image" id="image" />
                                <h1 className='text-[14px] leading-[20px] font-semibold'>Add file</h1>
                            </button>
                        </div>
                    </div>
                    <div className='flex gap-[6px] flex-col'>
                        <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Development team/Contributors</h1>
                        <div className='bg-white border overflow-hidden border-[#d0d5dd] rounded-lg shadow'>
                            <div className='w-full flex border-b-[1px] border-[#d0d5dd]'>
                                <input type="text" placeholder="Add contributors to this project" className='outline-none w-full h-[44px] rounded-lg px-[14px] py-[10px] text-[#667085] leading-[24px] font-normal text-[14px]'/>
                                <button className='py-[10px] px-[14px] bg-[#f2f4f7] text-[#101828] text-[16px] leading-[24px] font-semibold'>Add</button>
                            </div>
                            <div className='w-full flex flex-wrap py-[10px] px-[14px] gap-[10px]'>
                                {
                                    Array.from({length:7}).map((_, index) => (
                                        <div key={index} className='bg-[#f2f4f7] text-[#374151] py-[4px] pr-[12px] pl-[6px] rounded-[5px] flex gap-[6px] items-center'>
                                            <div className='overflow-hidden rounded-[50%] w-[21.22px] h-[21.22px]'>
                                                <img src='/profile_image.jpg'/>
                                            </div>
                                            <h2 className='text-[12px] leading-[18px] font-normal'>MERNstack</h2>
                                            <button className='relative bottom-[1px]'>
                                                <CancelIcon style={{width:"16px", height:"16px"}}/>
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-[6px] flex-col'>
                        <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Linked Docs</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProject
