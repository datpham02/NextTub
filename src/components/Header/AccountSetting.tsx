import Tippy from '@tippyjs/react/headless'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import { IoLogOutOutline } from 'react-icons/io5'
import { MdOutlineSwitchAccount } from 'react-icons/md'
import { RiAccountBoxLine } from 'react-icons/ri'

const AccountSetting = () => {
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
                    className='w-[300px] flex flex-col bg-[#fff] rounded-md shadow-md'
                >
                    <div className='flex gap-3 items-center border-b-[1px] border-b-solid px-[15px] py-[10px]'>
                        {/* <div>
                                                <img
                                                    src={
                                                        userChannelInfo?.picture
                                                    }
                                                    className='rounded-full w-[35px] h-[35px]'
                                                />
                                            </div>
                                            <div className='flex flex-col'>
                                                <span>
                                                    {
                                                        userChannelInfo?.channelName
                                                    }
                                                </span>
                                                <span>
                                                    {userChannelInfo?.userName}
                                                </span>
                                            </div> */}
                    </div>
                    <div className='flex flex-col'>
                        <Link href={'/studio'}>
                            <div className='flex items-center hover:bg-[rgba(0,0,0,0.1)] px-[15px] py-[8px] cursor-pointer'>
                                <div className='flex items-center gap-4'>
                                    <AiOutlinePlayCircle className='w-[25px] h-[25px]' />
                                    <span className='font-[550] text-[14px]'>
                                        NextTub Studio
                                    </span>
                                </div>
                            </div>
                        </Link>
                        <Link href={'/channel'}>
                            <div className='flex items-center hover:bg-[rgba(0,0,0,0.1)] px-[15px] py-[8px] cursor-pointer'>
                                <div className='flex items-center gap-4'>
                                    <RiAccountBoxLine className='w-[25px] h-[25px]' />
                                    <span className='font-[550] text-[14px]'>
                                        Kênh của bạn
                                    </span>
                                </div>
                            </div>
                        </Link>

                        <div
                            onClick={() => {
                                setVisible(false)
                            }}
                            className='flex items-center hover:bg-[rgba(0,0,0,0.1)] px-[15px] py-[8px] cursor-pointer'
                        >
                            <div className='flex items-center gap-4'>
                                <IoLogOutOutline className='w-[25px] h-[25px]' />
                                <span className='font-[550] text-[14px]'>
                                    Đăng xuất
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        >
            <img
                onClick={() => {
                    setVisible(!visible)
                }}
                src={
                    'https://cdn.pixabay.com/photo/2022/12/01/04/42/man-7628305_1280.jpg'
                }
                className='rounded-full w-[35px] h-[35px]'
            />
        </Tippy>
    )
}

export default AccountSetting
