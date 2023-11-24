'use client'
import React, { useState } from 'react'
import { ScrollArea } from '~/components/ScrollArea'
import { Header, HomeSideBar } from '~/components'

const layout = ({ children }: { children: React.ReactNode }) => {
    const [hideSideBar, setHideSideBar] = useState<boolean>(false)

    const handleHideSideBar = () => {
        setHideSideBar(!hideSideBar)
    }
    return (
        <div>
            <Header handleHideSideBar={handleHideSideBar} />
            <div className='flex'>
                <HomeSideBar
                    hideSideBar={hideSideBar}
                    setHideSideBar={setHideSideBar}
                    handleHideSideBar={handleHideSideBar}
                />
                <ScrollArea className='grow h-screen px-[30px]'>
                    {children}
                </ScrollArea>
            </div>
        </div>
    )
}

export default layout
