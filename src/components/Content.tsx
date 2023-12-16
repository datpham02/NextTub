import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { queryClient } from '~/provider/QueryClientProviderCustome'
import { Channel } from '~/services'
import { useAuth } from '~/store/Auth'
import { Video } from '~/utils/Interface/Video'
import { formatDateTimeString } from '~/utils/feature'

const Content = ({ videos }: { videos: Video[] }) => {
    const { account } = useAuth()
    const { mutate } = useMutation({
        mutationKey: ['delete_video'],
        mutationFn: async ({
            channelId,
            videoId,
        }: {
            channelId: number
            videoId: number
        }) => {
            const data = await Channel.deleteVideo(channelId, videoId)

            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['channel_content_page_videos'],
            })
        },
    })

    const handleDeleteVideo = (videoId: number) => {
        mutate({
            channelId: account?.channel?.id,
            videoId: videoId,
        })
    }
    return (
        <div className='relative w-full pt-[15px]'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>
                            Video
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Ngày
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Lượt xem
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Lượt thích
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Lượt không thích
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Chỉnh sửa
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {videos?.map((video) => {
                        return (
                            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                <td
                                    scope='row'
                                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                                >
                                    <div className='flex items-start gap-2'>
                                        <img
                                            src={video?.poster}
                                            className='w-[130px] h-[70px] object-cover'
                                        />
                                        <p className=' text-[14px]'>
                                            {video?.title}
                                        </p>
                                    </div>
                                </td>
                                <td className='px-6 py-4'>
                                    {formatDateTimeString(video?.createAt)}
                                </td>
                                <td className='px-6 py-4'>
                                    {video?.view ?? 0}
                                </td>
                                <td className='px-6 py-4'>
                                    {video?.like ?? 0}
                                </td>
                                <td className='px-6 py-4'>
                                    {video?.disLike ?? 0}
                                </td>
                                <td className='px-6 py-4'>
                                    <div className='flex gap-2 items-center'>
                                        <Link
                                            href={`/channel/${account?.channel?.id}/video/edit/${video?.id}`}
                                        >
                                            <span className=' cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                                                Sửa
                                            </span>
                                        </Link>
                                        <span
                                            onClick={() => {
                                                handleDeleteVideo(video?.id)
                                            }}
                                            className='cursor-pointer ont-medium text-[red] dark:text-blue-500 hover:underline'
                                        >
                                            Xóa
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Content
