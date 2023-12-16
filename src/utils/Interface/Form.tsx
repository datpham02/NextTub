export interface UpLoadVideoFormHeaderProps {
    name: string
}

export interface UpLoadVideoDataForm {
    video: File
    poster: File | ''
    title: string
    description?: string
    duration: string
}
export interface UpDateVideoDataForm {
    poster: File | ''
    title: string
    description?: string
}
export interface ChangePassWordProps {
    token: string
}
export interface ChangePasswordFormData {
    new_password: string
    confirm_password: string
}
export interface ForgotPasswordFormData {
    email: string
}
export interface CommentFormData {
    content: string
}
