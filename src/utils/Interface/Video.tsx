import { LikeDisLike } from './Account'
import { Account } from './Login'

export interface GetByPageLimitVideoResponse {
    success: boolean
    pageResult: PagedResult
}
export interface GetByIdVideoResponse {
    success: boolean
    video: Video
}

export interface PagedResult {
    totalPage: number
    currentPage: number
    limitVideo: number
    nextPage: boolean
    previousPage: boolean
    videos: Video[]
}

export interface Video {
    id: number
    title: string
    createAt: string
    src: string
    poster: string
    view: number
    duration: string
    description: string
    channel: Channel
    like: number
    disLike: number
}

export interface Channel {
    id: number
    avatar: string
    name: string
    subcriberCount: number
    videoCount: number
}
export type ChannelPreview = Pick<Channel, 'id' | 'avatar' | 'name'>

export interface VideoPreview {
    id: number
    title: string
    createAt: string
    src: string
    poster: string
    view: number
    duration: string
    channel: ChannelPreview
}
export interface Comment {
    id: number
    content: string
    createAt: string
    accountOwnerId: number
    replyToAccountId: any
    videoId: number
    accountOwner: Account
    reply: Comment[]
    replyToAccount: Account
    like: LikeDisLike[]
    disLike: LikeDisLike[]
}

export interface AccountOwner {
    id: number
    email: string
    channel: ChannelPreview
    subcribers: any[]
}

export interface VideoCommentDataResponse {
    success: boolean
    comments: Comment[]
}
export interface VideoDisLikeResponse {
    success: boolean
    videos: { id: number; likeAt: string; video: Video }[]
}
export interface CommentResponse {
    success: boolean
    comments: Comment[]
}
export interface SubcribeChannelResponse {
    success: boolean
}
