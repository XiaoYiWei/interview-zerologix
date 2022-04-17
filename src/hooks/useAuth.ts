import { useMutation, useQuery } from 'react-query'
import { apiInstance } from '../utils/axios'
import { useTransition } from 'react'
import { AxiosResponse } from 'axios'
import { useUserStore } from '../stores/userStore'
import { isNil } from 'lodash'

type UserInfoResponse = {
    email: string
}

export type LoginErrorResponse = {
    message: string
    name: 'Error'
    stack: string
    status_code: number
}

const useAuth = () => {
    const { token, setAuthParams, setEmail } = useUserStore()
    const [isPending, startTransition] = useTransition()

    const { isFetching, data } = useQuery<
        AxiosResponse<UserInfoResponse>,
        unknown,
        UserInfoResponse
    >(
        'user',
        () =>
            apiInstance.get('/me/user/info', {
                transformResponse: (data) => {
                    return JSON.parse(data)
                },
            }),
        {
            enabled: !isNil(token),
            suspense: true,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            select: (data) => data.data,
            onSuccess: (data) => {
                setEmail(data.email)
            },
        }
    )

    const loginMutation = useMutation(
        (param: { email: string; password: string }) => {
            const payload: Record<string, string | number> = {
                email: param.email,
                password: param.password,
            }
            return apiInstance
                .post<Response>(`/auth/login/email`, payload)
                .catch((e) => {
                    throw e.response
                })
        },
        {
            onSuccess: (data) => {
                const newToken = (data as any).data.auth.access_token
                window.localStorage.setItem('jwt', newToken)
                startTransition(() => {
                    setAuthParams({
                        token: newToken,
                    })
                })
            },
        }
    )

    const logoutMutation = useMutation(
        () => {
            return apiInstance.post<Response>(`/me/user/logout`)
        },
        {
            onSuccess: () => {
                localStorage.clear()
                startTransition(() => {
                    setAuthParams({ token: null })
                })
                //navigate(0)
            },
        }
    )
    return {
        loginMutation,
        isFetching,
        logoutMutation,
    }
}

export default useAuth
