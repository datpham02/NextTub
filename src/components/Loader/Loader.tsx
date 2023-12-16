import React from 'react'
import './loaderCss.css'
const Loader = () => {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,.5)] z-[]'>
            <div className='loader'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default Loader
