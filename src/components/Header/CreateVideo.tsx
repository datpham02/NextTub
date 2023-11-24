import Link from 'next/link'
import Tippy from '@tippyjs/react/headless'
import TippyHover from '@tippyjs/react'

import React, { useState } from 'react'
import { AiOutlinePlaySquare, AiOutlineVideoCameraAdd } from 'react-icons/ai'

const CreateVideo = () => {
    const [visible, setVisible] = useState(false)
    return (
        <Tippy
            interactive
            visible={visible}
            placement='bottom-end'
            onClickOutside={() => {
                setVisible(false)
            }}
            render={(attrs) => (
                <div
                    {...attrs}
                    className='w-[180px] bg-[#fff]  rounded-md py-[15px] shadow-md'
                >
                    <div className='flex justify-between items-center px-[25px] hover:bg-[rgba(0,0,0,0.1)] py-[8px]'>
                        <div className='flex items-center gap-4 cursor-default'>
                            <AiOutlinePlaySquare className='w-[25px] h-[25px]' />
                            <Link href={'/studio'}>
                                <span className='font-[550] text-[14px]'>
                                    Tải video lên
                                </span>
                            </Link>
                        </div>
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
                            Tạo
                        </div>
                    }
                >
                    <span>
                        <AiOutlineVideoCameraAdd className='w-[38px] h-[38px] rounded-full hover:bg-[rgba(0,0,0,0.1)] p-[8px]' />
                    </span>
                </TippyHover>
            </div>
        </Tippy>
    )
}

export default CreateVideo
