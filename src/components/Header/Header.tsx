'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { HiOutlineMenu } from 'react-icons/hi'
import { IoMdArrowBack } from 'react-icons/io'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { SearchInput } from '..'
import { HeaderProps } from '~/utils/interface'
import { IoIosSearch } from 'react-icons/io'
import CreateVideo from './CreateVideo'
import Notification from './Notification'
import AccountSetting from './AccountSetting'
import { useAuth } from '~/store/Auth'

const Header = ({ handleHideSideBar }: HeaderProps) => {
    const { account, logout, updateAccount } = useAuth()
    const [visibleSearch, setVisibleSearch] = useState<boolean>(false)
    const handleVisibleSearch = () => {
        setVisibleSearch(!visibleSearch)
    }

    useEffect(() => {
        updateAccount()
    }, [])

    return (
        <>
            {visibleSearch ? (
                <div className='flex items-center justify-center px-[25px] min-h-[80px] gap-2 z-[2] bg-[#fff]'>
                    <IoMdArrowBack
                        onClick={handleVisibleSearch}
                        className='w-[38px] h-[38px] rounded-full hover:bg-[rgba(0,0,0,0.1)]'
                    />
                    <SearchInput />
                </div>
            ) : (
                <div className='flex justify-between items-center px-[16px] min-h-[80px] z-[2] bg-[#fff]'>
                    <div className='flex items-center gap-3'>
                        <HiOutlineMenu
                            onClick={() => {
                                handleHideSideBar()
                            }}
                            className='inline-block w-[45px] h-[45px] rounded-full hover:bg-[rgba(0,0,0,0.1)] p-[8px]'
                        />
                        <Link href={'/'}>
                            <span className='text-[40px] font-bold text-[#6A5BCD]'>
                                NextTub
                            </span>
                        </Link>
                    </div>
                    <div className='lg:block hidden'>
                        <SearchInput />
                    </div>

                    <div className='flex justify-end gap-5 mr-[20px]'>
                        {account.id != 0 ? (
                            <div className='flex items-center gap-2'>
                                <IoIosSearch
                                    onClick={handleVisibleSearch}
                                    className='w-[30px] h-[30px] block lg:hidden'
                                />
                                <CreateVideo />
                                {/* <Notification /> */}
                                <AccountSetting />
                            </div>
                        ) : (
                            <div className='flex items-center gap-4'>
                                <IoIosSearch className='w-[30px] h-[30px] block lg:hidden' />
                                <Link href={'/login'}>
                                    <div className='items-center gap-2 border rounded-full p-[10px] cursor-pointer hover:bg-[#def1ff] flex'>
                                        <MdOutlineAccountCircle className='text-[25px] text-[#065fd4]' />
                                        <span className='text-[#065fd4]'>
                                            Đăng nhập
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
