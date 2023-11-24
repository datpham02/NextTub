'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BiCommentDetail } from 'react-icons/bi'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import { twJoin } from 'tailwind-merge'

const ChannelSideBar = () => {
    const pathName = usePathname()

    return (
        <div className='flex flex-col items-center border-r-[#e5e5e5] border-r-[1px] w-[280px]'>
            <div className='flex flex-col gap-2 justify-center py-[30px]'>
                <img
                    src={
                        'https://cdn.pixabay.com/photo/2022/12/01/04/42/man-7628305_1280.jpg'
                    }
                    className='rounded-full w-[130px] h-[130px]'
                />
                <div className='flex flex-col items-center'>
                    <span className='font-medium text-[14px]'>
                        Kênh của bạn
                    </span>
                    <span className='text-[12px] text-[#606060]'>
                        Trọng Đạt
                    </span>
                </div>
            </div>

            <div className='relative w-full pl-[4px]'>
                <Link
                    href='/channel/content'
                    className={twJoin(
                        'flex items-center hover:bg-[rgba(0,0,0,0.03)] px-[25px] py-[8px] cursor-pointer',
                        pathName == '/channel/content'
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
                <Link
                    href='/channel/comment'
                    className={twJoin(
                        'flex items-center hover:bg-[rgba(0,0,0,0.03)] px-[25px] py-[8px] cursor-pointer',
                        pathName == '/channel/comment'
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
                </Link>
            </div>
        </div>
    )
}

export default ChannelSideBar
