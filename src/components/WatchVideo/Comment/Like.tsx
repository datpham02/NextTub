import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { twJoin } from 'tailwind-merge'
import { queryClient } from '~/provider/QueryClientProviderCustome'
import { Account } from '~/services'
import { LikeDisLikeData } from '~/utils/Interface/Account'
import { LikeProps } from '~/utils/interface'

const Like = ({ count, isLike, commentId, accountId, videoId }: LikeProps) => {
    const { mutate } = useMutation({
        mutationKey: ['like_comment', commentId, videoId],
        mutationFn: async (dataMutate: LikeDisLikeData) => {
            const data = await Account.like_comment(dataMutate)
            return data
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
        <div className='flex items-center'>
            <span
                onClick={() => {
                    handleClick()
                }}
                className='text-[15px] font-semibold p-[5px] rounded-full hover:bg-[#F2F2F2] cursor-pointer'
            >
                <AiOutlineLike
                    className={twJoin(
                        'w-[22px] h-[22px]',
                        isLike ? 'text-[blue]' : '',
                    )}
                />
            </span>
            <span className='text-[12px] text-[#909090]'>{count ?? 0}</span>
        </div>
    )
}

export default Like
