'use client'
import React, { useState } from 'react'
import { Header, WatchSideBar } from '~/components'

const layout = ({ children }: { children: React.ReactNode }) => {
    const [hideSideBar, setHideSideBar] = useState<boolean>(false)

    const handleHideSideBar = () => {
        setHideSideBar(!hideSideBar)
    }
    return (
        <section>
            <Header handleHideSideBar={handleHideSideBar} />
            <WatchSideBar
                hideSideBar={hideSideBar}
                setHideSideBar={setHideSideBar}
                handleHideSideBar={handleHideSideBar}
            />
            {children}
        </section>
    )
}

export default layout
