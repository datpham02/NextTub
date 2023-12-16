export interface UpLoadVideoData {
    title: string
    src: string
    poster?: string
    description?: string
    channelOwnerId: number
    duration?: string
}
export interface UpDateVideoData {
    title: string

    poster?: string
    description?: string

    videoId: number
}
export interface GetVideoCommentData {
    videoId: number
}
export interface GetAllVideoData {
    channelId: number
    page: number
    limit: number
}
