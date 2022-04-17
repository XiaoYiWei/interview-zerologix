import { useInfiniteQuery } from 'react-query'
import { fetchRegisteredLessons } from '../../utils/lessonHelper'

export const QUERY_REGISTERED_LESSON_LIST_KEY = 'REGISTERED_LESSON'

const useLessonQuery = () => {
    const registeredLessonQuery = useInfiniteQuery(
        QUERY_REGISTERED_LESSON_LIST_KEY,
        fetchRegisteredLessons,
        {
            getNextPageParam: (lastPage, pages) => {
                return lastPage.data.meta.current_page + 1
            },
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            suspense: true,
        }
    )

    return registeredLessonQuery
}

export default useLessonQuery
