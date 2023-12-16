import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { object, string } from 'yup'
import { Account } from '~/services'
import { CommentData } from '~/utils/Interface/Account'
import { CommentFormData } from '~/utils/Interface/Form'
import './InputCommentCss.css'
import { twJoin } from 'tailwind-merge'
import { useAuth } from '~/store/Auth'
import { InputCommentProps } from '~/utils/interface'
import { queryClient } from '~/provider/QueryClientProviderCustome'
const CommentSchema = object({
    content: string().required('Nhập nội dung để bình luân'),
})

const InputComment = ({
    parentCommentId,
    replyToAccountId,
    videoId,
}: InputCommentProps) => {
    const { account } = useAuth()
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        reset,
    } = useForm({
        resolver: yupResolver(CommentSchema),
    })
    const { mutate } = useMutation({
        mutationKey: ['comment'],
        mutationFn: async (dataMutate: CommentData) => {
            const data = await Account.comment(dataMutate)

            return data
        },
        onSuccess: (data) => {
            reset()
            queryClient.setQueryData(['video_comment_data', videoId], data.data)
        },
    })

    const handleCancelComment = () => {
        reset()
    }

    const onSubmit: SubmitHandler<CommentFormData> = (data) => {
        mutate({
            ...data,
            accountOwnerId: account?.id,
            parentCommentId: parentCommentId ?? 0,
            replyToAccountId: replyToAccountId ?? 0,
            videoId: videoId,
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <div className='flex flex-col gap-4 w-full'>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='form w-full'>
                        <input
                            className='input w-full'
                            placeholder='Viết bình luận...'
                            type='text'
                            {...register('content')}
                        />
                        <span className='input-border'></span>
                    </div>
                    <p
                        className={twJoin(
                            'text-[red] text-[14px]  ',
                            errors?.content ? 'inline-block' : 'hidden',
                        )}
                    >
                        {errors && errors.content
                            ? errors.content.message
                            : null}
                    </p>
                </div>
                {watch('content') ? (
                    <div className='flex items-center justify-end gap-2'>
                        <span
                            onClick={() => {
                                handleCancelComment()
                            }}
                            className='py-2.5 px-8 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-[rgba(0,0,0,.09)] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 cursor-pointer'
                        >
                            Hủy
                        </span>
                        <button
                            type='submit'
                            className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-2.5 text-center me-2 mb-2 '
                        >
                            Bình luận
                        </button>
                    </div>
                ) : null}
            </div>
        </form>
    )
}

export default InputComment
