'use client'
import React, { useEffect, useState } from 'react'
import { RiPlayList2Fill } from 'react-icons/ri'
import { BsDot } from 'react-icons/bs'
import { RxDotsVertical } from 'react-icons/rx'
import { BiTime } from 'react-icons/bi'
import { IoIosShareAlt } from 'react-icons/io'
import { MdPlaylistAdd } from 'react-icons/md'
import Tippy from '@tippyjs/react/headless'
import Link from 'next/link'
import { formatNumber, formatUpLoadTime } from '~/utils/feature'
import { VideoPreview as ViewPreviewType } from '~/utils/Interface/Video'
import { useMutation } from '@tanstack/react-query'
import { Account } from '~/services'
import { useAuth } from '~/store/Auth'
import toast from 'react-hot-toast'
const VideoPreview = ({ video }: { video: ViewPreviewType }) => {
    const { account } = useAuth()
    const [dotContentVisible, setDotContentVisible] = useState(false)

    const { mutate } = useMutation({
        mutationKey: ['watch_late', video?.id],
        mutationFn: async ({
            accountId,
            videoId,
        }: {
            accountId: number
            videoId: number
        }) => {
            const data = await Account.watchLate(accountId, videoId)
            return data.data
        },
        onSuccess: () => {
            toast.success('Lưu thành công')
        },
    })
    const handleAddWatchKate = () => {
        mutate({
            accountId: account?.id,
            videoId: video?.id,
        })
    }
    return (
        <div className='relative w-full'>
            <Link href={`/watch/${video?.id}`}>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='relative group object-cover w-full h-[250px]'>
                        <img
                            src={video?.poster}
                            className='w-full h-full rounded-lg'
                        />
                        <span className='absolute group-hover:hidden bottom-[-1px] right-[5px] text-[#fff] text-[13px]'>
                            {video?.duration}
                        </span>
                        <span className='absolute hidden group-hover:block bottom-[-1px] right-[5px] text-[#fff] text-[13px]'>
                            Nhấn để chuyển hướng
                        </span>
                    </div>
                    <div className='flex justify-between items-start'>
                        <div className='flex items-start gap-2 cursor-pointer'>
                            <img
                                src={video?.channel?.avatar}
                                className='w-[38px] h-[38px] mt-[4px] rounded-full'
                            />
                            <div className='flex-1 flex flex-col'>
                                <p className='text-[18px] font-semibold line-clamp-2 pr-[6px]'>
                                    {video?.title}
                                </p>
                                <div className='flex items-center'>
                                    <span className='text-[12px] opacity-60'>
                                        {video?.channel?.name}
                                    </span>
                                    <BsDot className='opacity-60' />
                                    <div className='flex items-center'>
                                        <span className='text-[12px] opacity-60'>
                                            {`${formatNumber(
                                                video?.view,
                                            )} lượt xem`}
                                        </span>
                                        <BsDot className='opacity-60' />
                                        <span className='text-[12px] opacity-60'>
                                            {formatUpLoadTime(video?.createAt)
                                                ? `${formatUpLoadTime(
                                                      video?.createAt,
                                                  )} trước`
                                                : null}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

            <Tippy
                interactive
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
                            <div
                                onClick={() => {
                                    handleAddWatchKate()
                                }}
                                className='flex flex-col px-[25px] hover:bg-[rgba(0,0,0,0.1)] py-[8px]'
                            >
                                <div className='flex items-center gap-4 cursor-default'>
                                    <BiTime className='w-[20px] h-[20px]' />
                                    <span className='text-[14px]'>
                                        Lưu vào danh sách xem sau
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            >
                <div className='absolute bottom-[18px] right-[-3px] block'>
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

export default VideoPreview
