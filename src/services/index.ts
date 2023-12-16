import axiosClient from './axiosClient'
import { RegisterData, RegisterResponseData } from '~/utils/Interface/Register'
import { LoginData, LoginResponseData } from '~/utils/Interface/Login'
import {
    GetAllVideoData,
    GetVideoCommentData,
    UpDateVideoData,
    UpLoadVideoData,
} from '~/utils/Interface/Channel'
import {
    ChangePassWordData,
    CommentData,
    ForGotPassWordData,
    LikeDisLikeData,
    LikeDisLikeVideoData,
    SubcribeChannelData,
    SubcribedChannelResponse,
    VideoWatchedResponse,
} from '~/utils/Interface/Account'
import { VerifyTokenData, VerifyTokenResponse } from '~/utils/Interface/Auth'
import {
    CommentResponse,
    GetByIdVideoResponse,
    GetByPageLimitVideoResponse,
    SubcribeChannelResponse,
    VideoCommentDataResponse,
    VideoDisLikeResponse,
} from '~/utils/Interface/Video'

export const Account = {
    login: async ({ email, password }: LoginData) => {
        try {
            const data = await axiosClient<LoginResponseData>({
                method: 'post',
                url: '/user/login',
                data: {
                    email: email,
                    password: password,
                },
            })

            return data
        } catch (error) {
            throw error
        }
    },
    register: async ({ email, password, confirm_password }: RegisterData) => {
        try {
            const data = await axiosClient<RegisterResponseData>({
                method: 'post',
                url: '/user/register',
                data: {
                    email: email,
                    password: password,
                    confirmPassword: confirm_password,
                },
            })

            return data
        } catch (error) {
            throw error
        }
    },
    forgotPassword: async ({
        Subject = 'Đặt lại mật khẩu',
        ToEmail,
    }: ForGotPassWordData) => {
        try {
            const data = await axiosClient({
                method: 'post',
                url: '/user/forget_password',
                data: {
                    toEmail: ToEmail,
                    subject: Subject,
                },
            })

            return data
        } catch (error) {
            throw error
        }
    },
    changePassword: async ({
        confirmPassword,
        newPassword,
        token,
    }: ChangePassWordData) => {
        try {
            const data = await axiosClient({
                method: 'post',
                url: `/user/change_password?token=${token}`,
                data: {
                    newPassword: newPassword,
                    confirmNewPassword: confirmPassword,
                },
            })

            return data
        } catch (error) {
            throw error
        }
    },
    getInfo: async (id: string) => {
        try {
            const data = await axiosClient({
                method: 'get',
                url: `/user/info/${id}`,
            })

            return data
        } catch (error) {
            throw error
        }
    },
    comment: async ({
        content,
        accountOwnerId,
        parentCommentId,
        replyToAccountId,
        videoId,
    }: CommentData) => {
        try {
            const data = await axiosClient<CommentResponse>({
                method: 'post',
                url: `/user/create_comment`,
                data: {
                    content: content,
                    accountOwnerId: accountOwnerId,
                    parentCommentId: parentCommentId ?? 0,
                    replyToAccountId: replyToAccountId ?? 0,
                    videoId: videoId,
                },
            })

            return data
        } catch (error) {
            throw error
        }
    },
    watched: async (accountId: number, videoId: number) => {
        try {
            const data = await axiosClient({
                method: 'post',
                url: `/user/create_video_watched`,
                data: {
                    accountId: accountId,
                    videoId: videoId,
                },
            })

            return data
        } catch (error) {
            throw error
        }
    },
    watchLate: async (accountId: number, videoId: number) => {
        try {
            const data = await axiosClient({
                method: 'post',
                url: `/user/create_video_watched`,
                data: {
                    accountId: accountId,
                    videoId: videoId,
                },
            })

            return data
        } catch (error) {
            throw error
        }
    },
    delete_comment: async (commentId: number, accountId: number) => {
        try {
            const data = await axiosClient({
                method: 'post',
                url: `/comment/delete_comment?id=${commentId}&accountId=${accountId}`,
            })

            return data
        } catch (error) {
            throw error
        }
    },
    like_comment: async ({ accountId, commentId }: LikeDisLikeData) => {
        try {
            const data = await axiosClient({
                method: 'post',
                url: `/user/like_comment`,
                data: {
                    commentId: commentId,
                    accountId: accountId,
                },
            })

            return data
        } catch (error) {
            throw error
        }
    },
    disLike_comment: async ({ accountId, commentId }: LikeDisLikeData) => {
        try {
            const data = await axiosClient({
                method: 'post',
                url: `/user/dislike_comment`,
                data: {
                    commentId: commentId,
                    accountId: accountId,
                },
            })

            return data
        } catch (error) {
            throw error
        }
    },
    subcribe_channel: async ({ accountId, channelId }: SubcribeChannelData) => {
        try {
            const data = await axiosClient<SubcribeChannelResponse>({
                method: 'post',
                url: `/user/subcribe_channel`,
                data: {
                    accountId: accountId,
                    channelId: channelId,
                },
            })

            return data
        } catch (error) {
            throw error
        }
    },
    un_subcribe_channel: async ({
        accountId,
        channelId,
    }: SubcribeChannelData) => {
        try {
            const data = await axiosClient<SubcribeChannelResponse>({
                method: 'post',
                url: `/user/un_subcribe_channel`,
                data: {
                    accountId: accountId,
                    channelId: channelId,
                },
            })

            return data
        } catch (error) {
            throw error
        }
    },
    like_video: async ({ accountId, videoId }: LikeDisLikeVideoData) => {
        try {
            const data = await axiosClient({
                method: 'post',
                url: `/user/like_video`,
                data: {
                    videoId: videoId,
                    accountId: accountId,
                },
            })

            return data
        } catch (error) {
            throw error
        }
    },
    disLike_video: async ({ accountId, videoId }: LikeDisLikeVideoData) => {
        try {
            const data = await axiosClient({
                method: 'post',
                url: `/user/dislike_video`,
                data: {
                    videoId: videoId,
                    accountId: accountId,
                },
            })

            return data
        } catch (error) {
            throw error
        }
    },
    getVideoWatched: async (accountId: number) => {
        try {
            const data = await axiosClient<VideoWatchedResponse>({
                method: 'get',
                url: `/user/${accountId}/get_video_watched`,
            })

            return data
        } catch (error) {
            throw error
        }
    },
    getVideoWatchLate: async (accountId: number) => {
        try {
            const data = await axiosClient({
                method: 'get',
                url: `/user/${accountId}/get_video_watch_late`,
            })

            return data
        } catch (error) {
            throw error
        }
    },
    getSubcribedChannel: async (accountId: number) => {
        try {
            const data = (await axiosClient)<SubcribedChannelResponse>({
                method: 'get',
                url: `/user/${accountId}/get_channel_subcribed`,
            })

            return data
        } catch (error) {
            throw error
        }
    },
    getVideoLike: async (accountId: number) => {
        try {
            const data = await axiosClient<VideoDisLikeResponse>({
                method: 'get',
                url: `/user/${accountId}/get_video_like`,
            })

            return data
        } catch (error) {
            throw error
        }
    },
    getVideoDisLike: async (accountId: number) => {
        try {
            const data = await axiosClient<VideoDisLikeResponse>({
                method: 'get',
                url: `/user/${accountId}/get_video_dis_like`,
            })

            return data
        } catch (error) {
            throw error
        }
    },
    getSubcribedChannelVideo: async (
        accountId: number,
        page: number = 1,
        limit: number = 10,
    ) => {
        try {
            const data = await axiosClient<GetByPageLimitVideoResponse>({
                method: 'get',
                url: `/user/${accountId}/get_channel_subcribed_video?page=${page}&limit=${limit}`,
            })

            return data
        } catch (error) {
            throw error
        }
    },
}

