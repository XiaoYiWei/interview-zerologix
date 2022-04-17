import { useInfiniteQuery } from 'react-query'
import { fetchUnregisteredLessons } from '../../utils/lessonHelper'

export const QUERY_UNREGISTERED_LESSON_LIST_KEY = 'UNREGISTERED_LESSON'

export type RegisterMode = 'registered' | 'unregistered'
const useLessonQuery = () => {
    const unregisteredLessonQuery = useInfiniteQuery(
        QUERY_UNREGISTERED_LESSON_LIST_KEY,
        fetchUnregisteredLessons,
        {
            getNextPageParam: (lastPage, pages) => {
                return lastPage.data.meta.current_page + 1
            },
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            suspense: true,
        }
    )

    return unregisteredLessonQuery
}

export default useLessonQuery
