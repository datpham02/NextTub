import * as Tooltip from '@radix-ui/react-tooltip'
import { Controls, Gesture } from '@vidstack/react'

import * as Buttons from './VideoPlayerButtons'
import * as Sliders from './VideoPlayerSlider'
import { TimeGroup } from './VideoPlayerTime'
import { VideoPlayerLayoutProps } from '~/utils/interface'

const popupOffset = 30

export function VideoPlayerLayout({ size }: VideoPlayerLayoutProps) {
    return (
        <>
            <Gestures />

            <Controls.Root className='media-controls:opacity-100 absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity'>
                <Tooltip.Provider>
                    <div className='flex-1' />
                    <Controls.Group className='flex w-full items-center px-2'>
                        <Sliders.Time />
                    </Controls.Group>
                    <Controls.Group className='-mt-0.5 flex w-full items-center px-2 pb-2'>
                        <Buttons.Play
                            tooltipAlign='start'
                            tooltipOffset={popupOffset}
                        />
                        <Buttons.Mute tooltipOffset={popupOffset} />
                        <Sliders.Volume />
                        <TimeGroup />
                        <Buttons.SeekBack
                            tooltipAlign='start'
                            tooltipOffset={popupOffset}
                        />
                        <Buttons.SeekForward
                            tooltipAlign='start'
                            tooltipOffset={popupOffset}
                        />
                        <div className='flex-1' />
                        {size == 'normal' ? (
                            <>
                                <Buttons.PIP tooltipOffset={popupOffset} />
                                <Buttons.Fullscreen
                                    tooltipAlign='end'
                                    tooltipOffset={popupOffset}
                                />
                            </>
                        ) : null}
                    </Controls.Group>
                </Tooltip.Provider>
            </Controls.Root>
        </>
    )
}

function Gestures() {
    return (
        <>
            <Gesture
                className='absolute inset-0 z-0 block h-full w-full'
                event='pointerup'
                action='toggle:paused'
            />
            <Gesture
                className='absolute inset-0 z-0 block h-full w-full'
                event='dblpointerup'
                action='toggle:fullscreen'
            />
            <Gesture
                className='absolute left-0 top-0 z-10 block h-full w-1/5'
                event='dblpointerup'
                action='seek:-10'
            />
            <Gesture
                className='absolute right-0 top-0 z-10 block h-full w-1/5'
                event='dblpointerup'
                action='seek:10'
            />
        </>
    )
}
