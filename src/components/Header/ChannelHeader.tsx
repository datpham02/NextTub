'use client'
import Tippy from '@tippyjs/react/headless'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoLogOutOutline } from 'react-icons/io5'
import { RiAccountBoxLine } from 'react-icons/ri'
const ChannelHeader = () => {
    const [accountSettingVisible, setAccountSettingVisible] =
        useState<boolean>(false)
    return (
        <div className=' min-h-[80px] flex justify-between items-center shadow-md px-[50px] py-[12px] '>
            <div className='flex items-center gap-3'>
                <Link href={'/'}>
                    <span className='text-[40px] font-bold text-[#6A5BCD]'>
                        NextTub
                    </span>
                </Link>
            </div>

            <div className='flex justify-end items-center'>
                <Tippy
                    interactive
                    placement='bottom-end'
                    onClickOutside={() => {
                        setAccountSettingVisible(false)
                    }}
                    visible={accountSettingVisible}
                    render={(attrs) => (
                        <div
                            {...attrs}
                            className='w-[300px] flex flex-col bg-[#fff] rounded-md shadow-md'
                        >
                            <div className='flex gap-3 items-center border-b-[1px] border-b-solid px-[15px] py-[10px]'>
                                <div>
                                    <img
                                        src={
                                            'https://cdn.pixabay.com/photo/2022/12/01/04/42/man-7628305_1280.jpg'
                                        }
                                        className='rounded-full w-[35px] h-[35px]'
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <span>Trọng Đạt</span>
                                    <span>@phamtrongdat</span>
                                </div>
                            </div>
                            <div className='flex flex-col'>
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
                                        setAccountSettingVisible(false)
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
                            setAccountSettingVisible(!accountSettingVisible)
                        }}
                        src={
                            'https://cdn.pixabay.com/photo/2022/12/01/04/42/man-7628305_1280.jpg'
                        }
                        className='rounded-full w-[40px] h-[40px]'
                    />
                </Tippy>
            </div>
        </div>
    )
}

export default ChannelHeader
