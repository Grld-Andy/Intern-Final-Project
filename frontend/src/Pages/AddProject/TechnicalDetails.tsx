import React, { FormEvent, useState } from 'react'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import CancelIcon from '@mui/icons-material/Cancel'
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined'
import AddProjectHeader from '../../components/AddProject/AddProjectHeader'
import { useNavigate } from 'react-router-dom'

const TechnicalDetails: React.FC = () => {
    const [video, setVideo] = useState<string>("")
    const navigate = useNavigate()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files)
            return
        const file = e.target.files[0]
        if(file){
            const videoUrl = URL.createObjectURL(file)
            setVideo(videoUrl)
        }
    }

    const stepBack = () => {
        navigate('/project-overview')
    }
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        window.location.href = '/add-project-preview'
    }

  return (
    <div className="bg-[#F9FAFB]">
        <AddProjectHeader page="technical-details"/>
        {/* technical development */}
        <div className='w-full flex justify-center items-center py-[80px]'>
            <form onSubmit={handleSubmit} className='w-[544px] flex gap-[24px] flex-col'>
                <div className='flex gap-[6px] flex-col'>
                    <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Development stack</h1>
                    <div className='bg-white border overflow-hidden border-[#d0d5dd] rounded-lg shadow'>
                        <div className='w-full flex border-b-[1px] border-[#d0d5dd]'>
                            <input type="text" placeholder="Enter development stack, eg MERN" className='outline-none w-full h-[44px] rounded-lg px-[14px] py-[10px] text-[#667085] leading-[24px] font-normal text-[14px]'/>
                            <button type='button' className='py-[10px] px-[14px] bg-[#f2f4f7] text-[#101828] text-[16px] leading-[24px] font-semibold'>Add</button>
                        </div>
                        <div className='w-full flex flex-wrap py-[10px] px-[14px] gap-[10px]'>
                            {
                                Array.from({length:7}).map((_, index) => (
                                    <div key={index} className='bg-[#f2f4f7] text-[#374151] py-[4px] pr-[10px] pl-[12px] rounded-[5px] flex gap-[4px] items-center'>
                                        <h2 className='text-[12px] leading-[18px] font-normal'>MERNstack</h2>
                                        <button type='button' className='relative bottom-[1px]'>
                                            <CancelIcon style={{width:"16px", height:"16px"}}/>
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='flex gap-[6px] flex-col'>
                    <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Upload project video</h1>
                    {/* Keep background color if no video is uploaded */}
                    <div className='text-[#667085] bg-[#eaecf0] w-full h-[219px] flex gap-[40px] flex-col justify-center items-center rounded-lg' style={{background: video ? 'none' : '#eaecf0'}}>
                        {
                            video
                            ?<video src={video} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            :<div className='flex flex-col items-center gap-[16px]'>
                                <ImageOutlinedIcon style={{width:"24px", height:"24px"}}/>
                                <h1 className='w-[288px]'>Drag and drop a video to upload or</h1>
                            </div>
                        }
                        <label className='flex gap-[16px] bg-white rounded-lg text-[#344054] py-[8px] px-[14px] cursor-pointer'>
                            <ControlPointOutlinedIcon style={{width:"20px", height:"20px"}}/>
                            <input className='hidden' type="file" name="video" id="video" accept="video/*" onChange={handleFileChange}/>
                            <h1 className='text-[14px] leading-[20px] font-semibold'>Add file</h1>
                        </label>
                    </div>
                </div>
                <div className='flex gap-[6px] flex-col'>
                    <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Development team/Contributors</h1>
                    <div className='bg-white border overflow-hidden border-[#d0d5dd] rounded-lg shadow'>
                        <div className='w-full flex border-b-[1px] border-[#d0d5dd]'>
                            <input type="text" placeholder="Add contributors to this project" className='outline-none w-full h-[44px] rounded-lg px-[14px] py-[10px] text-[#667085] leading-[24px] font-normal text-[14px]'/>
                            <button type='button' className='py-[10px] px-[14px] bg-[#f2f4f7] text-[#101828] text-[16px] leading-[24px] font-semibold'>Add</button>
                        </div>
                        <div className='w-full flex flex-wrap py-[10px] px-[14px] gap-[10px]'>
                            {
                                Array.from({length:7}).map((_, index) => (
                                    <div key={index} className='bg-[#f2f4f7] text-[#374151] py-[4px] pr-[12px] pl-[6px] rounded-[5px] flex gap-[6px] items-center'>
                                        <div className='overflow-hidden rounded-[50%] w-[21.22px] h-[21.22px]'>
                                            <img src='/profile_image.jpg'/>
                                        </div>
                                        <h2 className='text-[12px] leading-[18px] font-normal'>MERNstack</h2>
                                        <button type='button' className='relative bottom-[1px]'>
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
                    <div className='bg-white border border-[#d0d5dd] rounded-lg shadow px-[14px] py-[10px] flex gap-[8px] flex-col'>
                        <div className='flex gap-[12px]'>
                            <button type='button' className='flex items-center gap-[6px] rounded-lg px-[14px] py-[10px] bg-white border border-[#d0d5dd]'>
                                <h1 className='text-[#101828] text-[16px] leading-[24px] font-medium'>Normal text</h1>
                                <KeyboardArrowDownOutlinedIcon style={{width:"20px", height:"20px",color:"#667085"}}/>
                            </button>
                        </div>
                        <textarea className='h-[94px] w-full outline-none font-normal text-[16px] leading-[24px] text-[#667085]' placeholder='Paste documentation links to the project (e.g., Confluence, GitHub repo, Figma files).'></textarea>
                    </div>
                </div>
                <div className='flex gap-[12px] justify-end'>
                    <button type='button' onSubmit={stepBack} className='rounded-lg px-[14px] py-[10px] bg-white border border-[#d0d5dd] text-[#344054] text-[16px] leading-[24px] font-semibold'>
                        Discard
                    </button>
                    <button type='submit' className='rounded-lg px-[14px] py-[10px] bg-[#1570ef] border border-[#1570ef] text-white text-[16px] leading-[24px] font-semibold'>
                        Save & continue
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default TechnicalDetails
