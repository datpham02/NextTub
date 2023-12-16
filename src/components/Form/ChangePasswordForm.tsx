'use client'
import Link from 'next/link'
import { Button, Input, Loader } from '~/components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { twJoin } from 'tailwind-merge'
import { Account } from '~/services'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ChangePassWordData } from '~/utils/Interface/Account'
import {
    ChangePassWordProps,
    ChangePasswordFormData,
} from '~/utils/Interface/Form'

const ChangePasswordSchema = object({
    new_password: string()
        .matches(
            /^(?=.*[A-Z])(?=.*\d).{8,}$/,
            'Mật khẩu phải có ít nhất 8 ký tự,ít nhất 1 chữ hoa và 1 chữ',
        )
        .required('Không được để trống mật khẩu'),

    confirm_password: string()
        .test('passwords-match', 'Mật khẩu không khớp', function (value) {
            return this.parent.new_password === value
        })
        .matches(
            /^(?=.*[A-Z])(?=.*\d).{8,}$/,
            'Mật khẩu phải có ít nhất 8 ký tự,ít nhất 1 chữ hoa và 1 chữ số',
        )
        .required('Không được để trống mật khẩu'),
})
const ChangePasswordForm = ({ token }: ChangePassWordProps) => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(ChangePasswordSchema),
    })

    const { mutate } = useMutation({
        mutationKey: ['change_password'],
        mutationFn: async (dataMutation: ChangePassWordData) => {
            const data = Account.changePassword(dataMutation)
            return data
        },
        onSuccess: (data) => {
            if (data?.data.success) {
                reset()
                toast.success('Đổi mật khẩu thành công')
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

    const onSubmit: SubmitHandler<ChangePasswordFormData> = (data) => {
        mutate({
            confirmPassword: data.confirm_password,
            newPassword: data.new_password,
            token: token,
        })
    }
    return (
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
                <div className='w-full flex flex-col space-y-4'>
                    <div className='flex flex-col gap-2'>
                        <div className='grid w-full max-w-sm items-center gap-1.5'>
                            <label className='font-medium' htmlFor='email'>
                                Mật khẩu mới
                            </label>
                            <Input
                                id='new_password'
                                placeholder='Mật khẩu'
                                {...register('new_password')}
                                autoComplete='off'
                                type='password'
                            />
                        </div>
                        <p
                            className={twJoin(
                                'text-[red] text-[14px]  ',
                                errors?.new_password
                                    ? 'inline-block'
                                    : 'hidden',
                            )}
                        >
                            {errors && errors.new_password
                                ? errors.new_password.message
                                : null}
                        </p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='grid w-full max-w-sm items-center gap-1.5'>
                            <label className='font-medium' htmlFor='password'>
                                Xác nhận mật khẩu
                            </label>
                            <Input
                                id='confirm_password'
                                placeholder='Mật khẩu'
                                {...register('confirm_password')}
                                type='password'
                                autoComplete='off'
                            />
                        </div>
                        <p
                            className={twJoin(
                                'text-[red] text-[14px] ',
                                errors?.confirm_password
                                    ? 'inline-block'
                                    : 'hidden',
                            )}
                        >
                            {errors && errors.confirm_password
                                ? errors.confirm_password.message
                                : null}
                        </p>
                    </div>
                </div>
                <div className='flex flex-col mt-[20px] space-y-4'>
                    <Button type='submit' className='w-full'>
                        Đặt lại mật khẩu
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default ChangePasswordForm
