import { useImmer } from 'use-immer'
import {
    ForwardedRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
} from 'react'
import { OnChangeCallback } from '../TextBox'
import useLessonQuery from '../../hooks/useLessonQuery'
import { OnClickCallback as OnListItemClickCallback } from '../Dropdown/ListItem'
import { isEmpty, isNil } from 'lodash'
import { RefFunctions } from './index'
import { validateEmail } from '../../utils/helper'
import { useMutation } from 'react-query'
import useUrlQuery from '../../hooks/useUrlQuery'
import { apiInstance } from '../../utils/axios'
import { LessonData } from '../../utils/lessonHelper'

type State = {
    isSubmitted: boolean
    firstName: string
    lastName: string
    email: string
    lesson: LessonData | null
}
const useRegister = (ref: ForwardedRef<RefFunctions>) => {
    const { mode } = useUrlQuery()
    const containerRef = useRef<HTMLDivElement>(null)
    const { data, refetch } = useLessonQuery({ mode })
    const [state, updateState] = useImmer<State>({
        isSubmitted: false,
        firstName: '',
        lastName: '',
        email: '',
        lesson: null,
    })
    const lessonErrorMessage = useMemo(() => {
        if (isNil(state.lesson)) {
            return 'Please select a course'
        }
        return ''
    }, [state.lesson])
    const firstNameErrorMessage = useMemo(() => {
        if (state.firstName.length < 3) {
            return 'First name must be at least 3 characters'
        }
        return ''
    }, [state.firstName.length])
    const lastNameErrorMessage = useMemo(() => {
        if (state.lastName.length < 3) {
            return 'Last name must be at least 3 characters'
        }
        return ''
    }, [state.lastName.length])
    const emailErrorMessage = useMemo(() => {
        if (!validateEmail(state.email)) {
            return 'Invalid email address'
        }
        return ''
    }, [state.email])

    const handleFirstNameChanged = useCallback<OnChangeCallback>(
        (e) =>
            updateState((draft) => {
                draft.firstName = e.target.value
            }),
        [updateState]
    )
    const handleLastNameChanged = useCallback<OnChangeCallback>(
        (e) =>
            updateState((draft) => {
                draft.lastName = e.target.value
            }),
        [updateState]
    )
    const handleEmailChanged = useCallback<OnChangeCallback>(
        (e) =>
            updateState((draft) => {
                draft.email = e.target.value
            }),
        [updateState]
    )
    const handleLessonChanged = useCallback<OnListItemClickCallback>(
        (lesson) =>
            updateState((draft) => {
                draft.lesson = lesson
            }),
        [updateState]
    )
    const registerMutation = useMutation((lessionId: number) => {
        return apiInstance.post(`/me/user/favourite/post-analysis/${lessionId}`)
    })
    const unregisterMutation = useMutation((lessionId: number) => {
        return apiInstance.delete(
            `/me/user/favourite/post-analysis/${lessionId}`
        )
    })
    useImperativeHandle(ref, () => ({
        getContainerRef: () => containerRef.current,
        setLesson: (lesson: LessonData) => {
            handleLessonChanged(lesson)
        },
        setEmail: (email: string) => {
            updateState((draft) => {
                draft.email = email
            })
        },
    }))

    const lessons = useMemo(() => {
        const result: LessonData[] = []
        const pages = data?.pages ?? []
        pages.map((page) =>
            page.data?.data?.map((lesson) => result.push(lesson))
        )
        return result
    }, [data?.pages])

    const isValid = useMemo(() => {
        return (
            isEmpty(lessonErrorMessage) &&
            isEmpty(firstNameErrorMessage) &&
            isEmpty(lastNameErrorMessage) &&
            isEmpty(emailErrorMessage)
        )
    }, [
        emailErrorMessage,
        firstNameErrorMessage,
        lastNameErrorMessage,
        lessonErrorMessage,
    ])

    const refreshPageByLessonId = useCallback(
        (lessonId: number) => {
            const pageIndex = data?.pages.findIndex((page) =>
                page.data.data.map((lesson) => lesson.id).includes(lessonId)
            )
            if (!isNil(pageIndex) && pageIndex >= 0) {
                refetch({
                    refetchPage: (page, index) => index === pageIndex,
                })
            }
        },
        [data?.pages, refetch]
    )

    const processRegister = useCallback(() => {
        updateState((draft) => {
            draft.isSubmitted = true
        })
        if (!isValid) return

        if (state.lesson) {
            const lessonId = state.lesson.id
            registerMutation.mutateAsync(lessonId).then(() => {
                // 找出課程所在的頁數,並重新查詢該頁
                refreshPageByLessonId(lessonId)
                updateState((draft) => {
                    draft.isSubmitted = false
                    draft.lesson = null
                })
            })
        }
    }, [
        isValid,
        refreshPageByLessonId,
        registerMutation,
        state.lesson,
        updateState,
    ])
    const processUnregister = useCallback(() => {
        if (state.lesson) {
            const lessonId = state.lesson.id
            unregisterMutation.mutateAsync(lessonId).then(() => {
                // 找出課程所在的頁數,並重新查詢該頁
                refreshPageByLessonId(lessonId)
                updateState((draft) => {
                    draft.isSubmitted = false
                    draft.lesson = null
                })
            })
        }
    }, [refreshPageByLessonId, state.lesson, unregisterMutation, updateState])

    const handleSubmit = useCallback(
        (event: React.SyntheticEvent<HTMLFormElement>) => {
            event.preventDefault()
            event.stopPropagation()
            switch (mode) {
                case 'registered':
                    processUnregister()
                    break
                case 'unregistered':
                    processRegister()
                    break
            }
        },
        [mode, processRegister, processUnregister]
    )

    return {
        containerRef,
        state,
        isValid,
        lessons,
        handleFirstNameChanged,
        handleLastNameChanged,
        handleEmailChanged,
        handleLessonChanged,
        handleSubmit,
        lessonErrorMessage,
        firstNameErrorMessage,
        lastNameErrorMessage,
        emailErrorMessage,
        registerMutation: {
            isLoading: registerMutation.isLoading,
            isError: registerMutation.isError,
            error: registerMutation.error,
            data: registerMutation.data,
        },
    }
}
export default useRegister
