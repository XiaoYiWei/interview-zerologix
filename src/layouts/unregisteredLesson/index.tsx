import Webinar, { WebinarFunctions } from '../../components/Webinar'
import { useCallback, useRef } from 'react'
import { OnLessonSelectedCallback } from '../../components/LessonCard'
import UnregisteredLessonList from '../../components/UnregisteredLessonList'

const UnregisteredLesson: React.FC = () => {
    const webinarRef = useRef<WebinarFunctions>(null)
    const handleLessonSelected = useCallback<OnLessonSelectedCallback>(
        (lesson) => {
            webinarRef.current?.selectLesson(lesson)
        },
        []
    )
    return (
        <Webinar ref={webinarRef}>
            <UnregisteredLessonList onLessonSelected={handleLessonSelected} />
        </Webinar>
    )
}

export default UnregisteredLesson