export const Channel = {
    upLoadVideo: async ({
        title,
        src,
        poster,
        description,
        channelOwnerId,
        duration,
    }: UpLoadVideoData) => {
        try {
            const data = await axiosClient({
                method: 'post',
                url: '/channel/create_video',
                data: {
                    title: title,
                    src: src,
                    poster: poster,
                    description: description,
                    channelOwnerId: channelOwnerId,
                    duration: duration,
                },
            })

            return data
        } catch (error) {
            throw error
        }
    },
    updateVideo: async ({
        title,
        videoId,
        description,
        poster,
    }: UpDateVideoData) => {
        try {
            const data = await axiosClient({
                method: 'post',
                url: '/channel/update_video',
                data: {
                    title: title,
                    videoId: videoId,
                    poster: poster,
                    description: description,
                },
            })

            return data
        } catch (error) {
            throw error
        }
    },
    getVideoComment: async ({ videoId }: GetVideoCommentData) => {
        try {
            const data = await axiosClient<VideoCommentDataResponse>({
                method: 'get',
                url: `/channel/get_video_comment/${videoId}`,
            })

            return data
        } catch (error) {
            throw error
        }
    },
    getAllVideo: async ({ channelId, page, limit }: GetAllVideoData) => {
        try {
            const data = await axiosClient<GetByPageLimitVideoResponse>({
                method: 'get',
                url: `/channel/${channelId}/video?page=${page}&limit=${limit}`,
            })

            return data
        } catch (error) {
            throw error
        }
    },
    deleteVideo: async (channelId: number, videoId: number) => {
        try {
            const data = await axiosClient({
                method: 'delete',
                url: `/channel/${channelId}/delete_video/${videoId}`,
            })

            return data
        } catch (error) {
            throw error
        }
    },
}
export const Video = {
    get: async (videoId: string) => {
        try {
            const data = await axiosClient<GetByIdVideoResponse>({
                method: 'get',
                url: `/video/get/${videoId}`,
            })

            return data
        } catch (error) {
            throw error
        }
    },
    gets: async (page = 1, limit = 10) => {
        try {
            const data = await axiosClient<GetByPageLimitVideoResponse>({
                method: 'get',
                url: `/video/gets?page=${page}&limit=${limit}`,
            })

            return data
        } catch (error) {
            throw error
        }
    },
    getAll: async () => {
        try {
            const data = await axiosClient({
                method: 'get',
                url: `/video/getAll`,
            })

            return data
        } catch (error) {
            throw error
        }
    },
    search: async (keyword: string) => {
        try {
            const data = await axiosClient<GetByPageLimitVideoResponse>({
                method: 'get',
                url: `/video/search?keywords=${keyword}`,
            })

            return data
        } catch (error) {
            throw error
        }
    },
}
export const Auth = {
    verfiy: async ({ token }: VerifyTokenData) => {
        try {
            const data = await axiosClient<VerifyTokenResponse>({
                method: 'post',
                url: '/auth/verify',
                data: {
                    token: token,
                },
            })

            return data
        } catch (error) {
            throw error
        }
    },
}
