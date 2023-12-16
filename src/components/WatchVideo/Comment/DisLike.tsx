import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { AiOutlineDislike } from 'react-icons/ai'
import { twJoin } from 'tailwind-merge'
import { queryClient } from '~/provider/QueryClientProviderCustome'
import { Account } from '~/services'
import { LikeDisLikeData } from '~/utils/Interface/Account'
import { DisLikeProps } from '~/utils/interface'

const DisLike = ({
    isDisLike,
    commentId,
    accountId,
    videoId,
}: DisLikeProps) => {
    const { mutate } = useMutation({
        mutationKey: ['dislike_comment', commentId, videoId],
        mutationFn: async (dataMutate: LikeDisLikeData) => {
            const data = await Account.disLike_comment(dataMutate)
            return data.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['video_comment_data', videoId],
            })
        },
    })
    const handleClick = () => {
        mutate({
            accountId: accountId,
            commentId: commentId,
        })
    }
    return (
        <span
            onClick={() => {
                handleClick()
            }}
            className='text-[15px] font-semibold p-[5px] rounded-full hover:bg-[#F2F2F2] cursor-pointer'
        >
            <AiOutlineDislike
                className={twJoin(
                    'w-[22px] h-[22px]',
                    isDisLike ? 'text-[blue]' : '',
                )}
            />
        </span>
    )
}

export default DisLike
