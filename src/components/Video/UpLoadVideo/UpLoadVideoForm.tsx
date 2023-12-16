'use client'
import React, { useState } from 'react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Channel } from '~/services'
import { UpLoadVideoData } from '~/utils/Interface/Channel'
import UpLoadVideoFormHeader from './UpLoadVideoFormHeader'
import UpLoadVideoFormBody from './UpLoadVideoFormBody/UpLoadVideoFormBody'
import toast from 'react-hot-toast'
import { handleUpLoadFileToCloudinary } from '~/utils/feature'
import { UpLoadVideoDataForm } from '~/utils/Interface/Form'
import {
    ImgFileUpLoadResponse,
    VideoFileUpLoadResponse,
} from '~/utils/Interface/Cloudinay'
import { useAuth } from '~/store/Auth'
import { Loader } from '~/components'
import { useRouter } from 'next/navigation'

const UpLoadVideo = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { account } = useAuth()
    const { mutate } = useMutation({
        mutationKey: ['upload_video'],
        mutationFn: async (dataMutation: UpLoadVideoData) => {
            const data = await Channel.upLoadVideo(dataMutation)
            return data
        },
        onSuccess: (data) => {
            if (data?.data.success) {
                methods.reset()
                setIsLoading(false)
                toast.success('Tải video lên thành công')
                router.push(`/channel/${account?.channel?.id}/content`)
            }
        },
        onError: (data) => {
            setIsLoading(false)
            //@ts-ignore
            if (error.response) {
                toast.error(
                    //@ts-ignore
                    error?.response.data.msg ??
                        'Đã có lỗi xảy ra ,vui lòng thử lại',
                )
            } else {
                toast.error('Đã có lỗi xảy ra ,vui lòng thử lại')
            }
        },
    })
    const methods = useForm<UpLoadVideoDataForm>()

    const onSubmit: SubmitHandler<UpLoadVideoDataForm> = async (data) => {
        setIsLoading(true)

        if (data.poster && data.video) {
            const [srcVideo, posterUrl]: [
                VideoFileUpLoadResponse,
                ImgFileUpLoadResponse,
            ] = await Promise.all([
                handleUpLoadFileToCloudinary(data.video, 'video'),
                handleUpLoadFileToCloudinary(data.poster, 'image'),
            ])
            if (!(srcVideo && posterUrl)) {
                toast.error(
                    'Tải video lên thất bại, đã có lỗi xảy ra vui lòng thử lại',
                )
                return
            }

            mutate({
                src: srcVideo.url,
                title: data.title,
                channelOwnerId: account.channel.id,
                poster: posterUrl?.url ?? '',
                description: data?.description ?? '',
                duration: data.duration,
            })
        } else {
            const srcVideo = await handleUpLoadFileToCloudinary(
                data.video,
                'video',
            )
            if (!srcVideo) {
                toast.error(
                    'Tải video lên thất bại, đã có lỗi xảy ra vui lòng thử lại',
                )
                return
            }

            mutate({
                src: srcVideo,
                title: data.title,
                channelOwnerId: account.channel.id,
                poster: '',
                description: data?.description ?? '',
                duration: data.duration,
            })
        }
    }
    return (
        <>
            <FormProvider {...methods}>
                <form
                    className='fixed inset-0 bg-[rgba(0,0,0,0.5)] flex flex-col justify-center items-center'
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <UpLoadVideoFormHeader
                        name={methods.watch('video')?.name}
                    />
                    <UpLoadVideoFormBody />
                </form>
            </FormProvider>
            {isLoading && <Loader />}
        </>
    )
}

export default UpLoadVideo
