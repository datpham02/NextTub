'use client'
import { InputProps } from '~/utils/interface'
import { useRef } from 'react'

import { twMerge } from 'tailwind-merge'

const Input = ({
    icon,
    name,
    value,
    inputName,
    className,
    onChange,
    placeHolder,
}: InputProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const handleOnInputNameClick = () => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus()
        }
    }
    return (
        <div className='relative flex flex-col space-y-2'>
            <span
                onClick={handleOnInputNameClick}
                className='text-[#9E9D9C] text-lg font-semibold cursor-pointer'
            >
                {inputName}
            </span>
            <div className='relative flex items-center'>
                <div className='absolute left-[8px]'>{icon}</div>
                <input
                    ref={inputRef}
                    className={twMerge(
                        'py-[8px] pl-[40px] rounded-[3px] w-full outline-none border-solid border-[0.5px] border-[rgba(0,0,0,0.1)] text-[#9E9D9C]',
                        className,
                    )}
                    value={value}
                    name={name}
                    onChange={onChange}
                    placeholder={placeHolder}
                />
            </div>
        </div>
    )
}

export default Input
