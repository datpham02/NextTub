'use client'
import React, { useEffect, useRef, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { RxCountdownTimer } from 'react-icons/rx'
import Tippy from '@tippyjs/react/headless'
import TippyHover from '@tippyjs/react'
import UseDebounce from '~/utils/hook/UseDebounce'
import { useQuery } from '@tanstack/react-query'
import { Video } from '~/services'

import Link from 'next/link'
const SearchInput = () => {
    const [searcValue, setSearchValue] = useState<string>('')
    const debounceSearch = UseDebounce({ value: searcValue, delay: 500 })
    const inputSearchRef = useRef<HTMLInputElement>(null)
    const rightInputSearchRefIcon = useRef<HTMLSpanElement>(null)
    const [suggestionSearch, setSuggestionSearch] = useState<boolean>(false)
    const { data, isSuccess } = useQuery({
        queryKey: ['search', debounceSearch],
        queryFn: async () => {
            const data = await Video.search(debounceSearch)
            return data
        },
        enabled: debounceSearch != '' ? true : false,
    })
    const handleInputSearchOnFocus = () => {
        inputSearchRef?.current?.classList.remove('pl-[15px]')
        inputSearchRef?.current?.classList.add('pl-[50px]')
        inputSearchRef?.current?.classList.remove('ml-[56px]')
        rightInputSearchRefIcon?.current?.classList.remove('hidden')
    }

    const handleInputSearchOnBlur = () => {
        inputSearchRef?.current?.classList.add('pl-[15px]')
        inputSearchRef?.current?.classList.remove('pl-[50px]')
        inputSearchRef?.current?.classList.add('ml-[56px]')
        rightInputSearchRefIcon.current?.classList.add('hidden')
    }
    useEffect(() => {
        setSuggestionSearch(isSuccess)
    }, [isSuccess])
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
                                {data?.data.pageResult?.videos?.map((video) => (
                                    <Link
                                        onClick={() =>
                                            setSuggestionSearch(false)
                                        }
                                        href={`/watch/${video.id}`}
                                    >
                                        <span className='font-semibold'>
                                            {video.title}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                >
                    <input
                        ref={inputSearchRef}
                        type={'search'}
                        value={searcValue}
                        onChange={(e) => setSearchValue(e.target.value)}
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
