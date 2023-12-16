'use client'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Channel, Video } from '~/services'
import { UpDateVideoData } from '~/utils/Interface/Channel'
import toast from 'react-hot-toast'
import {
    handlePosterSelect,
    handleUpLoadFileToCloudinary,
} from '~/utils/feature'
import { ImgFileUpLoadResponse } from '~/utils/Interface/Cloudinay'
import { useAuth } from '~/store/Auth'
import { Loader, VideoPlayer } from '~/components'
import { ErrorMessage } from '@hookform/error-message'
import { twJoin } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'
import { BiImageAdd } from 'react-icons/bi'
import { PageProps } from '~/utils/Interface/Page'
import { useRouter } from 'next/navigation'
import { TfiClose } from 'react-icons/tfi'
const page = ({ params }: PageProps) => {
    const router = useRouter()
    const { data: video, isSuccess } = useQuery({
        queryKey: ['get_video_info', Number(params?.slug)],
        queryFn: async () => {
            const data = await Video.get(params?.slug)
            return data.data.video
        },
        enabled: params?.slug ? true : false,
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { account } = useAuth()

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
    } = useForm<UpDateVideoData>()
    const [poster, setPoster] = useState<
        {
            id: string
            img: File | string
            imgPreview: string
            select: boolean
        }[]
    >([])
    useEffect(() => {
        if (isSuccess) {
            setValue('title', video?.title),
                setValue('description', video?.description),
                setValue('poster', video?.poster)
            setValue('videoId', video?.id)
        }
    }, [isSuccess])
    const handleSelectPoster = (indexSelect: number) => {
        const tempArrayPoster = [...poster]

        tempArrayPoster.forEach((posterData, index) => {
            if (indexSelect == index) {
                if (posterData.select) {
                    posterData.select = false
                    setValue('poster', '')
                } else {
                    posterData.select = true
                    setValue('poster', posterData.img as any)
                }
            } else {
                posterData.select = false
            }
        })

        setPoster(tempArrayPoster)
    }
    const handleUpLoadPoster = (e: any) => {
        const id = uuidv4()
        if (poster.length > 1) {
            const tempPosterArray = [...poster]
            const posterRemove = tempPosterArray.shift()
            URL.revokeObjectURL(posterRemove?.imgPreview as string)
            const imgPreview = URL.createObjectURL(e.target.files[0])
            setPoster([
                ...tempPosterArray,
                {
                    id: id,
                    img: e.target.files[0],
                    imgPreview: imgPreview,
                    select: false,
                },
            ])
            e.target.value = null
            return
        }
        const imgPreview = URL.createObjectURL(e.target.files[0])
        setPoster([
            ...poster,
            {
                id: id,
                img: e.target.files[0],
                imgPreview: imgPreview,
                select: false,
            },
        ])
        e.target.value = null
    }
    const { mutate } = useMutation({
        mutationKey: ['update_video'],
        mutationFn: async (dataMutation: UpDateVideoData) => {
            const data = await Channel.updateVideo(dataMutation)
            return data
        },
        onSuccess: (data) => {
            if (data?.data.success) {
                reset()
                setIsLoading(false)
                toast.success('Cập nhập video lên thành công')
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

    const onSubmit: SubmitHandler<UpDateVideoData> = async (data) => {
        setIsLoading(true)

        if (data.poster != video?.poster) {
            const posterUrl: ImgFileUpLoadResponse =
                await handleUpLoadFileToCloudinary(data.poster as any, 'image')
            if (!posterUrl) {
                toast.error(
                    'Tải ảnh lên thất bại, đã có lỗi xảy ra vui lòng thử lại',
                )
                return
            }

            mutate({
                title: data.title,
                poster: posterUrl?.url ?? '',
                description: data?.description ?? '',
                videoId: video?.id as any,
            })
            return
        }
        mutate({
            title: data.title,
            description: data?.description ?? '',
            videoId: video?.id as any,
        })
    }
    const handleCloseForm = () => {
        router.push(`/channel/${account?.channel?.id}/content`)
    }
    return (
        <>
            {isSuccess && (
                <form
                    className='fixed inset-0 bg-[rgba(0,0,0,0.5)] flex flex-col justify-center items-center'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='bg-[#fff] w-[960px] flex items-center justify-between p-[15px] rounded-t-md border-b-[1px]'>
                        <span className='font-medium text-[18px]'>
                            Cập nhập video
                        </span>
                        <TfiClose
                            onClick={handleCloseForm}
                            className='w-[20px] h-[20px] text-[rgba(144,144,144,1)] cursor-pointer'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <div className='bg-[#fff] w-[960px] h-[500px] overflow-y-scroll pt-[50px] pb-[100px]'>
                            <div className='grid grid-cols-12 '>
                                <div className='col-span-8 px-[24px] flex flex-col gap-4'>
                                    <div className='relative'>
                                        <span className='absolute text-[13px] top-[10px] left-[10px] '>
                                            {'Tiêu đề (bắt buộc)'}
                                        </span>
                                        <textarea
                                            {...register('title', {
                                                required: {
                                                    value: true,
                                                    message:
                                                        'Không được để trống tiêu đề',
                                                },
                                            })}
                                            style={{
                                                resize: 'none',
                                            }}
                                            rows={1}
                                            className={twJoin(
                                                'w-full px-[10px] pt-[30px] pb-[25px] placeholder:font-medium placeholder:text-[14px] rounded-[5px] border-[1px] outline-none',
                                                errors.title
                                                    ? 'border-[red] placeholder:text-[red] '
                                                    : 'border-[#cccccc] ',
                                            )}
                                            placeholder='Thêm tiêu đề mô tả video của bạn'
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name='title'
                                            render={({ message }) => (
                                                <p className='text-[red] text-[14px]'>
                                                    {message}
                                                </p>
                                            )}
                                        />
                                    </div>
                                    <div className='relative'>
                                        <span className='absolute text-[13px] top-[10px] left-[10px] text-[#606060]'>
                                            {'Mô tả'}
                                        </span>
                                        <textarea
                                            style={{
                                                resize: 'none',
                                            }}
                                            {...register('description', {
                                                required: true,
                                            })}
                                            rows={5}
                                            className={twJoin(
                                                'w-full px-[10px] pt-[30px] pb-[25px] placeholder:font-medium placeholder:text-[14px] rounded-[5px] border-[1px] border-[#cccccc] outline-none',
                                                errors.description
                                                    ? 'red'
                                                    : '#cccccc',
                                            )}
                                            placeholder='Giới thiệu video của bạn cho người xem'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <span className='font-medium'>
                                            Hình thu nhỏ
                                        </span>
                                        <span className='text-[14px] text-[#606060]'>
                                            Chọn hoặc tải một hình ảnh lên để
                                            thể hiện nội dung trong video của
                                            bạn. Hình thu nhỏ hấp dẫn sẽ làm nổi
                                            bật video của bạn và thu hút người
                                            xem.
                                        </span>
                                        <div className='flex items-center gap-2'>
                                            <div className='cursor-pointer flex items-center justify-center w-[153px] h-[82px] border-dashed border-[1px] border-[#e5e5e5] rounded-sm'>
                                                <label htmlFor='poster_upload'>
                                                    <div className='flex flex-col justify-center items-center cursor-pointer'>
                                                        <BiImageAdd className='w-[25px] h-[25px] text-[#606060]' />
                                                        <span className='text-[#c1bcbc] text-[14px]'>
                                                            Tải hình thu nhỏ lên
                                                        </span>
                                                    </div>
                                                </label>
                                                <input
                                                    id='poster_upload'
                                                    type={'file'}
                                                    className='hidden'
                                                    onChange={(e) => {
                                                        handleUpLoadPoster(e)
                                                    }}
                                                />
                                                <input
                                                    className='hidden'
                                                    {...register('poster', {
                                                        required: true,
                                                    })}
                                                />
                                            </div>

                                            {poster.map((posterData, index) => {
                                                if (posterData?.select) {
                                                    return (
                                                        <div
                                                            key={posterData?.id}
                                                            onClick={() => {
                                                                handleSelectPoster(
                                                                    index,
                                                                )
                                                            }}
                                                            className='relative w-[153px] h-[82px] border-[2px] border-[black] rounded-[5px]'
                                                        >
                                                            <img
                                                                className='w-full h-full rounded-sm cursor-pointer '
                                                                src={
                                                                    posterData?.imgPreview
                                                                }
                                                            />
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div
                                                            key={posterData?.id}
                                                            onClick={() => {
                                                                handleSelectPoster(
                                                                    index,
                                                                )
                                                            }}
                                                            className='relative w-[153px] h-[82px]'
                                                        >
                                                            <img
                                                                className='w-full h-full rounded-sm cursor-pointer '
                                                                src={
                                                                    posterData?.imgPreview
                                                                }
                                                            />
                                                            <div className='absolute top-0 w-full h-full bg-[rgba(255,255,255,0.5)]'></div>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-4 flex flex-col gap-4 pr-[24px]'>
                                    <div className='flex flex-col rounded-sm bg-[#f9f9f9]'>
                                        <VideoPlayer
                                            src={video?.src}
                                            poster={
                                                (handlePosterSelect(poster)
                                                    ?.imgPreview as string) ??
                                                video?.poster
                                            }
                                            alt={video?.title}
                                            size='minimize'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type='submit'
                            className='flex items-center justify-end bg-[#fff] w-[960px] py-[8px] border-t-[1px] px-[15px] cursor-pointer'
                        >
                            <span className='bg-[#065fd4] px-[15px] py-[8px] text-[#fff] font-medium text-[17px] rounded-sm flex items-center justify-center'>
                                Tải lên
                            </span>
                        </button>
                    </div>
                </form>
            )}
            {isLoading && <Loader />}
        </>
    )
}

export default page
