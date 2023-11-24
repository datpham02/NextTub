'use client'
import React from 'react'
import { ChannelHeader } from '~/components'
import ChannelSideBar from '~/components/SideBar/ChannelSideBar'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <ChannelHeader />
            <div className='flex'>
                <ChannelSideBar />
                {children}
            </div>
        </div>
    )
}

export default layout
