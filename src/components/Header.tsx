'use client'
import Link from 'next/link'
import Tippy from '@tippyjs/react/headless'
import React, { useState } from 'react'
import { deleteCookie } from 'cookies-next'
import { HiOutlineMenu } from 'react-icons/hi'
import {
    AiOutlineVideoCameraAdd,
    AiOutlinePlaySquare,
    AiOutlineSetting,
    AiOutlinePlayCircle,
} from 'react-icons/ai'
import { MdOutlineAccountCircle, MdOutlineSwitchAccount } from 'react-icons/md'
import { VscBell } from 'react-icons/vsc'
import { IoLogOutOutline } from 'react-icons/io5'
import { RiAccountBoxLine } from 'react-icons/ri'
import { SearchInput } from '.'
import { HeaderProps } from '~/utils/interface'

const Header = ({ handleHideSideBar }: HeaderProps) => {
    const [videoCameraVisible, setVideoCameraVisible] = useState(false)
    const [notifycationVisible, setNotifycationVisible] = useState(false)
    const [accountSetting, setAccountSetting] = useState(false)

    return (
        <>
            <div className='flex justify-between items-center px-[16px] min-h-[80px] z-[1] bg-[#fff]'>
                <div className='flex items-center gap-3'>
                    <HiOutlineMenu
                        onClick={() => {
                            handleHideSideBar()
                        }}
                        className='inline-block w-[45px] h-[45px] rounded-full hover:bg-[rgba(0,0,0,0.1)] p-[8px]'
                    />
                    <Link href={'/'}>
                        <span className='text-[40px] font-bold text-[#6A5BCD]'>
                            NextTub
                        </span>
                    </Link>
                </div>
                <div className=''>
                    <SearchInput />
                </div>
                <div className='flex justify-end gap-5 mr-[20px]'>
                    {false ? (
                        <>
                            <Tippy
                                interactive
                                visible={videoCameraVisible}
                                placement='bottom-end'
                                onClickOutside={() => {
                                    setVideoCameraVisible(false)
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
                                        setVideoCameraVisible(
                                            !videoCameraVisible,
                                        )
                                    }}
                                    className='relative group flex justify-center'
                                >
                                    <AiOutlineVideoCameraAdd className='w-[38px] h-[38px] rounded-full hover:bg-[rgba(0,0,0,0.1)] p-[8px]' />
                                    <span className='absolute hidden group-hover:block top-[50px] bg-[#616161] text-center w-full text-[#fff] rounded-[4px] p-[8px] text-[12px] leading-[12px] font-normal break-keep z-[999999]'>
                                        Tạo
                                    </span>
                                </div>
                            </Tippy>
                            <Tippy
                                interactive
                                placement='bottom-end'
                                onClickOutside={() => {
                                    setNotifycationVisible(false)
                                }}
                                visible={notifycationVisible}
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
                                <div className='relative flex justify-center'>
                                    <div
                                        onClick={() => {
                                            setNotifycationVisible(
                                                !notifycationVisible,
                                            )
                                        }}
                                        className='group'
                                    >
                                        <VscBell className='w-[38px] h-[38px] rounded-full hover:bg-[rgba(0,0,0,0.1)] p-[8px]' />
                                        <span className='absolute flex top-[0px] right-[5px]'>
                                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c00] opacity-75'></span>
                                            <span className='flex justify-center items-center text-[#fff] rounded-full text-[14px] h-[16px] w-[16px] bg-[#c00]'>
                                                5
                                            </span>
                                        </span>
                                        <span className='absolute hidden group-hover:block  top-[50px] bg-[#616161] text-center w-[80px] text-[#fff] rounded-[4px] p-[8px] text-[12px] leading-[12px] font-normal break-keep z-[999999]'>
                                            Thông báo
                                        </span>
                                    </div>
                                </div>
                            </Tippy>
                            <Tippy
                                interactive
                                placement='bottom-end'
                                onClickOutside={() => {
                                    setAccountSetting(false)
                                }}
                                visible={accountSetting}
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
                                                            Dtube Studio
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
                                            <div className='flex items-center hover:bg-[rgba(0,0,0,0.1)] px-[15px] py-[8px] cursor-pointer'>
                                                <div className='flex items-center gap-4'>
                                                    <MdOutlineSwitchAccount className='w-[25px] h-[25px]' />
                                                    <span className='font-[550] text-[14px]'>
                                                        Chuyển đổi tài khoản
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    deleteCookie(
                                                        process.env
                                                            .NEXT_PUBLIC_TOKEN as string,
                                                    )
                                                    setAccountSetting(false)
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
                                        setAccountSetting(!accountSetting)
                                    }}
                                    // src={userChannelInfo?.picture}
                                    className='rounded-full w-[35px] h-[35px]'
                                />
                            </Tippy>
                        </>
                    ) : (
                        <Link href={'/login'}>
                            <div className='items-center gap-2 border rounded-full p-[10px] cursor-pointer hover:bg-[#def1ff] flex'>
                                <MdOutlineAccountCircle className='text-[25px] text-[#065fd4]' />
                                <span className='text-[#065fd4]'>
                                    Đăng nhập
                                </span>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </>
    )
}

export default Header
