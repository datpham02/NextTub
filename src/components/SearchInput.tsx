'use client'
import React, { useRef, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { RxCountdownTimer } from 'react-icons/rx'
import Tippy from '@tippyjs/react/headless'
import TippyHover from '@tippyjs/react'
const SearchInput = () => {
    const inputSearchRef = useRef<HTMLInputElement>(null)
    const rightInputSearchRefIcon = useRef<HTMLSpanElement>(null)
    const [suggestionSearch, setSuggestionSearch] = useState<boolean>(false)

    const handleInputSearchOnFocus = () => {
        inputSearchRef?.current?.classList.remove('pl-[15px]')
        inputSearchRef?.current?.classList.add('pl-[50px]')
        inputSearchRef?.current?.classList.remove('ml-[56px]')
        rightInputSearchRefIcon?.current?.classList.remove('hidden')
        setSuggestionSearch(true)
    }

    const handleInputSearchOnBlur = () => {
        inputSearchRef?.current?.classList.add('pl-[15px]')
        inputSearchRef?.current?.classList.remove('pl-[50px]')
        inputSearchRef?.current?.classList.add('ml-[56px]')
        rightInputSearchRefIcon.current?.classList.add('hidden')
    }
    return (
        <div className='w-full flex items-center justify-center z-[2] '>
            <div className='relative flex items-center w-full  lg:w-[530px] 2xl:w-[600px]'>
                <span
                    ref={rightInputSearchRefIcon}
                    className='absolute left-[15px] hidden'
                >
                    <IoIosSearch className='w-[25px] h-[25px]' />
                </span>
                <Tippy
                    interactive
                    visible={suggestionSearch}
                    placement='bottom'
                    onClickOutside={() => {
                        setSuggestionSearch(false)
                    }}
                    render={(attrs) => (
                        <div
                            {...attrs}
                            className='2xl:w-[550px]  lg:w-[500px] md:w-[700px] w-[500px] bg-[#fff] rounded-md py-[15px] shadow-md'
                        >
                            <div className='w-full flex justify-between items-center px-[25px] hover:bg-[rgba(0,0,0,0.1)] py-[5px]'>
                                <div className='flex items-center gap-4 cursor-default'>
                                    <RxCountdownTimer className='w-[20px] h-[20px]' />
                                    <span className='font-semibold'>
                                        tìm kiếm nè
                                    </span>
                                </div>
                                <span className='text-[#4834d4] hover:underline hover:decoration-[#4834d4] text-[14px] cursor-pointer'>
                                    Xóa
                                </span>
                            </div>
                        </div>
                    )}
                >
                    <input
                        ref={inputSearchRef}
                        type={'search'}
                        onFocus={handleInputSearchOnFocus}
                        onBlur={handleInputSearchOnBlur}
                        placeholder='Tìm kiếm'
                        className='flex-1 ml-[56px] h-full w-full py-[10px] pl-[15px] rounded-l-full items-center outline-none  border  shadow-inner'
                    />
                </Tippy>
            </div>
            <TippyHover
                content={
                    <div className='bg-[#616161] text-[#fff] text-[13px] flex items-center justify-center p-[5px] rounded-sm'>
                        Tìm kiếm
                    </div>
                }
            >
                <button className='h-full flex justify-center  border border-solid border-l-0 rounded-r-full py-[8px] px-[10px] xl:px-[15px] 2xl:px-[20px] bg-[#f8f8f8] hover:bg-[#f0f0f0]'>
                    <IoIosSearch className='w-[25px] h-[25px]' />
                </button>
            </TippyHover>
        </div>
    )
}

export default SearchInput
