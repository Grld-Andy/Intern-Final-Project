import React, { FormEvent, useState } from 'react'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import CancelIcon from '@mui/icons-material/Cancel'
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined'
import AddProjectHeader from '../../components/AddProject/AddProjectHeader'

const ProjectOverview: React.FC = () => {
    const [image, setImage] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [projectFeature, setProjectFeature] = useState<string>("")
    // const [projectFeatureList, setProjectFeatureList] = useState<string>("")
    const [futureUpdate, setFutureUpdate] = useState<string>("")
    // const [futureUpdateList, setFutureUpdateList] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files)
            return
        const file = e.target.files[0]
        if(file){
            const imageUrl = URL.createObjectURL(file)
            setImage(imageUrl)
        }
    }


    const clearFields = () => {}
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        window.location.href = '/technical-details'
    }

  return (
    <div className="bg-[#F9FAFB]">
        <AddProjectHeader page="project-overview"/>
        {/* project overview */}
        <div className='w-full flex justify-center items-center py-[80px]'>
            <form onSubmit={handleSubmit} className='w-[544px] flex gap-[24px] flex-col'>
                <div className='flex gap-[6px] flex-col'>
                    <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Project title</h1>
                    <div className='w-full border bg-white border-[#d0d5dd] rounded-lg py-[10px] px-[14px]'>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter project title' type='text' className='outline-none text-[16px] font-normal leading-[24px] text-[#667085]' name='title'/>
                    </div>
                </div>
                <div className='flex gap-[6px] flex-col'>
                    <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Project description</h1>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name='description' placeholder='Enter project title' className='h-[128px] w-full border bg-white border-[#d0d5dd] rounded-lg py-[10px] px-[14px] outline-none text-[16px] font-normal leading-[24px] text-[#667085]'>
                    </textarea>
                </div>
                <div className='flex gap-[6px] flex-col'>
            <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Upload project cover photo/thumbnail</h1>
            <div className='relative text-[#667085] bg-[#eaecf0] w-full h-[219px] flex gap-[40px] flex-col justify-center items-center rounded-lg overflow-hidden' style={{ backgroundImage: image ? `url(${image})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {
                    !image ?
                    <div className='flex flex-col items-center gap-[16px]'>
                        <ImageOutlinedIcon style={{width:"24px", height:"24px"}}/>
                        <h1 className='w-[288px]'>Drag and drop an image to upload or</h1>
                    </div>:<></>
                }
                {
                    image &&
                    <div className='absolute z-[1] w-full h-full bg-[#0004]'></div>
                }
                <label className=' z-[2] flex gap-[16px] bg-white rounded-lg text-[#344054] py-[8px] px-[14px] cursor-pointer'>
                    <ControlPointOutlinedIcon style={{width:"20px", height:"20px"}}/>
                    <input className='hidden' type="file" name="image" id="image" accept="image/*" onChange={handleFileChange} />
                    <h1 className='text-[14px] leading-[20px] font-semibold'>Add file</h1>
                </label>
            </div>
        </div>
                <div className='flex gap-[6px] flex-col'>
                    <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Project features</h1>
                    <div className='bg-white border overflow-hidden border-[#d0d5dd] rounded-lg shadow'>
                        <div className='w-full flex border-b-[1px] border-[#d0d5dd]'>
                            <input value={projectFeature} onChange={(e) => setProjectFeature(e.target.value)} type="text" placeholder="Enter project features" className='outline-none w-full h-[44px] rounded-lg px-[14px] py-[10px] text-[#667085] leading-[24px] font-normal text-[14px]'/>
                            <button type='button' className='py-[10px] px-[14px] bg-[#f2f4f7] text-[#101828] text-[16px] leading-[24px] font-semibold'>Add</button>
                        </div>
                        <div className='w-full flex flex-wrap py-[10px] px-[14px] gap-[10px]'>
                            {
                                Array.from({length:7}).map((_, index) => (
                                    <div key={index} className='bg-[#f2f4f7] text-[#374151] py-[4px] pr-[10px] pl-[12px] rounded-[5px] flex gap-[4px] items-center'>
                                        <h2 className='text-[12px] leading-[18px] font-normal'>Customizable seating layouts</h2>
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
                    <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Areas of Improvement/Future Updates</h1>
                    <div className='bg-white border overflow-hidden border-[#d0d5dd] rounded-lg shadow'>
                        <div className='w-full flex border-b-[1px] border-[#d0d5dd]'>
                            <input value={futureUpdate} onChange={(e) => setFutureUpdate(e.target.value)} type="text" placeholder="Enter future updates" className='outline-none w-full h-[44px] rounded-lg px-[14px] py-[10px] text-[#667085] leading-[24px] font-normal text-[14px]'/>
                            <button type='button' className='py-[10px] px-[14px] bg-[#f2f4f7] text-[#101828] text-[16px] leading-[24px] font-semibold'>Add</button>
                        </div>
                        <div className='w-full flex flex-wrap py-[10px] px-[14px] gap-[10px]'>
                            {
                                Array.from({length:7}).map((_, index) => (
                                    <div key={index} className='bg-[#f2f4f7] text-[#374151] py-[4px] pr-[10px] pl-[12px] rounded-[5px] flex gap-[4px] items-center'>
                                        <h2 className='text-[12px] leading-[18px] font-normal'>AI-Powered Suggestions</h2>
                                        <button type='button' className='relative bottom-[1px]'>
                                            <CancelIcon style={{width:"16px", height:"16px"}}/>
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='flex gap-[12px] justify-end'>
                    <button type='button' onClick={clearFields} className='rounded-lg px-[14px] py-[10px] bg-white border border-[#d0d5dd] text-[#344054] text-[16px] leading-[24px] font-semibold'>
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

export default ProjectOverview
