import Webinar, { WebinarFunctions } from '../../components/Webinar'
import { useCallback, useRef } from 'react'
import { OnLessonSelectedCallback } from '../../components/LessonCard'
import RegisteredLessonList from '../../components/RegisteredLessonList'

const RegisteredLesson: React.FC = () => {
    const webinarRef = useRef<WebinarFunctions>(null)
    const handleLessonSelected = useCallback<OnLessonSelectedCallback>(
        (lesson) => {
            webinarRef.current?.selectLesson(lesson)
        },
        []
    )
    return (
        <Webinar ref={webinarRef}>
            <RegisteredLessonList onLessonSelected={handleLessonSelected} />
        </Webinar>
    )
}

export default RegisteredLesson
