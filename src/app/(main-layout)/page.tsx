'use client'

import { ScrollArea } from '~/components/ScrollArea'
import {
    DefaultHttpClient,
    HttpRequest,
    HttpResponse,
    HubConnectionBuilder,
} from '@microsoft/signalr'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Video } from '~/services'
import { useEffect, useMemo } from 'react'
import { VideoPreview as VideoPreviewType } from '~/utils/Interface/Video'
import { v4 as uuidv4 } from 'uuid'
import { VideoPreview, VideoPreviewSkeleton } from '~/components'
const LIMIT = 10

export default function Home() {
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ['home_page_videos'],
            queryFn: async ({ pageParam }) => {
                const data = await Video.gets(pageParam, LIMIT)

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
        return data?.pages.reduce((pre: VideoPreviewType[], cur) => {
            return [...pre, ...cur.videos]
        }, [])
    }, [data])

    // useEffect(() => {
    //     let connection = new HubConnectionBuilder()
    //         .withUrl('https://localhost:7264/account-hub')
    //         .build()

    //     connection.on('updateOnlineUsers', (data) => {
    //         console.log(data)
    //     })

    //     connection.start()
    // }, [])
    return (
        <ScrollArea className='grow h-screen px-[30px]'>
            <div className=' mb-[150px] grid grid-cols-1  md:grid-cols-2 2xl:grid-cols-3 gap-2'>
                {videosData
                    ? videosData?.map((video) => {
                          return <VideoPreview key={video.id} video={video} />
                      })
                    : Array(LIMIT)
                          .fill(0)
                          .map((_) => {
                              return <VideoPreviewSkeleton key={uuidv4()} />
                          })}
            </div>
        </ScrollArea>
    )
}
