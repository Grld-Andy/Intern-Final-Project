import React, { useContext, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import {ProjectFormContext} from '../contexts/ProjectFormContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import validateProjectForm from '../utils/validateProjectForm'
import convertUrlToFile from '../services/convertUrlToFile'

interface Props {
    handleShowModal: (show: boolean) => void
    id?: string
}

const PublishProjectModal: React.FC<Props> = ({handleShowModal, id}) => {
    const {projectForm} = useContext(ProjectFormContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {projectFormDispatch} = useContext(ProjectFormContext)
    const navigate = useNavigate()

    const publishProject = async () => {
        if (!projectForm) return
        if (!projectForm.coverphotourl) return
        if (!projectForm.technicaldetailsvideo) return
        
        setIsLoading(true)
        try {
            let formData = new FormData()
            const coverPhotoFile = await convertUrlToFile(projectForm.coverphotourl, 'cover_photo', 'png')
            formData.append('coverPhoto', coverPhotoFile)
            const videoFile = await convertUrlToFile(projectForm.technicaldetailsvideo, 'technical_details_video', 'mp4')
            formData.append('technicalDetailsVideo', videoFile)
            formData = validateProjectForm(projectForm, formData)
            console.log(projectForm)

            if(id){
                await axios.patch(`http://localhost:3000/api/v1/projects/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                })
            }else{
                await axios.post('http://localhost:3000/api/v1/projects', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                })
            }
            projectFormDispatch({type: "CLEAR_PROJECT", payload: null})
            if(id)
                navigate(`/projects/${id}`)
            else
                navigate('/projects')
        } catch (err) {
            console.error(err)
        } finally {
            handleShowModal(false)
            setIsLoading(false)
        }
    }
    
    return (
        <>
            {/* overlay */}
            <div className='w-full h-[100vh] overflow-hidden bg-[#34405470] backdrop-blur fixed bottom-[0] z-[20]'></div>

            {/* modal */}
            <div className={`w-full h-full overflow-hidden flex justify-center items-center bottom-0 absolute z-[21] ${isLoading && "pointer-events-none"}`}>
                <div className='bg-white h-min p-[24px] flex flex-col gap-6 rounded-lg w-[478px]'>
                    <div className='flex justify-between'>
                        <h1 className='text-[#344054] font-semibold text-[18px] leading-[28px]'>
                            {
                                id ? <>Update project</> : <>Publish project</>
                            }
                        </h1>
                        <button onClick={() => {handleShowModal(false)}}>
                            <CloseIcon style={{width:"24px", height: "24px"}}/>
                        </button>
                    </div>
                    {
                        isLoading
                        ?<div className='h-[46px] w-full flex justify-center items-center'>
                            <div className="flex items-center">
                                <div className="w-4 h-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <div className="ml-2">Loading...</div>
                            </div>
                        </div>
                        :<div className='flex gap-[16px] flex-col'>
                            <div className='flex gap-[16px]'>
                                <button onClick={() => {handleShowModal(false)}} className='rounded-lg w-full border border-[#d0d5dd] bg-white py-[10px] px-[18px] font-semibold text-[16px] leading-[24px] text-[#344054] hover:shadow'>Cancel</button>
                                <button onClick={publishProject} className='rounded-lg bg-[#1570ef] text-white border border-[#d0d5dd] py-[10px] px-[18px] font-semibold text-[16px] leading-[24px] w-full hover:shadow'>
                                    {
                                        id ? <>Yes update</> : <>Yes publish</>
                                    }
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default PublishProjectModal
