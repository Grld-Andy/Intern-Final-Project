import React from 'react'
import { Link } from 'react-router-dom'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const LoginMethod: React.FC = () => {

    const signInWithMicrosoft = () => {
        window.open('http://localhost:3000/auth/microsoft', '_self')
    }

  return (
    <div className='bg-white md:w-[440px] flex flex-col gap-[24px] py-[32px] px-[40px] shadow-lg'>
        <div className='flex items-center justify-center'>
            <img className='w-[123.64px] h-[35.39px]' src='/amalitech_logo.jpg'/>
        </div>
        <div className='flex flex-col gap-[8px] items-center'>
            <h1 className='text-[#101828] leading-[32px] text-[24px] font-[600]'>Sign in</h1>
            <h2 className='text-[#667085] leading-[24px] text-[16px] font-[400]'>Choose method to sign in</h2>
        </div>
        <div className="flex flex-col gap-[8px] items-center w-full">
            <button onClick={signInWithMicrosoft} className="border-[1px] border-[#d0d5dd] w-full hover:shadow px-[16px] py-[10px] rounded-[8px] bg-white flex gap-[12px] items-center justify-center">
                <div className='w-[24px] h-[24px] flex items-center justify-center'>
                    <div className='w-[16.5px] h-[16.5px] grid grid-cols-2 gap-[1.5px]'>
                        <div className='w-full h-full bg-[#f25325]'></div>
                        <div className='w-full h-full bg-[#80bc06]'></div>
                        <div className='w-full h-full bg-[#05a6f0]'></div>
                        <div className='w-full h-full bg-[#feba08]'></div>
                    </div>
                </div>
                <h1 className='text-[#344054] leading-[24px] font-[600] text-[16px]'>Sign in with Microsoft</h1>
            </button>
            <Link to="/auth/login" className='w-full'>
                <button className="border-[1px] border-[#d0d5dd] w-full hover:shadow px-[16px] py-[10px] rounded-[8px] bg-white flex gap-[12px] items-center justify-center">
                    <EmailOutlinedIcon/>
                    <h1 className='text-[#344054] leading-[24px] font-[600] text-[16px]'>Sign in with Email</h1>
                </button>
            </Link>
        </div>
    </div>
  )
}

export default LoginMethod
