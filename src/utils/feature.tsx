export const handleVideoUpLoadTime = (video_upload_time: string) => {
    const currentDateTime = new Date()
    const videoUpLoadAt = new Date(video_upload_time)
    const dayDiff = Math.floor(
        (currentDateTime.getTime() - videoUpLoadAt.getTime()) /
            (1000 * 60 * 60 * 24),
    )

    return dayDiff
}

export const handlePosterSelect = (
    poster: {
        img: File | string
        imgPreview: string
        select: boolean
    }[],
) => {
    return poster.find((posterData) => posterData.select == true)
}
