import { useInfiniteQuery } from 'react-query'
import {
    fetchRegisteredLessons,
    fetchUnregisteredLessons,
} from '../utils/lessonHelper'

export const QUERY_REGISTERED_LESSON_LIST_KEY = 'REGISTERED_LESSON'
export const QUERY_UNREGISTERED_LESSON_LIST_KEY = 'UNREGISTERED_LESSON'

export type RegisterMode = 'registered' | 'unregistered'
type UseLessonQueryProps = {
    mode: RegisterMode
}
const useLessonQuery = (props: UseLessonQueryProps) => {
    const { mode } = props
    const unregisteredLessonQuery = useInfiniteQuery(
        QUERY_UNREGISTERED_LESSON_LIST_KEY,
        fetchUnregisteredLessons,
        {
            getNextPageParam: (lastPage, pages) => {
                return lastPage.data.meta.current_page + 1
            },
            enabled: mode === 'unregistered',
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            suspense: true,
        }
    )

    const registeredLessonQuery = useInfiniteQuery(
        QUERY_REGISTERED_LESSON_LIST_KEY,
        fetchRegisteredLessons,
        {
            getNextPageParam: (lastPage, pages) => {
                return lastPage.data.meta.current_page + 1
            },
            enabled: mode === 'registered',
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            suspense: true,
        }
    )

    return mode === 'unregistered'
        ? {
              ...unregisteredLessonQuery,
          }
        : {
              ...registeredLessonQuery,
          }
}

export default useLessonQuery
