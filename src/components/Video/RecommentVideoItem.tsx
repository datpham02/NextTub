'use client'
import { useMutation } from '@tanstack/react-query'
import Tippy from '@tippyjs/react/headless'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BiTime } from 'react-icons/bi'
import { BsDot } from 'react-icons/bs'
import { IoIosShareAlt } from 'react-icons/io'
import { MdPlaylistAdd } from 'react-icons/md'
import { RiPlayList2Fill } from 'react-icons/ri'
import { RxDotsVertical } from 'react-icons/rx'
import { twJoin } from 'tailwind-merge'
import { Account } from '~/services'
import { useAuth } from '~/store/Auth'
import { Video } from '~/utils/Interface/Video'
import { formatNumber, formatUpLoadTime } from '~/utils/feature'

const RecommentVideoItem = ({ video }: { video: Video }) => {
    const [dotContentVisible, setDotContentVisible] = useState(false)
    const { account } = useAuth()
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
        <div className='relative flex w-full gap-2'>
            <Link href={`/watch/${video?.id}`}>
                <div className='flex gap-2 w-full'>
                    <div className='relative object-cover w-[170px] h-[95px]'>
                        <img
                            src={video?.poster}
                            className='w-full h-full rounded-lg'
                        />
                        <span className='absolute  bottom-[-1px] right-[5px] text-[#fff] text-[13px]'>
                            {video?.duration}
                        </span>
                    </div>
                    <div className='w-full flex flex-1 flex-col'>
                        <p className='text-[16px] font-semibold line-clamp-2 pr-[6px]'>
                            {video?.title}
                        </p>
                        <span className='text-[12px] opacity-60'>
                            {video?.channel?.name}
                        </span>
                        <div className='flex items-center'>
                            <span className='text-[12px] opacity-60'>
                                {`${formatNumber(video?.view)} lượt xem`}
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
