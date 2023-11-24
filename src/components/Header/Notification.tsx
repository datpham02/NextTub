import Tippy from '@tippyjs/react/headless'
import TippyHover from '@tippyjs/react'
import React, { useState } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { VscBell } from 'react-icons/vsc'

const Notification = () => {
    const [visible, setVisible] = useState(false)
    return (
        <Tippy
            interactive
            placement='bottom-end'
            onClickOutside={() => {
                setVisible(false)
            }}
            visible={visible}
            render={(attrs) => (
                <div
                    {...attrs}
                    className='w-[480px] bg-[#fff] rounded-md shadow-md'
                >
                    <div className='flex justify-between items-center border-b-[1px] border-b-solid py-[10px] px-[15px]'>
                        <span className='font-[450] text-[17px]'>
                            Thông báo
                        </span>
                        <AiOutlineSetting className=' w-[38px] h-[38px] cursor-pointer rounded-full hover:bg-[rgba(0,0,0,0.1)] p-[8px]' />
                    </div>
                    <div className='flex flex-col'>
                        {/* <NotifyCationItem /> */}
                    </div>
                </div>
            )}
        >
            <div
                onClick={() => {
                    setVisible(!visible)
                }}
            >
                <TippyHover
                    content={
                        <div className='bg-[#616161] text-[#fff] text-[13px] flex items-center justify-center p-[5px] rounded-sm'>
                            Thông báo
                        </div>
                    }
                >
                    <div className='relative'>
                        <VscBell className='w-[38px] h-[38px] rounded-full hover:bg-[rgba(0,0,0,0.1)] p-[8px]' />
                        <span className='absolute flex top-[0px] right-[5px]'>
                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c00] opacity-75'></span>
                            <span className='flex justify-center items-center text-[#fff] rounded-full text-[14px] h-[16px] w-[16px] bg-[#c00]'>
                                5
                            </span>
                        </span>
                    </div>
                </TippyHover>
            </div>
        </Tippy>
    )
}

export default Notification
