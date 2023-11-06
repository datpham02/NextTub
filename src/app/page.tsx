'use client'
import { useState } from 'react'
import { DefaultVideo, Header, SideBar } from '~/components'
import { ScrollArea } from '~/components/ScrollArena'
export default function Home() {
    const [hideSideBar, setHideSideBar] = useState<boolean>(false)

    const handleHideSideBar = () => {
        setHideSideBar(!hideSideBar)
    }
    return (
        <>
            <div>
                <Header handleHideSideBar={handleHideSideBar} />
                <div className='flex'>
                    <SideBar
                        hideSideBar={hideSideBar}
                        setHideSideBar={setHideSideBar}
                        handleHideSideBar={handleHideSideBar}
                    />
                    <ScrollArea className='grow h-screen px-[30px]'>
                        <div className='grid grid-cols-1  md:grid-cols-2 2xl:grid-cols-3 gap-2'>
                            <DefaultVideo />
                            <DefaultVideo />
                            <DefaultVideo />
                            <DefaultVideo />
                            <DefaultVideo />
                            <DefaultVideo />
                            <DefaultVideo />
                            <DefaultVideo />
                            <DefaultVideo />
                            <DefaultVideo />
                            <DefaultVideo />
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </>
    )
}
