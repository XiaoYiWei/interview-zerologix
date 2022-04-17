import React, { forwardRef, useImperativeHandle } from 'react'
import Register, { RefFunctions } from './Register'
import Introduction from './Introduction'
import { useUserStore } from '../stores/userStore'
import { isNil } from 'lodash'
import { LessonData } from '../utils/lessonHelper'

type WebinarProps = {
    children?: React.ReactNode
}
export type WebinarFunctions = {
    selectLesson: (lesson: LessonData) => void
}

const Webinar = forwardRef<WebinarFunctions, WebinarProps>(
    ({ children }, ref) => {
        const registerRef = React.useRef<RefFunctions>(null)
        const { email } = useUserStore()
        const [lesson, setLesson] = React.useState<LessonData | undefined>(
            undefined
        )
        useImperativeHandle(ref, () => ({
            selectLesson: (lesson: LessonData) => {
                setLesson(lesson)
                registerRef.current?.setLesson(lesson)
                if (!isNil(email)) {
                    registerRef.current?.setEmail(email)
                }
                registerRef.current?.getContainerRef()?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            },
        }))
        return (
            <>
                <Introduction />
                {children}
                <Register ref={registerRef} lesson={lesson} />
            </>
        )
    }
)

Webinar.displayName = 'Webinar'
export default Webinar
