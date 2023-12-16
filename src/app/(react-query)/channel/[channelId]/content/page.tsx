'use client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { Content } from '~/components'
import { Channel } from '~/services'
import { useAuth } from '~/store/Auth'

const page = () => {
    const [page, setPage] = useState<number>(1)
    const { account } = useAuth()
    const { data } = useQuery({
        queryKey: ['channel_content_page_videos'],
        queryFn: async () => {
            const data = await Channel.getAllVideo({
                channelId: account?.channel?.id,
                page: Number(page),
                limit: Number(10),
            })

            return data.data.pageResult
        },
        enabled: account?.id ? true : false,
    })

    return <Content videos={data?.videos as any} />
}

export default page
