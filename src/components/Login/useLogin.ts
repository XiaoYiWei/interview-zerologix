import { useImmer } from 'use-immer'
import { useCallback, useMemo } from 'react'
import { OnChangeCallback } from '../TextBox'
import { isEmpty } from 'lodash'
import { validateEmail } from '../../utils/helper'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

type State = {
    isSubmitted: boolean
    email: string
    password: string
    emailErrorMessage: string
    passwordErrorMessage: string
}

function validateEmailInput(email: string) {
    let result = ''
    if (isEmpty(email)) {
        result = 'Email is required'
        return result
    }
    if (!validateEmail(email)) {
        result = 'Email is invalid'
        return result
    }
    return result
}

const useLogin = () => {
    const { loginMutation } = useAuth()
    const navigate = useNavigate()
    const [state, updateState] = useImmer<State>({
        isSubmitted: false,
        password: 'A123456',
        email: 'yuntest@mailinator.com',
        emailErrorMessage: '',
        passwordErrorMessage: '',
    })
    const handleEmailChanged = useCallback<OnChangeCallback>(
        (e) =>
            updateState((draft) => {
                draft.email = e.target.value
            }),
        [updateState]
    )
    const handlePasswordChanged = useCallback<OnChangeCallback>(
        (e) =>
            updateState((draft) => {
                draft.password = e.target.value
            }),
        [updateState]
    )

    const handleSubmit = useCallback(
        (event: React.SyntheticEvent<HTMLFormElement>) => {
            event.preventDefault()
            event.stopPropagation()
            updateState((draft) => {
                draft.isSubmitted = true
                draft.emailErrorMessage = validateEmailInput(draft.email)
                draft.passwordErrorMessage = isEmpty(draft.password)
                    ? 'Password is required'
                    : ''
                if (
                    isEmpty(draft.emailErrorMessage) &&
                    isEmpty(draft.passwordErrorMessage)
                ) {
                    draft.isSubmitted = false
                }

                if (
                    isEmpty(draft.emailErrorMessage) &&
                    isEmpty(draft.passwordErrorMessage)
                ) {
                    loginMutation
                        .mutateAsync({
                            email: draft.email,
                            password: draft.password,
                        })
                        .then(() => {
                            navigate('/')
                        })
                }
            })
        },
        [loginMutation, navigate, updateState]
    )

    const isValid = useMemo(
        () =>
            isEmpty(state.emailErrorMessage) &&
            isEmpty(state.passwordErrorMessage),
        [state.emailErrorMessage, state.passwordErrorMessage]
    )
    return {
        loginMutation: {
            isLoading: loginMutation.isLoading,
            isError: loginMutation.isError,
            isSuccess: loginMutation.isSuccess,
            error: loginMutation.error,
        },
        state,
        handleEmailChanged,
        handlePasswordChanged,
        handleSubmit,
        isValid,
    }
}

export default useLogin
