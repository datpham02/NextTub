import React from 'react'
import { ChangePasswordForm } from '~/components'
import { PageProps } from '~/utils/Interface/Page'
import { notFound } from 'next/navigation'
import { Auth } from '~/services'
const page = async ({ params, searchParams }: PageProps) => {
    const { token } = searchParams

    if (token) {
        try {
            const verifyToken = await Auth.verfiy({ token: token as string })

            if (verifyToken.data.success) {
                return <ChangePasswordForm token={token as string} />
            }
            notFound()
        } catch (error) {
            notFound()
        }
    }

    notFound()
}

export default page
