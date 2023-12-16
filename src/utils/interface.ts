import React from 'react'
import { VideoWatched } from './Interface/Account'
import { Comment, Video } from './Interface/Video'

export interface HeaderProps {
    handleHideSideBar: () => void
}

export interface ButtonProps {
    children: React.ReactNode
    className?: string
    onClick?: any
    type: 'button' | 'reset' | 'submit' | undefined
}

export interface SideBarItemProps {
    icon: React.ReactNode
    name: string
    active: boolean
    type?: 'default' | 'collapse'
}
export interface HomeSideBarProps {
    handleHideSideBar: () => void
    hideSideBar: boolean
    setHideSideBar: React.Dispatch<React.SetStateAction<boolean>>
}
export interface WatchSideBarProps {
    handleHideSideBar: () => void
    hideSideBar: boolean
    setHideSideBar: React.Dispatch<React.SetStateAction<boolean>>
}
export interface VideoPlayerProps {
    src: string
    poster: string
    alt: string
    size?: 'normal' | 'minimize'
    videoId?: number
}
export interface UpLoadPosterFieldProps {
    poster: {
        id: string
        img: File | string
        imgPreview: string
        select: boolean
    }[]
    handleUpLoadPoster: (e: any) => void
    handleSelectPoster: (index: number) => void
}
export interface VideoPlayerLayoutProps {
    size: 'normal' | 'minimize'
}
export interface LikeProps {
    commentId: number
    count: number
    isLike: boolean
    accountId: number
    videoId: number
}
export interface DisLikeProps {
    commentId: number
    isDisLike: boolean
    accountId: number
    videoId: number
}
export interface CommentProps {
    comment: Comment
}
export interface CommentItemProps {
    comment: Comment
}
export interface WatchVideoProps {
    video: Video
}
export interface HistoryProps {
    videos: VideoWatched[]
}
export interface WatchLateProps {
    id: number
    video: Video[]
}
export interface VideoLikeProps {
    videos: { id: number; likeAt: string; video: Video }[]
}
export interface SubcribedChannelVideoProps {
    videos: Video[]
}
export interface InputCommentProps {
    parentCommentId?: any
    replyToAccountId?: any
    videoId: number
}
export interface UseDebounce {
    value: string
    delay: number
}
