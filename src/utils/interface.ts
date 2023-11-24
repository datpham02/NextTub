export interface HeaderProps {
    handleHideSideBar: () => void
}
export interface InputProps {
    icon: React.ReactNode
    name: string
    value: string
    inputName: string
    className?: string
    onChange: any
    placeHolder: string
}
export interface ButtonProps {
    children: React.ReactNode
    className?: string
    onClick?: any
}
export interface LoginData {
    email: string
    password: string
}
export interface SideBarItemProps {
    icon: React.ReactNode
    name: string
    active: boolean
    type?: 'default' | 'collapse'
}
export interface HomeSideBarProps {
    handleHideSideBar: () => void
    hideSideBar: boolean
    setHideSideBar: React.Dispatch<React.SetStateAction<boolean>>
}
export interface WatchSideBarProps {
    handleHideSideBar: () => void
    hideSideBar: boolean
    setHideSideBar: React.Dispatch<React.SetStateAction<boolean>>
}
export interface VideoPlayerProps {
    src: string
    poster: string
    alt: string
    size?: 'normal' | 'minimize'
}
export interface UpLoadPosterFieldProps {
    poster: { img: File | string; imgPreview: string; select: boolean }[]
    handleUpLoadPoster: (e: any) => void
    handleSelectPoster: (index: number) => void
}
export interface VideoPlayerLayoutProps {
    size: 'normal' | 'minimize'
}
