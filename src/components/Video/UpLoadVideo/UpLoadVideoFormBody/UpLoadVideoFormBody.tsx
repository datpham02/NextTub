'use client'
import React, { useState } from 'react'
import VideoPlayer from '../../VideoPlayer'
import { BiImageAdd } from 'react-icons/bi'
import { MdFileUpload } from 'react-icons/md'
import { useFormContext } from 'react-hook-form'
import { twJoin } from 'tailwind-merge'
import { handlePosterSelect, roundingDurationVideo } from '~/utils/feature'
import UpLoadPosterField from './UpLoadPosterField'
import UpLoadVideoFormFooter from '../UpLoadVideoFormFooter'
import { ErrorMessage } from '@hookform/error-message'
import { v4 as uuidv4 } from 'uuid'
const UpLoadVideoFormBody = () => {
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext()
    const [videoFile, setVideoFile] = useState<
        { file: File; filePreview: string } | undefined
    >(undefined)
    const [poster, setPoster] = useState<
        {
            id: string
            img: File | string
            imgPreview: string
            select: boolean
        }[]
    >([])

    const handleSelectPoster = (indexSelect: number) => {
        const tempArrayPoster = [...poster]

        tempArrayPoster.forEach((posterData, index) => {
            if (indexSelect == index) {
                if (posterData.select) {
                    posterData.select = false
                    setValue('poster', null)
                } else {
                    posterData.select = true
                    setValue('poster', posterData.img)
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
    const getDurationVideo = (src: string) => {
        const video = document.createElement('video')
        video.setAttribute('src', src)

        document.body.appendChild(video)
        video.addEventListener('loadedmetadata', () => {
            console.log(roundingDurationVideo(video.duration) as string)
            setValue(
                'duration',
                roundingDurationVideo(video.duration) as string,
            )
            document.body.removeChild(video)
        })
        video.load()
    }
    if (!videoFile) {
        return (
            <div
                onDragOver={(e) => {
                    e.preventDefault()
                }}
                onDragLeave={(e) => {
                    e.preventDefault()
                }}
                onDrop={(e) => {
                    e.preventDefault()
                    const filePreview = URL.createObjectURL(
                        e.dataTransfer.files[0],
                    )
                    setVideoFile({
                        file: e.dataTransfer.files[0],
                        filePreview: filePreview,
                    })
                    setValue('video', e.dataTransfer.files[0])
                    getDurationVideo(filePreview)
                }}
                className='bg-[#fff] flex flex-col gap-6 justify-center items-center w-[960px] h-[500px]'
            >
                <MdFileUpload className='w-[60px] h-[60px] text-[rgba(144,144,144,1)]' />
                <div className='text-center'>
                    <div className='text-[14px] mb-[50px]'>
                        Kéo và thả tệp video để tải lên
                    </div>
                    <label htmlFor='video_upload'>
                        <span className='bg-[#065fd4] px-[15px] py-[8px] text-[#fff] font-bold text-[17px] rounded-sm '>
                            Chọn tệp
                        </span>
                    </label>

                    <input
                        id='video_upload'
                        type='file'
                        className='hidden'
                        onChange={(e: any) => {
                            const filePreview = URL.createObjectURL(
                                e.target.files[0],
                            )
                            setVideoFile({
                                file: e.target.files[0],
                                filePreview: filePreview,
                            })
                            setValue('video', e.target.files[0])
                            getDurationVideo(filePreview)
                        }}
                    />
                </div>
            </div>
        )
    }

    if (videoFile) {
        return (
            <div className='flex flex-col'>
                <div className='bg-[#fff] w-[960px] h-[500px] overflow-y-scroll pt-[50px] pb-[100px]'>
                    <div className='grid grid-cols-12 '>
                        <div className='col-span-8 px-[24px] flex flex-col gap-4'>
                            <div className='relative'>
                                <span
                                    className={twJoin(
                                        'absolute text-[13px] top-[10px] left-[10px] ',
                                        errors.title
                                            ? 'text-[red] '
                                            : 'text-[#606060] ',
                                    )}
                                >
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
                                        errors.description ? 'red' : '#cccccc',
                                    )}
                                    placeholder='Giới thiệu video của bạn cho người xem'
                                />
                            </div>
                            <UpLoadPosterField
                                poster={poster}
                                handleSelectPoster={handleSelectPoster}
                                handleUpLoadPoster={handleUpLoadPoster}
                            />
                        </div>
                        <div className='col-span-4 flex flex-col gap-4 pr-[24px]'>
                            <div className='flex flex-col rounded-sm bg-[#f9f9f9]'>
                                <input
                                    className='hidden'
                                    {...register('video', {
                                        required: true,
                                    })}
                                />
                                <input
                                    className='hidden'
                                    {...register('duration', {
                                        required: true,
                                    })}
                                />
                                <VideoPlayer
                                    src={videoFile.filePreview}
                                    poster={
                                        handlePosterSelect(poster)
                                            ?.imgPreview as string
                                    }
                                    alt={videoFile.file.name}
                                    size='minimize'
                                />
                                <div className='flex flex-col p-[15px]'>
                                    <div className='flex flex-col'>
                                        <span className='text-[13px] text-[#606060] '>
                                            Tên tệp
                                        </span>
                                        <span className='text-[15px]'>
                                            {videoFile.file.name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <UpLoadVideoFormFooter />
            </div>
        )
    }
}

export default UpLoadVideoFormBody
