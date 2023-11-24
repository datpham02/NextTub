import React from 'react'
import { TfiClose } from 'react-icons/tfi'
const UpLoadVideoFormHeader = () => {
    return (
        <div className='bg-[#fff] w-[960px] flex items-center justify-between p-[15px] rounded-t-md border-b-[1px]'>
            <span className='font-medium text-[18px]'>{'Tải video lên'}</span>
            <TfiClose className='w-[20px] h-[20px] text-[rgba(144,144,144,1)] cursor-pointer' />
        </div>
    )
}

export default UpLoadVideoFormHeader
