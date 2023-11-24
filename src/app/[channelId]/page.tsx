'use client'
import React, { useEffect, useRef } from 'react'
import { IoIosArrowForward } from 'react-icons/io'

const page = () => {
    const wrappedTabRef = useRef<HTMLDivElement>(null)
    const navigationTabDrawer = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (wrappedTabRef && wrappedTabRef.current) {
            const children: any = wrappedTabRef.current.children
            let childLeft = children[0].querySelector('span').offsetLeft
            let childWidth = children[0].querySelector('span').offsetWidth
            if (navigationTabDrawer && navigationTabDrawer.current) {
                navigationTabDrawer.current.style.left = childLeft + 'px'
                navigationTabDrawer.current.style.width = childWidth + 'px'
            }
            for (let i = 0; i < children.length; i++) {
                children[i].addEventListener('click', function () {
                    let childLeft = children[i].querySelector('span').offsetLeft
                    let childWidth =
                        children[i].querySelector('span').offsetWidth
                    for (let i = 0; i < children.length; i++) {
                        if (children[i].classList.contains('text-[#0f0f0f]')) {
                            children[i].classList.remove('text-[#0f0f0f]')
                            children[i].classList.add('text-[#606060]')
                        }
                    }

                    children[i].classList.add('text-[#0f0f0f]')
                    if (navigationTabDrawer && navigationTabDrawer.current) {
                        navigationTabDrawer.current.style.left =
                            childLeft + 'px'
                        navigationTabDrawer.current.style.width =
                            childWidth + 'px'
                    }
                })
            }
        }
    }, [])
    return (
        <div>
            <div className='w-full flex flex-col gap-4 mt-[15px]'>
                <div className='flex items-start justify-between w-full px-[100px]'>
                    <div className='flex items-start'>
                        <img
                            src='https://source.unsplash.com/random'
                            className='rounded-full w-[128px] h-[128px]'
                        />
                        <div className='flex flex-col gap-2 ml-[15px]'>
                            <span className='text-[25px] font-medium'>
                                Trọng Đạt
                            </span>
                            <div className='flex gap-2 text-[14px] opacity-70'>
                                <span className='font-medium'>
                                    @phamtrongdat1711
                                </span>
                                <span>1 người đăng ký</span>
                                <span>4 video</span>
                            </div>
                            <div className='flex gap-2 text-[14px] opacity-70'>
                                <span>Tìm hiểu thêm về kênh này</span>
                                <IoIosArrowForward />
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <button className='rounded-full text-[14px] px-[12px] py-[10px] font-medium flex items-center justify-center bg-[#f2f2f2] hover:bg-[#909090]'>
                            Tùy chỉnh kênh
                        </button>
                        <button className='rounded-full text-[14px] px-[12px] py-[10px] font-medium flex items-center justify-center bg-[#f2f2f2] hover:bg-[#909090]'>
                            Quản lý video
                        </button>
                    </div>
                </div>
                <div
                    ref={wrappedTabRef}
                    className='relative flex h-[48px] border-b-[1px] px-[100px]'
                >
                    <div className='cursor-pointer h-full pl-[8px] pr-[32px]  flex  items-center text-[##0f0f0f]'>
                        <span className='uppercase'>Trang chủ</span>
                    </div>
                    <div className='cursor-pointer h-full pl-[8px] pr-[32px]  flex text-[#606060] items-center '>
                        <span className='uppercase'>Video</span>
                    </div>
                    <div className='cursor-pointer h-full pl-[8px] pr-[32px]  flex text-[#606060] items-center '>
                        <span className='uppercase'>Danh sách phát</span>
                    </div>
                    <div className='cursor-pointer h-full pl-[8px] pr-[32px]  flex text-[#606060] items-center '>
                        <span className='uppercase'>Giới thiệu</span>
                    </div>
                    <span
                        ref={navigationTabDrawer}
                        className='absolute bg-[#0f0f0f] bottom-0 h-[2px] transition-all duration-200 ease-in-out'
                    ></span>
                </div>
            </div>
        </div>
    )
}

export default page
