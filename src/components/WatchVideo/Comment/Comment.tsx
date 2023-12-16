import React, { useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { twJoin } from 'tailwind-merge'
import { formatCommentData } from '~/utils/feature'
import CommentItem from './CommentItem'
import { CommentProps } from '~/utils/interface'

const Comment = ({ comment }: CommentProps) => {
    const [replyCommentShow, setReplyCommentShow] = useState<boolean>(false)

    const handleShowReplyComment = () => {
        setReplyCommentShow(!replyCommentShow)
    }
    return (
        <div>
            <CommentItem comment={comment} />
            <div className='ml-[60px] flex flex-col gap-2'>
                <div className='flex items-center'>
                    <span
                        onClick={() => {
                            handleShowReplyComment()
                        }}
                        className='inline-flex rounded-full items-center text-[13px] cursor-pointer hover:bg-[#def1ff] py-[6px] px-[10px]'
                    >
                        {replyCommentShow ? (
                            <IoMdArrowDropup className='text-[blue] w-[20px] h-[20px]' />
                        ) : (
                            <IoMdArrowDropdown className='text-[blue] w-[20px] h-[20px]' />
                        )}
                        <span className='text-[blue] font-medium'>{`${
                            formatCommentData(comment).reply.length ?? 0
                        } phản hồi`}</span>
                    </span>
                </div>
                <div
                    className={twJoin(
                        'flex flex-col gap-2 overflow-hidden ',
                        replyCommentShow ? 'h-full' : 'h-0',
                    )}
                >
                    {comment?.reply
                        ? formatCommentData(comment).reply.map((reply) => {
                              return (
                                  <CommentItem
                                      key={reply?.id}
                                      comment={reply}
                                  />
                              )
                          })
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Comment
