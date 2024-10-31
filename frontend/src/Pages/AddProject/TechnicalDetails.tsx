import React, { useContext, useEffect, useState } from 'react'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import CancelIcon from '@mui/icons-material/Cancel'
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined'
import AddProjectHeader from '../../components/AddProject/AddProjectHeader'
import { ProjectFormContext } from '../../contexts/ProjectFormContext'
import { useNavigate, useParams } from 'react-router-dom'
import Project from '../../models/Project'
import projectStacks from '../../utils/projectStacks'
import MyEditor from '../../components/MyEditor'

const TechnicalDetails: React.FC = () => {
    const [video, setVideo] = useState<string>("")
    const [developmentStack, setDevelopmentStack] = useState<string>("")
    const [developmentStackList, setDevelopmentStackList] = useState<Array<string>>([])
    const [contributor, setContributor] = useState<string>("")
    // const [contributorsList, setContributorsList] = useState<Array<string>>([])
    const [linkedDocs, setLinkedDocs] = useState<string>("")
    const {projectForm, projectFormDispatch} = useContext(ProjectFormContext)
    const navigate = useNavigate()
    const {id} = useParams()
  
    useEffect(() => {
        if(!projectForm || !projectForm.technicaldetailsvideo || !projectForm.developmentstack || projectForm.developmentstack.length <= 0 || !projectForm.linkeddocs)
            return
        if(!id) return
        console.log("called again")
        setVideo(projectForm.technicaldetailsvideo)
        const devStacks: Array<string> = projectForm.developmentstack.map((stack: { stackName: string }) => stack.stackName)
        setDevelopmentStackList(devStacks)
        setLinkedDocs(projectForm.linkeddocs)
    }, [id, projectForm])

    useEffect(() => {
        scrollTo(0, 0)
        if(!projectForm?.title){
            if(!id)
                navigate('/add-project/project-overview')
            navigate(`/edit-project/project-overview/${id}`)
        }
      }, [id, navigate, projectForm])

      const removeDevelopmentStack = (clickedStack: string) => {
        setDevelopmentStackList(developmentStackList.filter((stack) => stack !== clickedStack))
    }
    
    const toggleDevelopmentStack = (clickedStack: string) => {
        if (isSelected(clickedStack)){
            removeDevelopmentStack(clickedStack)
        }else{
            setDevelopmentStackList(prev => [...prev, clickedStack])
        }
    }
    
    const addDevelopmentStack = () => {
        if(developmentStack){
            setDevelopmentStackList(prev => [...prev, developmentStack])
            setDevelopmentStack("")
        }
    }

    const isSelected = (stack: string) => {
        console.log(developmentStack)
        return developmentStack.includes(stack)
    }
    

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
        if(!id)
            navigate('/add-project/project-overview')
        navigate(`/edit-project/project-overview/${id}`)
    }
    const handleSubmit = () => {
        const developmentstacks = developmentStackList.map((stack) => {
            return {stackName: stack}
        })
        const data: Project = {
            technicaldetailsvideo: video,
            developmentstack: developmentstacks,
            linkeddocs: linkedDocs
        }
        projectFormDispatch({type: "UPDATE_PROJECT", payload: data})
        scrollTo(0, 0)
        if(!id)
            navigate('/add-project/preview')
        navigate(`/edit-project/preview/${id}`)
    }

  return (
    <div className="bg-[#F9FAFB]">
        <AddProjectHeader page="technical-details" id={id}/>
        {/* technical development */}
        <div className='w-full flex justify-center items-center py-[80px]'>
            <div className='w-[544px] flex gap-[24px] flex-col'>
                <div className='flex gap-[6px] flex-col'>
                    <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Development stack</h1>
                    <div className='bg-white border overflow-hidden border-[#d0d5dd] rounded-lg shadow'>
                        <div className='w-full flex border-b-[1px] border-[#d0d5dd]'>
                            <input onKeyUp={(e) => e.key === "Enter" && addDevelopmentStack()} type="text" placeholder="Enter development stack, eg MERN" value={developmentStack} onChange={(e) => setDevelopmentStack(e.target.value)} className='outline-none w-full h-[44px] rounded-lg px-[14px] py-[10px] text-[#667085] leading-[24px] font-normal text-[14px]'/>
                            <button onClick={addDevelopmentStack} type='button' className='py-[10px] px-[14px] bg-[#f2f4f7] text-[#101828] text-[16px] leading-[24px] font-semibold'>Add</button>
                        </div>
                        {
                            developmentStackList.length > 0 &&
                            <>
                                <div className='w-full flex flex-wrap py-[10px] px-[14px] gap-[10px]'>
                                    {
                                        projectStacks.map((stack, index) => (
                                            <div onClick={() => toggleDevelopmentStack(stack)} key={index} className={`${isSelected(stack) ? "bg-blue-400" : "bg-[#f2f4f7]"} text-[#374151] py-[4px] cursor-pointer pr-[10px] pl-[12px] rounded-[5px] flex gap-[4px] items-center`}>
                                                <h2 className='text-[12px] leading-[18px] font-normal'>{stack}</h2>
                                                <button onClick={() => removeDevelopmentStack(stack)} type='button' className='relative bottom-[1px]'>
                                                    <CancelIcon style={{width:"16px", height:"16px"}}/>
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className='flex gap-[6px] flex-col'>
                    <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Upload project video</h1>
                    {/* Keep background color if no video is uploaded */}
                    <div className='text-[#667085] bg-[#eaecf0] relative w-full h-[219px] flex gap-[40px] flex-col justify-center items-center rounded-lg'>
                        {
                            video
                            ?<video src={video} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            :<div className='flex flex-col items-center gap-[16px]'>
                                <ImageOutlinedIcon style={{width:"24px", height:"24px"}}/>
                                <h1 className='w-[288px]'>Drag and drop a video to upload or</h1>
                            </div>
                        }
                        {
                            video &&
                            <div className='absolute z-[1] w-full h-full bg-[#0004]'></div>
                        }
                        <label className='absolute z-[2] flex gap-[16px] bg-white rounded-lg text-[#344054] py-[8px] px-[14px] cursor-pointer'>
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
                            <input value={contributor} onChange={(e) => setContributor(e.target.value)} type="text" placeholder="Add contributors to this project" className='outline-none w-full h-[44px] rounded-lg px-[14px] py-[10px] text-[#667085] leading-[24px] font-normal text-[14px]'/>
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
                <MyEditor content={linkedDocs} setContent={setLinkedDocs} />
                <div className='flex gap-[12px] justify-end'>
                    <button type='button' onClick={stepBack} className='rounded-lg px-[14px] py-[10px] bg-white border border-[#d0d5dd] text-[#344054] text-[16px] leading-[24px] font-semibold'>
                        Discard
                    </button>
                    <button onClick={handleSubmit} className='rounded-lg px-[14px] py-[10px] bg-[#1570ef] border border-[#1570ef] text-white text-[16px] leading-[24px] font-semibold'>
                        Save & continue
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TechnicalDetails