import React, { useContext } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import {ProjectFormContext} from '../contexts/ProjectFormContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import validateProjectForm from '../utils/validateProjectForm'
import convertUrlToFile from '../services/convertUrlToFile'

interface Props {
    handleShowModal: (show: boolean) => void
}

const PublishProjectModal: React.FC<Props> = ({handleShowModal}) => {
    const {projectForm} = useContext(ProjectFormContext)
    const {projectFormDispatch} = useContext(ProjectFormContext)
    const navigate = useNavigate()

    const publishProject = async () => {
        console.log("loading")
        if (!projectForm) return
        if (!projectForm.coverphotourl) return
        if (!projectForm.technicaldetailsvideo) return
    
        try {
            let formData = new FormData()
            const coverPhotoFile = await convertUrlToFile(projectForm.coverphotourl, 'cover_photo', 'png')
            formData.append('coverPhoto', coverPhotoFile)
            const videoFile = await convertUrlToFile(projectForm.technicaldetailsvideo, 'technical_details_video', 'mp4')
            formData.append('technicalDetailsVideo', videoFile)
            formData = validateProjectForm(projectForm, formData)
            await axios.post('https://intern-final-project.onrender.com/api/v1/projects', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log("Project published")
            navigate('/projects')
            projectFormDispatch({type: "CLEAR_PROJECT", payload: null})
        } catch (err) {
            console.error(err)
        } finally {
            handleShowModal(false)
        }
    }
    
    return (
        <>
            {/* overlay */}
            <div className='w-full h-full overflow-hidden bg-[#34405470] backdrop-blur fixed z-[2]'></div>

            {/* modal */}
            <div className='w-full h-full overflow-hidden flex justify-center items-center absolute z-[3]'>
                <div className='bg-white h-min p-[24px] flex flex-col gap-6 rounded-lg w-[478px]'>
                    <div className='flex justify-between'>
                        <h1 className='text-[#344054] font-semibold text-[18px] leading-[28px]'>Publish project</h1>
                        <button onClick={() => {handleShowModal(false)}}>
                            <CloseIcon style={{width:"24px", height: "24px"}}/>
                        </button>
                    </div>
                    <div className='flex gap-[16px] flex-col'>
                        <div className='flex gap-[16px]'>
                            <button onClick={() => {handleShowModal(false)}} className='rounded-lg w-full border border-[#d0d5dd] bg-white py-[10px] px-[18px] font-semibold text-[16px] leading-[24px] text-[#344054] shadow'>Cancel</button>
                            <button onClick={publishProject} className='rounded-lg bg-[#1570ef] text-white border border-[#d0d5dd] py-[10px] px-[18px] font-semibold text-[16px] leading-[24px] w-full shadow'>Yes publish</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PublishProjectModal
