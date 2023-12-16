import React from 'react'
import UpLoadVideo from '~/components/Video/UpLoadVideo/UpLoadVideoForm'

import { cookies } from 'next/headers'
import { Auth } from '~/services'
import { notFound } from 'next/navigation'
const page = async () => {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')

    if (accessToken?.value) {
        try {
            const verifyToken = await Auth.verfiy({
                token: accessToken.value as string,
            })

            if (verifyToken.data.success) {
                return <UpLoadVideo />
            }
            notFound()
        } catch (error) {
            console.log(error)
            notFound()
        }
    }

    notFound()
}

export default page
