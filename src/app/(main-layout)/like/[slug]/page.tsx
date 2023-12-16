import { PageProps } from '~/utils/Interface/Page'
import { notFound } from 'next/navigation'
import { Account } from '~/services'
import { VideoLike } from '~/components'

const page = async ({ params }: PageProps) => {
    if (!params?.slug) {
        notFound()
    }
    const id = Number(params.slug)
    const data = await Account.getVideoLike(id)
    if (data?.data?.success) {
        return <VideoLike videos={data?.data?.videos} />
    }
    notFound()
}

export default page
