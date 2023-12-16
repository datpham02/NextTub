'use client'
import Link from 'next/link'
import { Button, Input, Loader } from '~/components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { twJoin } from 'tailwind-merge'
import { LoginData } from '~/utils/Interface/Login'
import { Account } from '~/services'
import {
    useIsFetching,
    useIsMutating,
    useMutation,
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useAuth } from '~/store/Auth'
import jwt from 'jsonwebtoken'
const LoginSchema = object({
    email: string()
        .email('Email không đúng định dạng')
        .required('Không được để trống email'),
    password: string()
        .matches(
            /^(?=.*[A-Z])(?=.*\d).{8,}$/,
            'Mật khẩu phải có ít nhất 8 ký tự,ít nhất 1 chữ hoa và 1 chữ',
        )
        .required('Không được để trống mật khẩu'),
})
const LoginForm = () => {
    const isFetching = useIsFetching()
    const isMutating = useIsMutating()
    const router = useRouter()
    const { login } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(LoginSchema),
    })

    const { mutate } = useMutation({
        mutationKey: ['login'],
        mutationFn: async (dataMutation: LoginData) => {
            const data = Account.login(dataMutation)
            return data
        },
        onSuccess: (data) => {
            if (data?.data.success) {
                reset()
                toast.success('Đăng nhập thành công')
                login(data.data)
                router.push('/')
            }
        },
        onError: (error, data, context) => {
            //@ts-ignore
            if (error.response) {
                //@ts-ignore
                toast.error(error?.response.data.msg)
            } else {
                toast.error('Đã có lỗi xảy ra ,vui lòng thử lại')
            }
        },
    })

    const onSubmit: SubmitHandler<LoginData> = (data) => {
        mutate({
            email: data.email,
            password: data.password,
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
                    <div className='w-full flex flex-col space-y-4'>
                        <div className='flex flex-col gap-2'>
                            <div className='grid w-full max-w-sm items-center gap-1.5'>
                                <label className='font-medium' htmlFor='email'>
                                    Email
                                </label>
                                <Input
                                    id='email'
                                    placeholder='Email'
                                    {...register('email')}
                                    autoComplete='off'
                                />
                            </div>
                            <p
                                className={twJoin(
                                    'text-[red] text-[14px]  ',
                                    errors?.email ? 'inline-block' : 'hidden',
                                )}
                            >
                                {errors && errors.email
                                    ? errors.email.message
                                    : null}
                            </p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='grid w-full max-w-sm items-center gap-1.5'>
                                <label
                                    className='font-medium'
                                    htmlFor='password'
                                >
                                    Mật khẩu
                                </label>
                                <Input
                                    id='password'
                                    placeholder='Mật khẩu'
                                    {...register('password')}
                                    type='password'
                                    autoComplete='off'
                                />
                            </div>
                            <p
                                className={twJoin(
                                    'text-[red] text-[14px] ',
                                    errors?.password
                                        ? 'inline-block'
                                        : 'hidden',
                                )}
                            >
                                {errors && errors.password
                                    ? errors.password.message
                                    : null}
                            </p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-2'></div>
                            <Link href={'/forgot_password'}>
                                <span className='text-[#6A5BCD] hover:text-[#4dc3ea] cursor-pointer'>
                                    Quên mật khẩu?
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col mt-[20px] space-y-4'>
                        <Button type='submit' className='w-full'>
                            Đăng nhập
                        </Button>
                        <div className='flex items-center justify-center w-full gap-2'>
                            <p className='text-[rgba(0,0,0,.5)]'>
                                Bạn chưa có tài khoản?
                            </p>
                            <Link href={'/register'}>
                                <span className='text-[#6A5BCD] hover:text-[#4dc3ea] cursor-pointer'>
                                    Đăng ký
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
            {isMutating + isFetching !== 0 && <Loader />}
        </>
    )
}

export default LoginForm
