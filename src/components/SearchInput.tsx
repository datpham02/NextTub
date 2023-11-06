'use client'
import React, { useEffect, useRef } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { RxCountdownTimer } from 'react-icons/rx'

const SearchInput = () => {
    const inputSearchRef = useRef<HTMLInputElement>(null)
    const rightInputSearchRefIcon = useRef<HTMLSpanElement>(null)
    const suggesstionSearchRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        window.addEventListener('click', () => {
            if (document.activeElement == inputSearchRef.current) {
                inputSearchRef?.current?.classList.remove('pl-[15px]')
                inputSearchRef?.current?.classList.add('pl-[50px]')
                inputSearchRef?.current?.classList.remove('ml-[56px]')
                rightInputSearchRefIcon?.current?.classList.remove('hidden')
                suggesstionSearchRef?.current?.classList.remove('hidden')
            } else {
                if (inputSearchRef?.current?.classList.contains('pl-[50px]')) {
                    inputSearchRef?.current?.classList.add('pl-[15px]')
                    inputSearchRef?.current?.classList.remove('pl-[50px]')
                    inputSearchRef?.current?.classList.add('ml-[56px]')
                    rightInputSearchRefIcon.current?.classList.add('hidden')
                    suggesstionSearchRef?.current?.classList.add('hidden')
                }
            }
        })
    }, [])
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='relative flex items-center w-[250px] md:w-[380px] lg:w-[530px] 2xl:w-[600px]'>
                <span
                    ref={rightInputSearchRefIcon}
                    className='absolute left-[15px] hidden'
                >
                    <IoIosSearch className='w-[25px] h-[25px]' />
                </span>
                <input
                    ref={inputSearchRef}
                    type={'search'}
                    placeholder='Tìm kiếm'
                    className='flex-1 ml-[56px] h-full w-full py-[10px] pl-[15px] rounded-l-full items-center outline-none  border  shadow-inner'
                />
                <div
                    ref={suggesstionSearchRef}
                    className='absolute hidden w-full bg-[#fff] top-[50px] rounded-md py-[15px] shadow-md'
                >
                    <div className='flex justify-between items-center px-[25px] hover:bg-[rgba(0,0,0,0.1)] py-[5px]'>
                        <div className='flex items-center gap-4 cursor-default'>
                            <RxCountdownTimer className='w-[20px] h-[20px]' />
                            <span className='font-semibold'>tìm kiếm nè</span>
                        </div>
                        <span className='text-[#4834d4] hover:underline hover:decoration-[#4834d4] text-[14px] cursor-pointer'>
                            Xóa
                        </span>
                    </div>
                </div>
            </div>
            <button className='relative h-full group flex justify-center  border border-solid border-l-0 rounded-r-full py-[8px] px-[10px] xl:px-[15px] 2xl:px-[20px] bg-[#f8f8f8] hover:bg-[#f0f0f0]'>
                <IoIosSearch className='w-[25px] h-[25px]' />
                <span className='absolute hidden group-hover:block top-[50px] bg-[#616161] text-center  w-[70px] text-[#fff] rounded-[4px] p-[8px] text-[12px] leading-[12px] font-normal'>
                    Tìm kiếm
                </span>
            </button>
        </div>
    )
}

export default SearchInput
