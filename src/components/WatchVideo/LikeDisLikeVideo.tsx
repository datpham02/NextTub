import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'
import { queryClient } from '~/provider/QueryClientProviderCustome'
import { Account } from '~/services'
import { useAuth } from '~/store/Auth'
import { LikeDisLikeVideoData } from '~/utils/Interface/Account'
import { Video } from '~/utils/Interface/Video'
import { isLikeDisLikeVideo } from '~/utils/feature'

const LikeDisLikeVideo = ({ video }: { video: Video }) => {
    const router = useRouter()
    const { account } = useAuth()
    const { data: videoLike } = useQuery({
        queryKey: ['get_like_video', account?.id],
        queryFn: async () => {
            const data = await Account.getVideoLike(account?.id)
            return data
        },
        enabled: account?.id ? true : false,
    })
    const { data: videoDisLike } = useQuery({
        queryKey: ['get_dislike_video', account?.id],
        queryFn: async () => {
            const data = await Account.getVideoDisLike(account?.id)
            return data
        },
        enabled: account?.id ? true : false,
    })

    const { mutate: like_mutate } = useMutation({
        mutationKey: ['like_video', video?.id],
        mutationFn: async (dataMutate: LikeDisLikeVideoData) => {
            const data = await Account.like_video(dataMutate)
            return data.data
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['get_video_info', video?.id], data)
            queryClient.invalidateQueries({
                queryKey: ['get_like_video', account?.id],
            })
            queryClient.invalidateQueries({
                queryKey: ['get_dislike_video', account?.id],
            })
        },
    })
    const { mutate: dis_like_mutate } = useMutation({
        mutationKey: ['dislike_video', video?.id],
        mutationFn: async (dataMutate: LikeDisLikeVideoData) => {
            const data = await Account.disLike_video(dataMutate)
            return data.data
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['get_video_info', video?.id], data)
            queryClient.invalidateQueries({
                queryKey: ['get_dislike_video', account?.id],
            })
            queryClient.invalidateQueries({
                queryKey: ['get_like_video', account?.id],
            })
        },
    })

    const handleLikeVideo = () => {
        if (!account?.id) {
            router.push('/login')
            return
        }
        like_mutate({
            accountId: account?.id,
            videoId: video?.id,
        })
    }
    const handleDisLikeVideo = () => {
        if (!account?.id) {
            router.push('/login')
            return
        }
        dis_like_mutate({
            accountId: account?.id,
            videoId: video?.id,
        })
    }

    return (
        <div className='flex items-center bg-[#f2f2f2] rounded-[38px]'>
            <div className='flex items-center gap-2 bg-[#f2f2f2] hover:bg-[rgba(0,0,0,0.1)] rounded-l-[38px] px-[20px] py-[10px] cursor-pointer'>
                {videoLike ? (
                    <>
                        {isLikeDisLikeVideo(
                            video?.id,
                            (videoLike?.data?.videos as any) ?? [],
                        ) ? (
                            <AiOutlineLike
                                onClick={() => {
                                    handleLikeVideo()
                                }}
                                className='w-[25px] h-[25px] text-[blue]'
                            />
                        ) : (
                            <AiOutlineLike
                                onClick={() => {
                                    handleLikeVideo()
                                }}
                                className='w-[25px] h-[25px]'
                            />
                        )}
                    </>
                ) : (
                    <AiOutlineLike className='w-[25px] h-[25px]' />
                )}
                <span>{video?.like ?? 0}</span>
            </div>
            <span className='bg-[rgba(0,0,0,0.1)] w-[0.5px] h-[20px]'></span>
            <div className='flex items-center bg-[#f2f2f2] hover:bg-[rgba(0,0,0,0.1)] rounded-r-[38px] px-[20px] py-[10px] cursor-pointer'>
                {videoDisLike ? (
                    <>
                        {' '}
                        {isLikeDisLikeVideo(
                            video?.id,
                            (videoDisLike?.data?.videos as any) ?? [],
                        ) ? (
                            <AiOutlineDislike
                                onClick={() => {
                                    handleDisLikeVideo()
                                }}
                                className='w-[25px] h-[25px] text-[blue]'
                            />
                        ) : (
                            <AiOutlineDislike
                                onClick={() => {
                                    handleDisLikeVideo()
                                }}
                                className='w-[25px] h-[25px]'
                            />
                        )}
                    </>
                ) : (
                    <AiOutlineDislike className='w-[25px] h-[25px]' />
                )}
            </div>
        </div>
    )
}

export default LikeDisLikeVideo
