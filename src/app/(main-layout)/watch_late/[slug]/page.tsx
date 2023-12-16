import { PageProps } from '~/utils/Interface/Page'
import { notFound } from 'next/navigation'
import { Account } from '~/services'
import { WatchLate } from '~/components'

const page = async ({ params }: PageProps) => {
    if (!params?.slug) {
        notFound()
    }
    const id = Number(params.slug)
    const data = await Account.getVideoWatchLate(id)
    console.log(data.data)
    if (data?.data?.success) {
        return <WatchLate videos={data?.data?.videos} />
    }
    notFound()
}

export default page
