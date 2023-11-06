import { ButtonProps } from '~/utils/interface'
import './btnCss.css'
import { twMerge } from 'tailwind-merge'

const Button = ({ className, onClick, children }: ButtonProps) => {
    return (
        <button onClick={onClick} className={twMerge('pushable', className)}>
            <span className='shadow'></span>
            <span className='edge'></span>
            <span className='front'>{children}</span>
        </button>
    )
}

export default Button
