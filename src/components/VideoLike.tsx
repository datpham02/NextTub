import React from 'react'
import { VideoLikeProps } from '~/utils/interface'
import VideoPreview from './Video/VideoPreview'
import VideoPreviewSkeleton from './Video/VideoPreviewSkeleton'
import { v4 as uuidv4 } from 'uuid'
const LIMIT = 10
const VideoLike = ({ videos }: VideoLikeProps) => {
    return (
        <div className='flex flex-col gap-2 p-[15px] w-full'>
            <h1 className='font-medium text-[30px]'>Video đã thích</h1>
            <div className=' h-screen overflow-hidden overflow-y-auto w-full'>
                <div className='mb-[150px] grid grid-cols-1  md:grid-cols-2 2xl:grid-cols-3 gap-2 w-full'>
                    {videos
                        ? videos?.map((video) => {
                              return (
                                  <VideoPreview
                                      key={video.id}
                                      video={video?.video}
                                  />
                              )
                          })
                        : Array(LIMIT)
                              .fill(0)
                              .map((_) => {
                                  return <VideoPreviewSkeleton key={uuidv4()} />
                              })}
                </div>
            </div>
        </div>
    )
}

export default VideoLike
