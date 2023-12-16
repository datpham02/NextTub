import React from 'react'
import QueryClientProviderCustome from '~/provider/QueryClientProviderCustome'
import { layoutProps } from '~/utils/Interface/Layout'

const layout = ({ children }: layoutProps) => {
    return <QueryClientProviderCustome>{children}</QueryClientProviderCustome>
}

export default layout
