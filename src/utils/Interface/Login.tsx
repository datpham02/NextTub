export interface LoginData {
    email: string
    password: string
}

export interface LoginResponseData {
    accessToken: string
    email: string
    channel: {
        id: number
        avatar: string
        name: string
    }
    msg: string
    success: boolean
}
export interface Account {
    id: number
    email: string
    channel: {
        id: number
        avatar: string
        name: string
    }
}
