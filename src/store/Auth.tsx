import { create } from 'zustand'
import {
    LoginResponseData,
    Account as AccountType,
} from '~/utils/Interface/Login'
import jwt from 'jsonwebtoken'
import { setCookie, deleteCookie, getCookie } from 'cookies-next'
import { Account } from '~/services'

export interface accessToken {
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string
    Id: string
    exp: number
    iss: string
    aud: string
}
interface Auth {
    account: AccountType
    login: (data: LoginResponseData) => void
    logout: () => void
    updateAccount: () => void
}

const initState = {
    id: 0,
    email: '',
    channel: {
        id: 0,
        avatar: '',
        name: '',
    },
}
export const useAuth = create<Auth>((set) => ({
    account: initState,
    login: (account) =>
        set((state) => {
            let decode = jwt.decode(account.accessToken) as accessToken
            setCookie('accessToken', account.accessToken, {
                maxAge: decode.exp,
            })

            return {
                ...state,
                account: {
                    email: account.email,
                    id: Number(decode?.Id),
                    channel: account.channel,
                },
            }
        }),
    logout: () =>
        set((state) => {
            deleteCookie('accessToken')
            deleteCookie('refreshToken')

            return {
                ...state,
                account: {
                    ...initState,
                },
            }
        }),
    updateAccount: async () => {
        let accessToken = getCookie('accessToken')
        if (!accessToken) {
            return set((state) => state)
        }

        let decode = jwt.decode(accessToken) as accessToken
        const accountData = await Account.getInfo(decode.Id)

        return set((state) => ({
            ...state,
            account: { ...accountData.data.account },
        }))
    },
}))
