import React, { useState } from 'react'
import { RiPlayList2Fill } from 'react-icons/ri'
import { BsDot } from 'react-icons/bs'
import { RxDotsVertical } from 'react-icons/rx'
import { BiTime } from 'react-icons/bi'
import { IoIosShareAlt } from 'react-icons/io'
import { MdPlaylistAdd } from 'react-icons/md'

import Tippy from '@tippyjs/react/headless'
import Link from 'next/link'
import { HandleVideoUpLoadTime } from '~/utils/feature'
import { twJoin } from 'tailwind-merge'
const DefaultVideo = () => {
    const [isHovered, setIsHovered] = useState(false)
    const [dotContentVisible, setDotContentVisible] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        if (!dotContentVisible) setIsHovered(false)
        return
    }
    return (
        <div className='relative w-[430px]'>
            <Link href={`/watch/1`}>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='relative group object-cover w-full h-[250px]'>
                        <img
                            src={
                                'https://cdn.pixabay.com/photo/2022/12/01/04/42/man-7628305_1280.jpg'
                            }
                            className='w-full h-full rounded-lg'
                        />
                        <span className='absolute group-hover:hidden bottom-[-1px] right-[5px] text-[#fff] text-[13px]'>
                            1:00:42
                        </span>
                        <span className='absolute hidden group-hover:block bottom-[-1px] right-[5px] text-[#fff] text-[13px]'>
                            Tiếp tục di chuột để phát
                        </span>
                    </div>
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className='flex justify-between items-start'
                    >
                        <div className='flex items-start gap-2 cursor-default'>
                            <img
                                src='https://source.unsplash.com/random'
                                className='w-[38px] h-[38px] mt-[4px] rounded-full'
                            />
                            <div className='flex-1 flex flex-col'>
                                <p className='text-[18px] font-semibold line-clamp-2 pr-[6px]'>
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
                                        {HandleVideoUpLoadTime('1667655600')
                                            ? `${HandleVideoUpLoadTime(
                                                  '1667655600',
                                              )} ngày trước`
                                            : null}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

            <Tippy
                placement='bottom-start'
                onClickOutside={() => {
                    setDotContentVisible(false)
                }}
                visible={dotContentVisible}
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
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={twJoin(
                        'absolute bottom-[55px] right-[-3px]',
                        isHovered ? 'block' : 'hidden',
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

export default DefaultVideo
