import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import DemoRequest from '../models/DemoRequest'

interface Props {
    handleShowModal: (show: boolean) => void
    id: string|undefined
}

const RequestDemoModal: React.FC<Props> = ({handleShowModal, id}) => {
    const [fullName, setFullName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [requestDate, setRequestDate] = useState<string>("")
    const [requestTime, setRequestTime] = useState<string>("")
    const [comments, setComments] = useState<string>("")
    const [formStatus, setFormStatus] = useState<string>("")

    useEffect(() => {
        scrollTo(0, 0)
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        setFormStatus("loading")
        e.preventDefault()
        const data: DemoRequest = {
            fullName: fullName,
            emailAddress: email,
            requestDate: requestDate,
            requestTime: requestTime,
            comments: comments,
            projectId: id
        }
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/demo-requests`, data)
        .then((res) => {
            console.log(res.data)
            setFormStatus("success")
            setTimeout(() => {
                handleShowModal(false)
            }, 5000)
        }).catch((err) => {
            console.log("failed")
            console.error(err)
        })
    }

  return (
    <div>
        {/* overlay */}
        <div className='w-full h-full overflow-hidden bg-[#34405470] backdrop-blur fixed bottom-[0] z-[20]'></div>

        {/* modal */}
        <div className='w-full h-min flex justify-center items-center absolute z-[21] bottom-[-100px]'>
            <div className='bg-white h-min p-[24px] flex flex-col gap-6 rounded-lg w-[478px]'>
                <div className='flex justify-between'>
                    <h1 className='text-[#344054] font-semibold text-[18px] leading-[28px]'>Request demo</h1>
                    <button onClick={() => {handleShowModal(false)}}>
                        <CloseIcon style={{width:"24px", height: "24px"}}/>
                    </button>
                </div>
                <form className='flex gap-[16px] flex-col'>
                    <div className='flex flex-col gap-[6px]'>
                        <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Full name</h1>
                        <div className='border border-[#d0d5dd] rounded-lg py-[10px] px-[14px]'>
                            <input onChange={(e) => {setFullName(e.target.value)}} required placeholder='Enter full name here' className='outline-none text-[16px] font-normal leading-[24px] text-[#667085]' type="text" name="fullname" id="fullname" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                        <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Email address</h1>
                        <div className='border border-[#d0d5dd] rounded-lg py-[10px] px-[14px]'>
                            <input onChange={(e) => {setEmail(e.target.value)}} required placeholder='Enter email address here' className='outline-none text-[16px] font-normal leading-[24px] text-[#667085]' type="email" name="email" id="email" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                        <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Date</h1>
                        <div className='border border-[#d0d5dd] rounded-lg py-[10px] px-[14px]'>
                            <input onChange={(e) => {setRequestDate(e.target.value)}} required placeholder='Select a date' className='outline-none w-full text-[16px] font-normal leading-[24px] text-[#667085]' min={new Date().toISOString().split('T')[0]} type="date" name="date" id="date" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                        <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Time</h1>
                        <div className='border border-[#d0d5dd] rounded-lg py-[10px] px-[14px]'>
                            <input onChange={(e) => {setRequestTime(e.target.value)}} required placeholder='Select a time' className='outline-none text-[16px] w-full font-normal leading-[24px] text-[#667085]' min={"09:00"} max={"18:00"} type="time" name="time" id="time" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                        <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Comments</h1>
                        <textarea onChange={(e) => {setComments(e.target.value)}} required placeholder='Add comments' className='border border-[#d0d5dd] rounded-lg py-[10px] px-[14px] outline-none text-[16px] font-normal leading-[24px] text-[#667085] w-full h-[128px]'>
                        </textarea>
                    </div>
                    {
                        formStatus === "loading" &&
                        <div className='cursor-default rounded-lg bg-[#1570ef] text-white border border-[#d0d5dd] py-[10px] px-[18px] font-semibold text-[16px] leading-[24px] w-full shadow'>
                            <div className="w-full flex justify-center items-center">
                                <div className="w-4 h-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <div className="ml-2 text-white">Loading...</div>
                            </div>
                        </div>
                    }
                    {
                        formStatus === "success" &&
                        <div className='cursor-default rounded-lg bg-[#1570ef] text-white border border-[#d0d5dd] py-[10px] px-[18px] font-semibold text-[16px] leading-[24px] w-full shadow'>
                            <div className="w-full flex justify-center items-center">
                                <div className="ml-2 text-white">Your request has been sent</div>
                            </div>
                        </div>
                    }
                    {
                        formStatus === "" &&
                        <div className='flex gap-[16px]'>
                            <button onClick={() => {handleShowModal(false)}} type='button' className='rounded-lg w-full border border-[#d0d5dd] bg-white py-[10px] px-[18px] font-semibold text-[16px] leading-[24px] text-[#344054] hover:shadow'>Cancel</button>
                            <button onClick={handleSubmit} className='rounded-lg bg-[#1570ef] text-white border border-[#d0d5dd] py-[10px] px-[18px] font-semibold text-[16px] leading-[24px] w-full hover:shadow'>Submit</button>
                        </div>
                    }
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default RequestDemoModal
