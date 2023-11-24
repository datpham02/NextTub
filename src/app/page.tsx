'use client'
import { useState } from 'react'
import { DefaultVideoItem, Header, HomeSideBar } from '~/components'
import { ScrollArea } from '~/components/ScrollArea'
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
                    <HomeSideBar
                        hideSideBar={hideSideBar}
                        setHideSideBar={setHideSideBar}
                        handleHideSideBar={handleHideSideBar}
                    />
                    <ScrollArea className='grow h-screen px-[30px]'>
                        <div className=' mb-[150px] grid grid-cols-1  md:grid-cols-2 2xl:grid-cols-3 gap-2'>
                            <DefaultVideoItem />
                            <DefaultVideoItem />
                            <DefaultVideoItem />
                            <DefaultVideoItem />
                            <DefaultVideoItem />
                            <DefaultVideoItem />
                            <DefaultVideoItem />
                            <DefaultVideoItem />
                            <DefaultVideoItem />
                            <DefaultVideoItem />
                            <DefaultVideoItem />
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </>
    )
}
