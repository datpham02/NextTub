import Tippy from '@tippyjs/react/headless'
import React, { useState } from 'react'
import { MdSort } from 'react-icons/md'
import InputComment from './InputComment/InputComment'
import Comment from './Comment'
import { CommentLayoutProps } from '~/utils/Interface/Layout'

const CommentLayout = ({ comments, videoId }: CommentLayoutProps) => {
    const [sort, setSortVisible] = useState(false)
    const [sortType, setSortType] = useState<'new' | 'old'>('new')
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-6'>
                <span>{`${comments?.length ?? 0} bình luận`}</span>
                {/* <div className='flex items-center gap-2'>
                    <Tippy
                        interactive
                        placement='bottom-start'
                        visible={sort}
                        onClickOutside={() => {
                            setSortVisible(false)
                        }}
                        render={(attrs) => (
                            <div
                                {...attrs}
                                className='bg-[#fff]  rounded-md py-[8px] shadow-md'
                            >
                                <div className='flex flex-col'>
                                    <div
                                        onClick={() => {
                                            setSortType('new')
                                            setSortVisible(false)
                                        }}
                                        className='flex flex-col px-[25px] hover:bg-[rgba(0,0,0,0.1)] py-[8px] cursor-pointer'
                                    >
                                        <span className='text-[14px]'>
                                            Mới nhất
                                        </span>
                                    </div>
                                    <div
                                        onClick={() => {
                                            setSortType('old')
                                            setSortVisible(false)
                                        }}
                                        className='flex flex-col px-[25px] hover:bg-[rgba(0,0,0,0.1)] py-[8px] cursor-pointer'
                                    >
                                        <span className='text-[14px]'>
                                            Cũ nhất
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    >
                        <span
                            onClick={() => {
                                setSortVisible(!sort)
                            }}
                            className='flex gap-2 items-center cursor-pointer'
                        >
                            <MdSort className='w-[30px] h-[30px]' />
                            <span className='font-semibold text-[14px]'>
                                Sắp xếp theo
                            </span>
                        </span>
                    </Tippy>
                </div> */}
            </div>
            <InputComment
                videoId={videoId}
                parentCommentId={null}
                replyToAccountId={null}
            />
            <div className='flex flex-col gap-4'>
                {comments?.map((comment) => {
                    return <Comment key={comment.id} comment={comment} />
                })}
            </div>
        </div>
    )
}

export default CommentLayout
