import React from 'react'
import { useFormContext } from 'react-hook-form'
import { BiImageAdd } from 'react-icons/bi'
import { UpLoadPosterFieldProps } from '~/utils/interface'

const UpLoadPosterField = ({
    poster,
    handleUpLoadPoster,
    handleSelectPoster,
}: UpLoadPosterFieldProps) => {
    const { register } = useFormContext()
    return (
        <div className='flex flex-col gap-2'>
            <span className='font-medium'>Hình thu nhỏ</span>
            <span className='text-[14px] text-[#606060]'>
                Chọn hoặc tải một hình ảnh lên để thể hiện nội dung trong video
                của bạn. Hình thu nhỏ hấp dẫn sẽ làm nổi bật video của bạn và
                thu hút người xem.
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
                    if (posterData.select) {
                        return (
                            <div
                                key={posterData.img.toString()}
                                className='relative w-[153px] h-[82px] border-[2px] border-[black] rounded-[5px]'
                            >
                                <img
                                    className='w-full h-full rounded-sm cursor-pointer '
                                    src={posterData.imgPreview}
                                />
                            </div>
                        )
                    } else {
                        return (
                            <div
                                key={posterData.img.toString()}
                                onClick={() => {
                                    handleSelectPoster(index)
                                }}
                                className='relative w-[153px] h-[82px]'
                            >
                                <img
                                    className='w-full h-full rounded-sm cursor-pointer '
                                    src={posterData.imgPreview}
                                />
                                <div className='absolute top-0 w-full h-full bg-[rgba(255,255,255,0.5)]'></div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default UpLoadPosterField
