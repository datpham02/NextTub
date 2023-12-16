'use client'
import React, { useState } from 'react'
import { Header, HomeSideBar } from '~/components'
import QueryClientProviderCustome from '~/provider/QueryClientProviderCustome'
import { layoutProps } from '~/utils/Interface/Layout'

const layout = ({ children }: layoutProps) => {
    const [hideSideBar, setHideSideBar] = useState<boolean>(false)

    const handleHideSideBar = () => {
        setHideSideBar(!hideSideBar)
    }
    return (
        <QueryClientProviderCustome>
            <div>
                <Header handleHideSideBar={handleHideSideBar} />
                <div className='flex'>
                    <HomeSideBar
                        hideSideBar={hideSideBar}
                        setHideSideBar={setHideSideBar}
                        handleHideSideBar={handleHideSideBar}
                    />

                    {children}
                </div>
            </div>
        </QueryClientProviderCustome>
    )
}

export default layout
