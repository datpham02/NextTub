'use client'
import { notFound } from 'next/navigation'
import React, { useEffect } from 'react'
import { ChannelHeader } from '~/components'
import ChannelSideBar from '~/components/SideBar/ChannelSideBar'
import QueryClientProviderCustome from '~/provider/QueryClientProviderCustome'
import { useAuth } from '~/store/Auth'

const layout = ({ children }: { children: React.ReactNode }) => {
    const { account } = useAuth()
    // useEffect(() => {
    //     if (account?.id != 0) {
    //         notFound()
    //     }
    // }, [account])
    return (
        <QueryClientProviderCustome>
            <div>
                <ChannelHeader />
                <div className='flex'>
                    <ChannelSideBar />
                    {children}
                </div>
            </div>
        </QueryClientProviderCustome>
    )
}

export default layout
