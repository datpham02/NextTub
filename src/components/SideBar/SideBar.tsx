'use client'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlaySquare, AiOutlineLike } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import { BsCollectionPlay } from 'react-icons/bs'
import { GiBackwardTime } from 'react-icons/gi'
import { HiOutlineMenu } from 'react-icons/hi'
import { MdHomeFilled } from 'react-icons/md'
import { twJoin } from 'tailwind-merge'
import { ScrollArea } from '~/components/ScrollArena'
import { Sheet, SheetContent } from '../Sheet'
import SideBarItem from './SideBarItem'
import { SideBarProps } from '~/utils/interface'
const SideBar = ({
    hideSideBar,
    setHideSideBar,
    handleHideSideBar,
}: SideBarProps) => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return (
        <>
            <ScrollArea
                className={twJoin(
                    'flex flex-col h-screen',
                    windowSize.width >= 1280
                        ? hideSideBar
                            ? 'w-[70px]'
                            : 'w-[300px]'
                        : 'w-[70px]',
                )}
            >
                {windowSize?.width >= 1280 ? (
                    <>
                        {hideSideBar ? (
                            <>
                                <div className='flex flex-col px-[4px]'>
                                    <SideBarItem
                                        icon={
                                            <MdHomeFilled className='w-[25px] h-[25px]' />
                                        }
                                        name='Trang chủ'
                                        active={true}
                                        type='collapse'
                                    />
                                    <SideBarItem
                                        icon={
                                            <BsCollectionPlay className='w-[25px] h-[25px]' />
                                        }
                                        name='Kênh đăng ký'
                                        active={false}
                                        type='collapse'
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='px-[10px]'>
                                    <div className='flex flex-col py-[8px] border-b-[1px] border-b-solid'>
                                        <SideBarItem
                                            icon={
                                                <MdHomeFilled className='w-[25px] h-[25px]' />
                                            }
                                            name='Trang chủ'
                                            active={true}
                                        />
                                        <SideBarItem
                                            icon={
                                                <BsCollectionPlay className='w-[25px] h-[25px]' />
                                            }
                                            name='Kênh đăng ký'
                                            active={false}
                                        />
                                    </div>
                                    <div className='flex flex-col py-[8px] border-b-[1px] border-b-solid'>
                                        <SideBarItem
                                            icon={
                                                <GiBackwardTime className='w-[25px] h-[25px]' />
                                            }
                                            name='Video đã xem'
                                            active={false}
                                        />
                                        <SideBarItem
                                            icon={
                                                <AiOutlinePlaySquare className='w-[25px] h-[25px]' />
                                            }
                                            name='Video của bạn'
                                            active={false}
                                        />
                                        <SideBarItem
                                            icon={
                                                <BiTimeFive className='w-[25px] h-[25px]' />
                                            }
                                            name='Xem sau'
                                            active={false}
                                        />
                                        <SideBarItem
                                            icon={
                                                <AiOutlineLike className='w-[25px] h-[25px]' />
                                            }
                                            name='Video đã thích'
                                            active={false}
                                        />
                                    </div>
                                    <div className='flex flex-col py-[8px] border-b-[1px] border-b-solid'>
                                        <div className='flex items-center justify-start py-[8px] px-[12px]'>
                                            <span className='text-[16px]'>
                                                Kênh đăng ký
                                            </span>
                                        </div>
                                        <div className='flex items-center justify-between py-[8px] px-[12px] rounded-lg cursor-pointer'>
                                            <div className='flex items-center gap-4'>
                                                <img
                                                    src='https://source.unsplash.com/random'
                                                    className='w-[25px] h-[25px] rounded-full'
                                                />
                                                <span className='text-[14px] font-[400]'>
                                                    Thư viện
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div className='flex flex-col px-[4px]'>
                        <SideBarItem
                            icon={
                                <MdHomeFilled className='w-[25px] h-[25px]' />
                            }
                            name='Trang chủ'
                            active={true}
                            type='collapse'
                        />
                        <SideBarItem
                            icon={
                                <BsCollectionPlay className='w-[25px] h-[25px]' />
                            }
                            name='Kênh đăng ký'
                            active={false}
                            type='collapse'
                        />
                    </div>
                )}
            </ScrollArea>
            {windowSize?.width < 1280 ? (
                <Sheet open={hideSideBar} onOpenChange={setHideSideBar}>
                    <SheetContent side={'left'} className='w-[300px]'>
                        <div className='flex flex-col px-[10px]'>
                            <div className='flex flex-col py-[8px] border-b-[1px] border-b-solid'>
                                <div className='flex items-center justify-start py-[8px] px-[12px] gap-4 cursor-pointer'>
                                    <HiOutlineMenu
                                        onClick={() => {
                                            handleHideSideBar()
                                        }}
                                        className='w-[25px] h-[25px]'
                                    />
                                    <span className='text-[40px] font-bold text-[#6A5BCD]'>
                                        NextTub
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-col py-[8px] border-b-[1px] border-b-solid'>
                                <SideBarItem
                                    icon={
                                        <MdHomeFilled className='w-[25px] h-[25px]' />
                                    }
                                    name='Trang chủ'
                                    active={true}
                                />
                                <SideBarItem
                                    icon={
                                        <BsCollectionPlay className='w-[25px] h-[25px]' />
                                    }
                                    name='Kênh đăng ký'
                                    active={false}
                                />
                            </div>
                            <div className='flex flex-col py-[8px] border-b-[1px] border-b-solid'>
                                <SideBarItem
                                    icon={
                                        <GiBackwardTime className='w-[25px] h-[25px]' />
                                    }
                                    name='Video đã xem'
                                    active={false}
                                />
                                <SideBarItem
                                    icon={
                                        <AiOutlinePlaySquare className='w-[25px] h-[25px]' />
                                    }
                                    name='Video của bạn'
                                    active={false}
                                />
                                <SideBarItem
                                    icon={
                                        <BiTimeFive className='w-[25px] h-[25px]' />
                                    }
                                    name='Xem sau'
                                    active={false}
                                />
                                <SideBarItem
                                    icon={
                                        <AiOutlineLike className='w-[25px] h-[25px]' />
                                    }
                                    name='Video đã thích'
                                    active={false}
                                />
                            </div>
                            <div className='flex flex-col py-[8px] border-b-[1px] border-b-solid'>
                                <div className='flex items-center justify-start py-[8px] px-[12px]'>
                                    <span className='text-[16px]'>
                                        Kênh đăng ký
                                    </span>
                                </div>
                                <div className='flex items-center justify-between py-[8px] px-[12px] rounded-lg cursor-pointer'>
                                    <div className='flex items-center gap-4'>
                                        <img
                                            src='https://source.unsplash.com/random'
                                            className='w-[25px] h-[25px] rounded-full'
                                        />
                                        <span className='text-[14px] font-[400]'>
                                            Thư viện
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            ) : null}
        </>
    )
}

export default SideBar