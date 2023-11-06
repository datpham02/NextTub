export const HandleVideoUpLoadTime = (video_upload_time: string) => {
    const currentDateTime = new Date()
    const videoUpLoadAt = new Date(video_upload_time)
    const dayDiff = Math.floor(
        (currentDateTime.getTime() - videoUpLoadAt.getTime()) /
            (1000 * 60 * 60 * 24),
    )

    return dayDiff
}
