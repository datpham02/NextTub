import axios from 'axios'
import { ChannelPreview, Comment } from './Interface/Video'
import { LikeDisLike, SubcribedChannel } from './Interface/Account'

export const handlePosterSelect = (
    poster: {
        img: File | string
        imgPreview: string
        select: boolean
    }[],
) => {
    return poster.find((posterData) => posterData.select == true)
}

export const handleUpLoadFileToCloudinary = async (
    file: File,
    type: 'image' | 'video',
) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string,
    )
    const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/${type}/upload`,
        formData,
    )

    return data
}
export const roundingDurationVideo = (seconds: Number | String) => {
    const Hours = Math.floor(Number(seconds) / 3600)
    const Minutes = Math.floor((Number(seconds) % 3600) / 60)
    const Seconds = Math.floor(Number(seconds) % 60)
    if (Number(seconds) == 0) {
        if (Hours < 1) {
            return '0:00'
        } else return '00:00:00'
    }
    if (Number.isNaN(Hours) || Number.isNaN(Minutes) || Number.isNaN(Seconds)) {
        return '00:00:00'
    }
    if (Hours < 1 && Minutes < 1 && !Number.isNaN(Seconds)) {
        return `00:${Seconds > 9 ? Seconds : `0${Seconds}`}`
    } else if (Hours < 1 && !Number.isNaN(Minutes)) {
        return `${Minutes}:${Seconds > 9 ? Seconds : `0${Seconds}`}`
    } else if (Hours >= 1 && !Number.isNaN(Hours)) {
        return `${Hours}:${Minutes > 9 ? Minutes : `0${Minutes}`}:${
            Seconds > 10 ? Seconds : `0${Seconds}`
        }`
    }
    return '00:00:00'
}

export const formatNumber = (number: number) => {
    if (number < 1000) {
        return `${number} `
    } else {
        const nghin = Math.floor(number / 1000)
        return `${nghin} N `
    }
}
export const formatUpLoadTime = (time: string) => {
    let createAt: any = new Date(time)

    let currentTime: any = new Date()

    let diffSeconds: number = (currentTime - createAt) / 1000

    // Tính số năm
    let years = Math.floor(diffSeconds / (365 * 24 * 3600))

    // Tính số tháng
    let months = Math.floor(diffSeconds / (30 * 24 * 3600))

    // Tính số tuần
    let weeks = Math.floor(diffSeconds / (7 * 24 * 3600))

    // Tính số ngày
    let days = Math.floor(diffSeconds / (24 * 3600))

    // Tính số giờ
    let hours = Math.floor(diffSeconds / 3600)

    // Tính số phút
    let minutes = Math.floor(diffSeconds / 60)

    // Số giây còn lại
    let seconds = Math.floor(diffSeconds)

    if (years > 0) return years + ' năm '
    if (months > 0) return months + ' tháng '
    if (weeks > 0) return weeks + ' tuần '
    if (days > 0) return days + ' ngày '
    if (hours > 0) return hours + ' giờ '
    if (minutes > 0) return minutes + ' phút '
    if (seconds > 0) return seconds + ' giây '

    if (diffSeconds > 0) {
        return diffSeconds > 10
            ? diffSeconds + ' giây '
            : `0${diffSeconds} giây `
    }
    return `0 giây `
}
export function formatDateTimeString(thoi_diem: string): string {
    const inputDate = new Date(thoi_diem)

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
        inputDate,
    )

    return formattedDate
}

export const formatCommentData = (commentData: Comment) => {
    const replyData: Comment[] = []

    function merge(element: Comment) {
        replyData.push(element)

        if (element?.reply && element?.reply.length > 0) {
            for (const reply of element?.reply) {
                if (reply?.reply && reply?.reply.length > 0) {
                    merge(reply)
                } else {
                    replyData.push(reply)
                }
            }
        }
    }

    // Bắt đầu từ mảng data ban đầu
    for (let i = 0; i < commentData?.reply.length; i++) {
        merge(commentData?.reply[i])
    }

    return { ...commentData, reply: replyData }
}

export const isLikeDisLike = (accountId: number, data: LikeDisLike[]) => {
    if (!data || data?.length < 1 || !accountId) return false
    return data.filter((data) => data?.account?.id == accountId)[0]
        ? true
        : false
}
export const isLikeDisLikeVideo = (videoId: number, data: any[]) => {
    if (!data || data?.length < 1 || !videoId) {
        return false
    }

    return data.filter((ele) => ele?.video?.id == videoId)[0] ? true : false
}

export const isSubcribed = (
    channelId: number,
    subcribedChannel: SubcribedChannel[],
) => {
    if (!subcribedChannel || subcribedChannel?.length < 1 || !channelId)
        return false
    return subcribedChannel?.filter(
        (subcribed) => subcribed?.channel?.id == channelId,
    )[0]
        ? true
        : false
}
