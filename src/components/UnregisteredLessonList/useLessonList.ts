import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import useLessonQuery from './useLessonQuery'

const useLessonList = () => {
    const { ref, inView } = useInView()

    const {
        fetchNextPage,
        data,
        error,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useLessonQuery()

    useEffect(() => {
        if (inView && !isFetching) {
            fetchNextPage()
        }
    }, [fetchNextPage, inView, isFetching])

    return {
        ref,
        inView,
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    }
}

export default useLessonList
