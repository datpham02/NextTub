'use client'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ImUser } from 'react-icons/im'
import { LoginData } from '~/utils/interface'
import { BiSolidLock } from 'react-icons/bi'
import { Button, Input } from '~/components'
import { ChangeEvent, useState } from 'react'
import { Checkbox } from '~/components/CheckBox'
import Link from 'next/link'
const page = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: '',
    })

    const handleOnChangeLoginData = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }
    const onSubmit = async () => {
        console.log(loginData)
        // if (isLoading) return
        // setIsLoading(true)
        // const toastLoginId = toast.loading('Đang đăng nhập . . .')
        // const result = await user.login(loginData.email, loginData.password)
        // if (result.success) {
        //     toast.remove(toastLoginId)
        //     toast.success('Đăng nhập thành công', {
        //         duration: 1500,
        //     })
        // } else {
        //     toast.remove(toastLoginId)
        //     toast.error(result.message, {
        //         duration: 1500,
        //     })
        // }
        // setIsLoading(false)
    }
    return (
        <div className='bg-[#fff] flex flex-col items-center justify-center  w-full h-screen'>
            <div className='bg-[#fff] w-[450px] p-[40px] flex flex-col border-[1px] rounded-md shadow-md'>
                <Link href={'/'}>
                    <div className='text-[#6A5BCD] text-4xl font-extrabold tracking-tight lg:text-5xl mb-[30px] text-center cursor-pointer'>
                        NextTub
                    </div>
                </Link>
                <div className='w-full flex flex-col space-y-4'>
                    <Input
                        inputName='Tài khoản'
                        icon={
                            <ImUser className='w-[25px] h-[25px] text-[rgba(0,0,0,0.5)]' />
                        }
                        value={loginData.email}
                        name='email'
                        onChange={handleOnChangeLoginData}
                        placeHolder='Email'
                    />
                    <Input
                        inputName='Mật khẩu'
                        icon={
                            <BiSolidLock className='w-[25px] h-[25px] text-[rgba(0,0,0,0.5)]' />
                        }
                        value={loginData.password}
                        name='password'
                        onChange={handleOnChangeLoginData}
                        placeHolder='Mật khẩu'
                    />
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2'>
                            <Checkbox
                                id='remember_account'
                                className='border-[#939290]'
                            />
                            <label htmlFor='remember_account'>
                                <span className='text-[rgba(0,0,0,.5)] cursor-pointer'>
                                    Nhớ mật khẩu
                                </span>
                            </label>
                        </div>
                        <span className='text-[#6A5BCD] hover:text-[#4dc3ea] cursor-pointer'>
                            Quên mật khẩu?
                        </span>
                    </div>
                </div>
                <div className='flex flex-col mt-[50px] space-y-4'>
                    <Button onClick={onSubmit} className='w-full'>
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
        </div>
    )
}

export default page
