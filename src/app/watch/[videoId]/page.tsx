'use client'
import Tippy from '@tippyjs/react'
import React, { useRef, useState } from 'react'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { IoMdArrowDropdown } from 'react-icons/io'
import { MdSort } from 'react-icons/md'
import { RiShareForwardLine } from 'react-icons/ri'

import { RecommentVideoItem, VideoPlayer } from '~/components'

const page = ({ params }: { params: { videoId: string } }) => {
    const inputLineRef = useRef<HTMLDivElement>(null)

    const [sort, setSortVisible] = useState(false)

    const inputCommentOnFocus = () => {
        inputLineRef.current?.classList.add('w-full')
        inputLineRef.current?.classList.remove('w-0')
    }

    const inputCommentOnBlur = () => {
        inputLineRef.current?.classList.remove('w-full')
        inputLineRef.current?.classList.add('w-0')
    }

    return (
        <>
            <div className='w-full h-screen overflow-hidden overflow-y-scroll'>
                <div className='grid md:grid-cols-1 lg:grid-cols-3 lg:px-[85px] gap-4'>
                    <div className='lg:col-span-2 p-[24px] flex flex-col'>
                        <div className='flex flex-col gap-4'>
                            <VideoPlayer />

                            <span className='text-[20px] font-semibold'>
                                {'abc'}
                            </span>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-6'>
                                    <div className='flex gap-2'>
                                        <img
                                            src={
                                                'https://source.unsplash.com/random'
                                            }
                                            className='rounded-full w-[40px] h-[40px]'
                                        />
                                        <div className='flex flex-col'>
                                            <span className='font-semibold'>
                                                {'Pham Trong Dat'}
                                            </span>
                                            <span className='text-[12px] opacity-70'>
                                                {` 1 người đăng ký`}
                                            </span>
                                        </div>
                                    </div>
                                    <button className='rounded-[38px] h-[36px] leading-[38px] bg-[#0f0f0f] hover:bg-[#272727] flex items-center justify-center text-[14px] text-[#fff] px-[16px] line-height'>
                                        Đăng ký
                                    </button>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='flex items-center bg-[#f2f2f2] rounded-[38px]'>
                                        <div className='flex items-center gap-2 bg-[#f2f2f2] hover:bg-[rgba(0,0,0,0.1)] rounded-l-[38px] px-[12px] py-[6px] cursor-pointer'>
                                            <AiOutlineLike className='w-[25px] h-[25px]' />
                                            <span>999</span>
                                        </div>
                                        <span className='bg-[rgba(0,0,0,0.1)] w-[0.5px] h-[20px]'></span>
                                        <div className='flex items-center bg-[#f2f2f2] hover:bg-[rgba(0,0,0,0.1)] rounded-r-[38px] px-[12px] py-[6px] cursor-pointer'>
                                            <AiOutlineDislike className='w-[25px] h-[25px]' />
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-center gap-2 bg-[#f2f2f2] hover:bg-[rgba(0,0,0,0.1)] rounded-[38px] px-[13px] py-[6px] cursor-pointer'>
                                        <RiShareForwardLine className='w-[25px] h-[25px]' />
                                        <span>Chia sẻ</span>
                                    </div>
                                    <HiOutlineDotsHorizontal className='w-[38px] h-[38px] cursor-pointer bg-[#f2f2f2] rounded-full hover:bg-[rgba(0,0,0,0.1)] p-[10px] ' />
                                </div>
                            </div>
                            <div className='flex flex-col bg-[#f2f2f2] hover:bg-[rgba(0,0,0,0.1)] p-[10px] rounded-lg cursor-pointer'>
                                <div>
                                    <div className='flex gap-2'>
                                        <span className='flex gap-2'>
                                            <span className='font-semibold text-[14px]'>
                                                982
                                            </span>
                                            <span className='font-semibold text-[14px]'>
                                                lượt xem
                                            </span>
                                        </span>
                                        <span className='font-semibold text-[14px]'>
                                            14 thg 12, 2022
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center gap-6'>
                                    <span>19 bình luận</span>
                                    <div className='flex items-center gap-2'>
                                        <Tippy
                                            interactive
                                            placement='bottom-start'
                                            visible={sort}
                                            onClickOutside={() => {
                                                setSortVisible(false)
                                            }}
                                            render={(attrs) => (
                                                <div
                                                    {...attrs}
                                                    className='bg-[#fff]  rounded-md py-[8px] shadow-md'
                                                >
                                                    <div className='flex flex-col'>
                                                        <div className='flex flex-col px-[25px] hover:bg-[rgba(0,0,0,0.1)] py-[8px] cursor-pointer'>
                                                            <span className='text-[14px]'>
                                                                Bình luân hàng
                                                                đầu
                                                            </span>
                                                        </div>
                                                        <div className='flex flex-col px-[25px] hover:bg-[rgba(0,0,0,0.1)] py-[8px] cursor-pointer'>
                                                            <span className='text-[14px]'>
                                                                Mới nhất xếp
                                                                trước
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        >
                                            <span
                                                onClick={() => {
                                                    setSortVisible(!sort)
                                                }}
                                                className='flex gap-2 items-center cursor-pointer'
                                            >
                                                <MdSort className='w-[30px] h-[30px]' />
                                                <span className='font-semibold text-[14px]'>
                                                    Sắp xếp theo
                                                </span>
                                            </span>
                                        </Tippy>
                                    </div>
                                </div>
                                <div className='flex flex-col w-full gap-2'>
                                    <div className='flex items-center gap-4'>
                                        <img
                                            src={
                                                'https://source.unsplash.com/random'
                                            }
                                            className='rounded-full w-[40px] h-[40px]'
                                        />
                                        <div className='w-full relative flex flex-1 justify-center items-center'>
                                            <input
                                                type={'text'}
                                                onFocus={inputCommentOnFocus}
                                                onBlur={inputCommentOnBlur}
                                                placeholder='Viết bình luận...'
                                                className='border-b-[1px] border-b-solid border-b-[#909090] w-full outline-none text-[15px] py-[3px]'
                                            />
                                            <div
                                                ref={inputLineRef}
                                                className='absolute bg-[#0f0f0f] h-[2px] w-0 transition-all duration-200 ease-in-out top-[28px]'
                                            ></div>
                                        </div>
                                    </div>
                                    <div className='flex justify-end items-center gap-4'>
                                        <button className='text-[15px] font-semibold px-[15px] py-[8px] rounded-full hover:bg-[#F2F2F2]'>
                                            Hủy
                                        </button>
                                        <button className='text-[15px] font-semibold bg-[#F2F2F2] text-[#909090] px-[15px] py-[8px] rounded-full'>
                                            Bình luận
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div>
                                        <div className='flex items-start gap-4'>
                                            <img
                                                src='https://source.unsplash.com/random'
                                                className='rounded-full w-[40px] h-[40px]'
                                            />
                                            <div className='w-full flex flex-col flex-1 gap-1'>
                                                <div className='flex items-center gap-1'>
                                                    <span className='text-[13px] font-medium'>
                                                        Phạm Trọng Đạt
                                                    </span>
                                                    <span className='text-[12px] text-[#909090]'>
                                                        2 giờ trước
                                                    </span>
                                                </div>
                                                <p className='text-[13px]'>
                                                    Insane music! I love it!
                                                    Whenever someone likes this
                                                    comment, it reminds me of
                                                    how good this music is!
                                                </p>
                                                <div className='flex justify-start items-center gap-1'>
                                                    <div className='flex items-center'>
                                                        <button className='text-[15px] font-semibold p-[5px] rounded-full hover:bg-[#F2F2F2]'>
                                                            <AiOutlineLike className='w-[22px] h-[22px]' />
                                                        </button>
                                                        <span className='text-[12px] text-[#909090]'>
                                                            1
                                                        </span>
                                                    </div>
                                                    <button className='text-[15px] font-semibold p-[5px] rounded-full hover:bg-[#F2F2F2]'>
                                                        <AiOutlineDislike className='w-[22px] h-[22px]' />
                                                    </button>
                                                    <button className='text-[12px] font-semibold  px-[15px] py-[8px] rounded-full hover:bg-[#F2F2F2]'>
                                                        Phản hồi
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='inline-flex rounded-full gap-2 items-center text-[13px] ml-[60px] cursor-pointer hover:bg-[#def1ff] py-[6px] px-[8px]'>
                                                <IoMdArrowDropdown className='text-[blue] w-[20px] h-[20px]' />
                                                <span className='text-[blue] font-medium'>
                                                    1 phản hồi
                                                </span>
                                            </span>
                                            <div className='ml-[60px] flex items-start gap-4 mt-[10px]'>
                                                <img
                                                    src='https://source.unsplash.com/random'
                                                    className='rounded-full w-[25px] h-[25px]'
                                                />
                                                <div className='w-full flex flex-col flex-1 gap-1'>
                                                    <div className='flex items-center gap-1'>
                                                        <span className='text-[12px] font-medium'>
                                                            Phạm Trọng Đạt
                                                        </span>
                                                        <span className='text-[12px] text-[#909090]'>
                                                            2 giờ trước
                                                        </span>
                                                    </div>
                                                    <p className='text-[13px]'>
                                                        Insane music! I love it!
                                                        Whenever someone likes
                                                        this comment, it reminds
                                                        me of how good this
                                                        music is!
                                                    </p>
                                                    <div className='flex justify-start items-center gap-1'>
                                                        <div className='flex items-center'>
                                                            <button className='text-[15px] font-semibold p-[5px] rounded-full hover:bg-[#F2F2F2]'>
                                                                <AiOutlineLike className='w-[22px] h-[22px]' />
                                                            </button>
                                                            <span className='text-[12px] text-[#909090]'>
                                                                1
                                                            </span>
                                                        </div>
                                                        <button className='text-[15px] font-semibold p-[5px] rounded-full hover:bg-[#F2F2F2]'>
                                                            <AiOutlineDislike className='w-[22px] h-[22px]' />
                                                        </button>
                                                        <button className='text-[12px] font-semibold  px-[15px] py-[8px] rounded-full hover:bg-[#F2F2F2]'>
                                                            Phản hồi
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:col-span-1 pt-[24px] px-[24px] lg:px-0 lg:pr-[24px] flex flex-col gap-4'>
                        <RecommentVideoItem />
                        <RecommentVideoItem />
                        <RecommentVideoItem />
                        <RecommentVideoItem />
                        <RecommentVideoItem />
                        <RecommentVideoItem />
                        <RecommentVideoItem />
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
