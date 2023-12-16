'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BiCommentDetail } from 'react-icons/bi'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import { twJoin } from 'tailwind-merge'
import { useAuth } from '~/store/Auth'

const ChannelSideBar = () => {
    const pathName = usePathname()
    const { account } = useAuth()

    return (
        <div className='flex flex-col items-center border-r-[#e5e5e5] border-r-[1px] w-[280px]'>
            <div className='flex flex-col gap-2 justify-center py-[30px]'>
                <img
                    src={account?.channel?.avatar}
                    className='rounded-full w-[130px] h-[130px]'
                />
                <div className='flex flex-col items-center'>
                    <span className='font-medium text-[14px]'>
                        Kênh của bạn
                    </span>
                    <span className='text-[12px] text-[#606060]'>
                        {account?.channel?.name}
                    </span>
                </div>
            </div>

            <div className='relative w-full pl-[4px]'>
                <Link
                    href={`/channel/${account?.channel?.id}/content`}
                    className={twJoin(
                        'flex items-center hover:bg-[rgba(0,0,0,0.03)] px-[25px] py-[8px] cursor-pointer',
                        pathName == `/channel/${account?.channel?.id}/content`
                            ? 'text-[#c00]'
                            : 'text-[#000]',
                    )}
                >
                    <div className='flex items-center gap-5'>
                        <MdOutlineVideoLibrary className='w-[30px] h-[30px] ' />
                        <span className=' text-[14px] font-semibold  opacity-70'>
                            Nội dung
                        </span>
                    </div>
                </Link>
                {/* <Link
                    href={`/channel/${account?.channel?.id}/comment`}
                    className={twJoin(
                        'flex items-center hover:bg-[rgba(0,0,0,0.03)] px-[25px] py-[8px] cursor-pointer',
                        pathName == `/channel/${account?.channel?.id}/comment`
                            ? 'text-[#c00]'
                            : 'text-[#000]',
                    )}
                >
                    <div className='flex items-center gap-5'>
                        <BiCommentDetail className='w-[30px] h-[30px] ' />
                        <span className=' text-[14px] font-semibold t opacity-70'>
                            Bình luận
                        </span>
                    </div>
                </Link> */}
            </div>
        </div>
    )
}

export default ChannelSideBar
