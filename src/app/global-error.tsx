'use client'
import { ErrorPageProps } from '~/utils/Interface/Page'

export default function Error({ error, reset }: ErrorPageProps) {
    return (
        <div className='w-screen h-screen overflow-hidden bg-[#94C1C7] flex justify-center items-center'>
            <img
                src='/access/not-found.jpg'
                className='w-full h-full object-none'
            />
        </div>
    )
}
