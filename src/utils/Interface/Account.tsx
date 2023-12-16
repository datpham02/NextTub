import { Account } from './Login'
import { ChannelPreview, Video } from './Video'

export interface ForGotPassWordData {
    ToEmail: string
    Subject: 'Đặt lại mật khẩu'
}
export interface ChangePassWordData {
    token: string
    newPassword: string
    confirmPassword: string
}

export interface CommentData {
    content: string
    accountOwnerId: number
    videoId: number
    parentCommentId?: any
    replyToAccountId?: any
}
export interface LikeDisLikeData {
    accountId: number
    commentId: number
}
export interface LikeDisLike {
    createAt: string
    account: Account
}

export interface SubcribedChannelResponse {
    success: boolean
    subcribedChannel: SubcribedChannel[]
}

export interface SubcribedChannel {
    id: number
    channel: ChannelPreview
}
export interface VideoWatchedResponse {
    success: boolean
    videos: VideoWatched[]
}

export interface VideoWatched {
    id: number
    watchedAt: string
    video: Video
}
export interface SubcribeChannelData {
    accountId: number
    channelId: number
}
export interface SubcribedChannel {
    id: number
    channel: ChannelPreview
}
export interface VideoLikeDisLike {
    id: number
    likeAt?: string
    disLikeAt?: string
    video: Video
}
export interface LikeDisLikeVideoData {
    accountId: number
    videoId: number
}
