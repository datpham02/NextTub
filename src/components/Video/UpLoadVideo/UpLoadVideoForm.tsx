'use client'
import React from 'react'
import UpLoadVideoFormHeader from './UpLoadVideoFormHeader'
import UpLoadVideoFormBody from './UpLoadVideoFormBody/UpLoadVideoFormBody'

import { useForm, FormProvider, useFormContext } from 'react-hook-form'
const UpLoadVideo = () => {
    const methods = useForm()
    const onSubmit = (data: any) => console.log(data)
    return (
        <FormProvider {...methods}>
            <form
                className='fixed inset-0 bg-[rgba(0,0,0,0.5)] flex flex-col justify-center items-center'
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <UpLoadVideoFormHeader />
                <UpLoadVideoFormBody />
            </form>
        </FormProvider>
    )
}

export default UpLoadVideo
