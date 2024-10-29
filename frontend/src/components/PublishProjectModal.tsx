import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
    handleShowModal: (show: boolean) => void
}

const PublishProjectModal: React.FC<Props> = ({handleShowModal}) => {
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
                    <form className='flex gap-[16px] flex-col'>
                        <div className='flex gap-[16px]'>
                            <button type='button' onClick={() => {handleShowModal(false)}} className='rounded-lg w-full border border-[#d0d5dd] bg-white py-[10px] px-[18px] font-semibold text-[16px] leading-[24px] text-[#344054] shadow'>Cancel</button>
                            <button className='rounded-lg bg-[#1570ef] text-white border border-[#d0d5dd] py-[10px] px-[18px] font-semibold text-[16px] leading-[24px] w-full shadow'>Yes publish</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PublishProjectModal
