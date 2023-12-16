'use client'
import { useMemo } from 'react'
import { Account } from '~/services'
import { v4 as uuidv4 } from 'uuid'
import { Video } from '~/utils/Interface/Video'
import { VideoPreview, VideoPreviewSkeleton } from '~/components'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useAuth } from '~/store/Auth'
import { ScrollArea } from '~/components/ScrollArea'

const LIMIT = 10
const page = () => {
    const { account } = useAuth()

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ['subcribed_channel_videos', account?.id],
            queryFn: async ({ pageParam }) => {
                const data = await Account.getSubcribedChannelVideo(
                    Number(account?.id),
                    pageParam,
                    LIMIT,
                )

                return data.data.pageResult
            },
            getNextPageParam: (lastPage) => {
                return lastPage?.nextPage
                    ? Number(lastPage?.currentPage) + 1
                    : null
            },
            initialPageParam: 1,
        })

    const videosData = useMemo(() => {
        return data?.pages.reduce((pre: Video[], cur) => {
            return [...pre, ...cur.videos]
        }, [])
    }, [data])

    return (
        <div className='flex flex-col gap-2 w-full'>
            <h1 className='font-medium text-[30px]'>Mới nhất</h1>
            <ScrollArea className='grow h-screen w-full'>
                <div className=' mb-[150px] grid grid-cols-1  md:grid-cols-2 2xl:grid-cols-3 gap-2 w-full'>
                    {videosData
                        ? videosData?.map((video) => {
                              return (
                                  <VideoPreview key={video.id} video={video} />
                              )
                          })
                        : Array(LIMIT)
                              .fill(0)
                              .map((_) => {
                                  return <VideoPreviewSkeleton key={uuidv4()} />
                              })}
                </div>
            </ScrollArea>
        </div>
    )
}

export default page
