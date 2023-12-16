import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import { Account } from '~/services'
import {
    SubcribeChannelData,
    SubcribedChannel,
} from '~/utils/Interface/Account'
import { useRouter } from 'next/navigation'
import { Video } from '~/utils/Interface/Video'
import { useAuth } from '~/store/Auth'
import { isSubcribed } from '~/utils/feature'
import { queryClient } from '~/provider/QueryClientProviderCustome'
const Subcribe = ({ video }: { video: Video }) => {
    const router = useRouter()
    const { account } = useAuth()
    const { data: subcribed_channel } = useQuery({
        queryKey: ['get_subcribed_channel', account?.id],
        queryFn: async () => {
            const data = await Account.getSubcribedChannel(account?.id)
            return data.data
        },
        enabled: account?.id ? true : false,
    })
    const { mutate: subcribe_mutate } = useMutation({
        mutationKey: ['subcribed_channel', video?.channel?.id],
        mutationFn: async (dataMutate: SubcribeChannelData) => {
            const data = await Account.subcribe_channel(dataMutate)
            return data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['get_subcribed_channel', account?.id],
            })
        },
        onError: (error, data, context) => {
            //@ts-ignore
            if (error.response) {
                toast.error(
                    //@ts-ignore
                    error?.response.data.msg ??
                        'Đã có lỗi xảy ra ,vui lòng thử lại',
                )
            } else {
                toast.error('Đã có lỗi xảy ra ,vui lòng thử lại')
            }
        },
    })
    const { mutate: un_subcribe_mutate } = useMutation({
        mutationKey: ['subcribed_channel', video?.channel?.id],
        mutationFn: async (dataMutate: SubcribeChannelData) => {
            const data = await Account.un_subcribe_channel(dataMutate)
            return data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['get_subcribed_channel', account?.id],
            })
        },
        onError: (error, data, context) => {
            //@ts-ignore
            if (error.response) {
                toast.error(
                    //@ts-ignore
                    error?.response.data.msg ??
                        'Đã có lỗi xảy ra ,vui lòng thử lại',
                )
            } else {
                toast.error('Đã có lỗi xảy ra ,vui lòng thử lại')
            }
        },
    })
    const handleSubcribeChannel = () => {
        if (!account?.id) {
            router.push('/login')
            return
        }
        subcribe_mutate({
            accountId: account?.id,
            channelId: video?.channel?.id,
        })
    }
    const handleUnSubcribeChannel = () => {
        if (!account?.id) {
            router.push('/login')
            return
        }
        un_subcribe_mutate({
            accountId: account?.id,
            channelId: video?.channel?.id,
        })
    }
    return (
        <>
            {isSubcribed(
                video.channel?.id,
                subcribed_channel?.subcribedChannel as SubcribedChannel[],
            ) ? (
                <span
                    onClick={() => {
                        handleUnSubcribeChannel()
                    }}
                    className='cursor-pointer rounded-[38px]  bg-[#0f0f0f] hover:bg-[#272727] flex items-center justify-center font-medium text-lg text-[#fff] px-[20px] py-[10px] line-height'
                >
                    Hủy đăng ký
                </span>
            ) : (
                <span
                    onClick={() => {
                        handleSubcribeChannel()
                    }}
                    className='cursor-pointer rounded-[38px]  bg-[#0f0f0f] hover:bg-[#272727] flex items-center justify-center font-medium text-lg text-[#fff] px-[20px] py-[10px] line-height'
                >
                    Đăng ký
                </span>
            )}
        </>
    )
}

export default Subcribe
