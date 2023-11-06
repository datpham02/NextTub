import React from 'react'
import { twJoin } from 'tailwind-merge'
import { SideBarItemProps } from '~/utils/interface'

const SideBarItem = ({
    icon,
    name,
    active,
    type = 'default',
}: SideBarItemProps) => {
    if (type == 'default') {
        return (
            <div
                className={twJoin(
                    'flex items-center justify-start py-[8px] px-[12px] gap-4 cursor-pointer',
                    active ? 'rounded-lg bg-[rgba(0,0,0,0.05)]' : '',
                )}
            >
                {icon}
                <span className='text-[14px] font-[400]'>{name}</span>
            </div>
        )
    }

    if (type == 'collapse') {
        return (
            <div
                className={twJoin(
                    'flex flex-col items-center gap-2 pt-[16px] pb-[12px] cursor-pointer',
                    active ? 'rounded-lg bg-[rgba(0,0,0,0.05)]' : '',
                )}
            >
                {icon}
                <span className='text-[10px] font-[400]'>Trang chủ</span>
            </div>
        )
    }
}

export default SideBarItem
