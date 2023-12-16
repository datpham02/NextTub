'use client'

import React from 'react'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'
import { RiShareForwardLine } from 'react-icons/ri'
import { RecommentVideoItem, VideoPlayer } from '~/components'
import { formatNumber, formatUpLoadTime } from '~/utils/feature'
import CommentLayout from './Comment/CommentLayout'
import { useQuery } from '@tanstack/react-query'
import { Channel, Video } from '~/services'
import { WatchVideoProps } from '~/utils/interface'
import { useAuth } from '~/store/Auth'
import Subcribe from './Subcribe'
import LikeDisLikeVideo from './LikeDisLikeVideo'

const WatchVideo = ({ video }: WatchVideoProps) => {
    const { account } = useAuth()
    const { data } = useQuery({
        queryKey: ['video_comment_data', video?.id],
        queryFn: async () => {
            const data = await Channel.getVideoComment({
                videoId: video?.id,
            })
            return data.data
        },
    })
    const { data: recomment_video } = useQuery({
        queryKey: ['recomment_video', video?.id],
        queryFn: async () => {
            const data = await Video.search(video?.title)
            return data
        },
        enabled: video?.title ? true : false,
    })
    return (
        <div className='w-full h-screen overflow-hidden overflow-y-scroll pb-[100px]'>
            <div className='grid md:grid-cols-1 lg:grid-cols-3 lg:px-[85px] gap-4'>
                <div className='lg:col-span-2 p-[24px] flex flex-col'>
                    <div className='flex flex-col gap-4'>
                        <VideoPlayer
                            alt={video?.title as string}
                            poster={video?.poster as string}
                            src={video?.src as string}
                            key={video?.id}
                            size='normal'
                            videoId={video?.id}
                        />

                        <span className='text-[25px] font-semibold'>
                            {video?.title}
                        </span>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-6'>
                                <div className='flex gap-2'>
                                    <img
                                        src={video?.channel?.avatar}
                                        className='rounded-full w-[45px] h-[45px]'
                                    />
                                    <div className='flex flex-col'>
                                        <span className='font-semibold text-lg'>
                                            {video?.channel?.name}
                                        </span>
                                        <span className='text-sm opacity-70'>
                                            {`${formatNumber(
                                                video?.channel?.subcriberCount,
                                            )} người đăng ký`}
                                        </span>
                                    </div>
                                </div>
                                {account?.channel?.id ==
                                video?.channel?.id ? null : (
                                    <Subcribe video={video} />
                                )}
                            </div>
                            <div className='flex items-center gap-2'>
                                <LikeDisLikeVideo video={video} />
                                {/* <div className='flex items-center justify-center gap-2 bg-[#f2f2f2] hover:bg-[rgba(0,0,0,0.1)] rounded-[38px] px-[20px] py-[10px] cursor-pointer'>
                                    <RiShareForwardLine className='w-[25px] h-[25px]' />
                                    <span>Chia sẻ</span>
                                </div> */}
                            </div>
                        </div>
                        <div className='flex flex-col bg-[#f2f2f2] hover:bg-[rgba(0,0,0,0.1)] p-[10px] rounded-lg cursor-pointer'>
                            <div>
                                <div className='flex gap-2'>
                                    <span className='flex gap-2'>
                                        <span className='font-semibold text-[14px]'>
                                            {video?.view}
                                        </span>
                                        <span className='font-semibold text-[14px]'>
                                            lượt xem
                                        </span>
                                    </span>
                                    <span className='font-semibold text-[14px]'>
                                        {formatUpLoadTime(
                                            video?.createAt as string,
                                        )
                                            ? `${formatUpLoadTime(
                                                  video?.createAt as string,
                                              )} trước`
                                            : ''}
                                    </span>
                                </div>
                                <p>{video?.description}</p>
                            </div>
                        </div>
                        {data?.comments && (
                            <CommentLayout
                                comments={data?.comments}
                                videoId={video?.id}
                            />
                        )}
                    </div>
                </div>
                <div className='lg:col-span-1 pt-[24px] px-[24px] lg:px-0 lg:pr-[24px] flex flex-col gap-4'>
                    {recomment_video?.data?.pageResult?.videos?.map((video) => (
                        <RecommentVideoItem key={video.id} video={video} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WatchVideo
