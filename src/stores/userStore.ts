import create from 'zustand'
import { isNil } from 'lodash'

type UserState = {
    token: string | null
    email: string | null
    enableQuery: boolean

    setEmail: (email: string) => void
    setAuthParams: (params: { token: string | null }) => void
}

export const useUserStore = create<UserState>((set) => ({
    token: localStorage.getItem('jwt') || null,
    email: null,
    enableQuery: !isNil(localStorage.getItem('jwt')),
    setEmail: (email: string) => set({ email }),
    setAuthParams: ({ token }: { token: string | null }) => set({ token }),
}))
