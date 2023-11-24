'use client'
import Tippy from '@tippyjs/react/headless'
import Link from 'next/link'
import React, { useState } from 'react'
import { BiTime } from 'react-icons/bi'
import { BsDot } from 'react-icons/bs'
import { IoIosShareAlt } from 'react-icons/io'
import { MdPlaylistAdd } from 'react-icons/md'
import { RiPlayList2Fill } from 'react-icons/ri'
import { RxDotsVertical } from 'react-icons/rx'
import { twJoin } from 'tailwind-merge'

const RecommentVideoItem = () => {
    const [dotContentVisible, setDotContentVisible] = useState(false)
    return (
        <div className='relative flex w-full gap-2'>
            <Link href={'/watch/2'}>
                <div className='flex gap-2 w-full'>
                    <div className='relative object-cover w-[170px] h-[95px]'>
                        <img
                            src={
                                'https://cdn.pixabay.com/photo/2022/12/01/04/42/man-7628305_1280.jpg'
                            }
                            className='w-full h-full rounded-lg'
                        />
                        <span className='absolute  bottom-[-1px] right-[5px] text-[#fff] text-[13px]'>
                            1:00:42
                        </span>
                    </div>
                    <div className='w-full flex flex-1 flex-col'>
                        <p className='text-[16px] font-semibold line-clamp-2 pr-[6px]'>
                            {
                                '2-Hour Study with Me in London / Big Ben Sunset 🌅 / Pomodoro 50-10 / Relaxing Lo-Fi / Day 160'
                            }
                        </p>
                        <span className='text-[12px] opacity-60'>
                            {'Pham Trong Dat'}
                        </span>
                        <div className='flex items-center'>
                            <span className='text-[12px] opacity-60'>
                                17 N lượt xem
                            </span>
                            <BsDot className='opacity-60' />
                            <span className='text-[12px] opacity-60'>
                                {`1 ngày trước`}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
            <Tippy
                interactive
                placement='bottom-start'
                visible={dotContentVisible}
                onClickOutside={() => {
                    setDotContentVisible(false)
                }}
                render={(attrs) => (
                    <div
                        {...attrs}
                        className='w-[267px] bg-[#fff]  rounded-md py-[8px] shadow-md'
                    >
                        <div className='flex flex-col'>
                            <div className='flex flex-col px-[25px] hover:bg-[rgba(0,0,0,0.1)] py-[8px]'>
                                <div className='flex items-center gap-4 cursor-default'>
                                    <RiPlayList2Fill className='w-[20px] h-[20px]' />
                                    <span className='text-[14px]'>
                                        Thêm vào danh sách chờ
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-col px-[25px] hover:bg-[rgba(0,0,0,0.1)] py-[8px]'>
                                <div className='flex items-center gap-4 cursor-default'>
                                    <BiTime className='w-[20px] h-[20px]' />
                                    <span className='text-[14px]'>
                                        Lưu vào danh sách xem sau
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-col px-[25px] hover:bg-[rgba(0,0,0,0.1)] py-[8px]'>
                                <div className='flex items-center gap-4 cursor-default'>
                                    <MdPlaylistAdd className='w-[20px] h-[20px]' />
                                    <span className='text-[14px]'>
                                        Lưu vào danh sách phát
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-col px-[25px] hover:bg-[rgba(0,0,0,0.1)] py-[8px]'>
                                <div className='flex items-center gap-4 cursor-default'>
                                    <IoIosShareAlt className='w-[20px] h-[20px]' />
                                    <span className='text-[14px]'>Chia sẻ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            >
                <div
                    className={twJoin(
                        'absolute block  top-[3px] right-[-10px]',
                    )}
                >
                    <RxDotsVertical
                        onClick={() => {
                            setDotContentVisible(!dotContentVisible)
                        }}
                        className='w-[22px] h-[22px] cursor-pointer inline-block'
                    />
                </div>
            </Tippy>
        </div>
    )
}

export default RecommentVideoItem
