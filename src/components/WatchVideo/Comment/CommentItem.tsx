import React, { useState } from 'react'

import { formatUpLoadTime, isLikeDisLike } from '~/utils/feature'
import InputComment from './InputComment/InputComment'
import Like from './Like'
import DisLike from './DisLike'
import { useAuth } from '~/store/Auth'
import { CommentItemProps } from '~/utils/interface'

const CommentItem = ({ comment }: CommentItemProps) => {
    const { account } = useAuth()
    const [showInputReply, setShowInputReply] = useState<boolean>(false)
    const handleShowInputReply = () => {
        setShowInputReply(!showInputReply)
    }
    return (
        <div className='flex items-start gap-4'>
            <img
                src={comment?.accountOwner?.channel?.avatar}
                className='rounded-full w-[40px] h-[40px]'
            />
            <div className='w-full flex flex-col flex-1 gap-1'>
                <div className='flex items-center gap-1'>
                    <span className='text-[13px] font-medium'>
                        {comment?.accountOwner?.channel?.name}
                    </span>
                    <span className='text-[12px] text-[#909090]'>
                        {formatUpLoadTime(comment?.createAt)
                            ? `${formatUpLoadTime(comment?.createAt)} trước`
                            : ''}
                    </span>
                </div>
                <p className='text-[13px]'>
                    <span className='text-[blue] font-semibold'>
                        {comment?.replyToAccount?.channel?.name}
                    </span>{' '}
                    {comment?.content}
                </p>
                <div className='flex justify-start items-center gap-1'>
                    <Like
                        count={comment?.like.length}
                        isLike={isLikeDisLike(account?.id, comment?.like)}
                        commentId={comment?.id}
                        accountId={account?.id}
                        videoId={comment?.videoId}
                    />
                    <DisLike
                        isDisLike={isLikeDisLike(account?.id, comment?.disLike)}
                        commentId={comment?.id}
                        accountId={account?.id}
                        videoId={comment?.videoId}
                    />
                    <span
                        onClick={() => {
                            handleShowInputReply()
                        }}
                        className='text-[12px] font-semibold  px-[15px] py-[8px] rounded-full hover:bg-[#F2F2F2] hover:cursor-pointer'
                    >
                        Phản hồi
                    </span>
                </div>
                {showInputReply ? (
                    <InputComment
                        videoId={comment?.videoId}
                        parentCommentId={comment?.id}
                        replyToAccountId={comment?.accountOwnerId}
                    />
                ) : null}
            </div>
        </div>
    )
}

export default CommentItem
