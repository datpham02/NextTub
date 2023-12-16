import React from 'react'
import { AiOutlinePlaySquare, AiOutlineLike } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import { BsCollectionPlay } from 'react-icons/bs'
import { GiBackwardTime } from 'react-icons/gi'
import { HiOutlineMenu } from 'react-icons/hi'
import { MdHomeFilled } from 'react-icons/md'
import { WatchSideBarProps } from '~/utils/interface'
import { Sheet, SheetContent } from '../Sheet'
import SideBarItem from './SideBarItem'
import { usePathname } from 'next/navigation'
import { useAuth } from '~/store/Auth'
import Link from 'next/link'

const WatchSideBar = ({
    hideSideBar,
    setHideSideBar,
    handleHideSideBar,
}: WatchSideBarProps) => {
    const pathname = usePathname()
    const { account } = useAuth()
    return (
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
                        <Link href={'/'}>
                            <SideBarItem
                                icon={
                                    <MdHomeFilled className='w-[25px] h-[25px]' />
                                }
                                name='Trang chủ'
                                active={pathname == '/'}
                            />
                        </Link>
                        <Link href={'/subcribed_channel'}>
                            <SideBarItem
                                icon={
                                    <BsCollectionPlay className='w-[25px] h-[25px]' />
                                }
                                name='Kênh đăng ký'
                                active={pathname == '/subcribed_channel'}
                            />
                        </Link>
                    </div>
                    <div className='flex flex-col py-[8px] border-b-[1px] border-b-solid'>
                        <Link href={`/history/${account?.id}`}>
                            <SideBarItem
                                icon={
                                    <GiBackwardTime className='w-[25px] h-[25px]' />
                                }
                                name='Video đã xem'
                                active={pathname.includes('/history')}
                            />
                        </Link>
                        <Link href={`/channel/${account?.channel?.id}/content`}>
                            <SideBarItem
                                icon={
                                    <AiOutlinePlaySquare className='w-[25px] h-[25px]' />
                                }
                                name='Video của bạn'
                                active={
                                    pathname ==
                                    `/channel/${account?.channel?.id}/content`
                                }
                            />
                        </Link>
                        <Link href={`/watch_late/${account?.id}`}>
                            <SideBarItem
                                icon={
                                    <BiTimeFive className='w-[25px] h-[25px]' />
                                }
                                name='Xem sau'
                                active={pathname.includes('/watch_late')}
                            />
                        </Link>
                        <Link href={`/like/${account?.id}`}>
                            <SideBarItem
                                icon={
                                    <AiOutlineLike className='w-[25px] h-[25px]' />
                                }
                                name='Video đã thích'
                                active={pathname.includes('/like')}
                            />
                        </Link>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default WatchSideBar
