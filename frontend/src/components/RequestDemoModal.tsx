import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

const RequestDemoModal: React.FC = () => {
  return (
    <div>
        <div className='w-full h-full overflow-hidden bg-[#34405470] backdrop-blur fixed'>
        </div>
        <div className='w-full h-screen absolute flex justify-center lg:items-center sm:pt-10'>
            <div className='bg-white h-min p-[24px] flex flex-col gap-6 rounded-lg w-[478px]'>
                <div className='flex justify-between'>
                    <h1 className='text-[#344054] font-semibold text-[18px] leading-[28px]'>Request demo</h1>
                    <button>
                        <CloseIcon style={{width:"24px", height: "24px"}}/>
                    </button>
                </div>
                <form className='flex gap-[16px] flex-col'>
                    <div className='flex flex-col gap-[6px]'>
                        <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Full name</h1>
                        <div className='border border-[#d0d5dd] rounded-lg py-[10px] px-[14px]'>
                            <input placeholder='Enter full name here' className='outline-none text-[16px] font-normal leading-[24px] text-[#667085]' type="text" name="fullname" id="fullname" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                        <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Email address</h1>
                        <div className='border border-[#d0d5dd] rounded-lg py-[10px] px-[14px]'>
                            <input placeholder='Enter email address here' className='outline-none text-[16px] font-normal leading-[24px] text-[#667085]' type="text" name="email" id="email" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                        <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Date</h1>
                        <div className='border border-[#d0d5dd] rounded-lg py-[10px] px-[14px]'>
                            <input placeholder='Select a date' className='outline-none w-full text-[16px] font-normal leading-[24px] text-[#667085]' type="date" name="date" id="date" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                        <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Time</h1>
                        <div className='border border-[#d0d5dd] rounded-lg py-[10px] px-[14px]'>
                            <input placeholder='Select a time' className='outline-none text-[16px] w-full font-normal leading-[24px] text-[#667085]' type="time" name="time" id="time" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-[6px]'>
                        <h1 className='text-[#344054] font-medium text-[14px] leading-[20px]'>Comments</h1>
                        <textarea placeholder='Add comments' className='border border-[#d0d5dd] rounded-lg py-[10px] px-[14px] outline-none text-[16px] font-normal leading-[24px] text-[#667085] w-full h-[128px]'>
                        </textarea>
                    </div>
                    <div className='flex gap-[16px]'>
                        <button className='rounded-lg w-full border border-[#d0d5dd] bg-white py-[10px] px-[18px] font-semibold text-[16px] leading-[24px] text-[#344054] shadow'>Cancel</button>
                        <button className='rounded-lg bg-[#1570ef] text-white border border-[#d0d5dd] py-[10px] px-[18px] font-semibold text-[16px] leading-[24px] w-full shadow'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default RequestDemoModal
