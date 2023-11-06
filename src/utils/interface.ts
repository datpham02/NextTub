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
export interface SideBarProps {
    handleHideSideBar: () => void
    hideSideBar: boolean
    setHideSideBar: React.Dispatch<React.SetStateAction<boolean>>
}
