'use client'
import Link from 'next/link'
import { Button, Input, Loader } from '~/components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { twJoin } from 'tailwind-merge'
import { Account } from '~/services'
import {
    useIsFetching,
    useIsMutating,
    useMutation,
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ForGotPassWordData } from '~/utils/Interface/Account'
import { ForgotPasswordFormData } from '~/utils/Interface/Form'

const ForgotPasswordSchema = object({
    email: string()
        .email('Vui lòng nhập đúng định dạng email')
        .required('Vui lòng nhập email của bạn'),
})
const ForgotPasswordForm = () => {
    const isFetching = useIsFetching()
    const isMutating = useIsMutating()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(ForgotPasswordSchema),
    })

    const { mutate } = useMutation({
        mutationKey: ['forgot_passowrd'],
        mutationFn: async (dataMutation: ForGotPassWordData) => {
            const data = Account.forgotPassword(dataMutation)
            return data
        },
        onSuccess: (data) => {
            if (data?.data.success) {
                reset()
                toast.success('Vui lòng kiểm tra email của bạn')
                router.push('/login')
            }
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

    const onSubmit: SubmitHandler<ForgotPasswordFormData> = (data) => {
        mutate({
            ToEmail: data.email,
            Subject: 'Đặt lại mật khẩu',
        })
    }
    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='bg-[#fff] flex flex-col items-center justify-center  w-full h-screen'
            >
                <div className='bg-[#fff] w-[450px] p-[40px] flex flex-col border-[1px] rounded-md shadow-md'>
                    <Link href={'/'}>
                        <div className='text-[#6A5BCD] text-4xl font-extrabold tracking-tight lg:text-5xl mb-[30px] text-center cursor-pointer'>
                            NextTub
                        </div>
                    </Link>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-[40px] text-center font-medium'>
                            Đặt lại mật khẩu
                        </h1>
                        <p>
                            Nhập địa chỉ email đã xác minh của tài khoản người
                            dùng của bạn và chúng tôi sẽ gửi cho bạn liên kết
                            đặt lại mật khẩu.
                        </p>
                        <div className='w-full flex flex-col space-y-4'>
                            <div className='flex flex-col gap-2'>
                                <Input
                                    id='email'
                                    placeholder='Email'
                                    {...register('email')}
                                    autoComplete='off'
                                />
                                <p
                                    className={twJoin(
                                        'text-[red] text-[14px]  ',
                                        errors?.email
                                            ? 'inline-block'
                                            : 'hidden',
                                    )}
                                >
                                    {errors && errors.email
                                        ? errors.email.message
                                        : null}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col mt-[20px] space-y-4'>
                        <Button type='submit' className='w-full'>
                            Gửi
                        </Button>
                    </div>
                </div>
            </form>
            {isMutating + isFetching !== 0 && <Loader />}
        </>
    )
}

export default ForgotPasswordForm
