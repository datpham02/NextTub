'use client'
import { useQuery } from '@tanstack/react-query'
import { Loader, WatchVideo } from '~/components'
import { Video } from '~/services'
import { PageProps } from '~/utils/Interface/Page'
import { Video as VideoType } from '~/utils/Interface/Video'

const page = ({ params }: PageProps) => {
    const { data, isSuccess } = useQuery({
        queryKey: ['get_video_info', Number(params?.slug)],
        queryFn: async () => {
            const data = await Video.get(params?.slug)
            return data.data
        },
        enabled: params?.slug ? true : false,
    })

    return (
        <>
            {isSuccess ? (
                <WatchVideo video={data?.video as VideoType} />
            ) : (
                <Loader />
            )}
        </>
    )
}

export default page
