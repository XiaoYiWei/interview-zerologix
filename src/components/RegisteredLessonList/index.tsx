import { Fragment, Suspense } from 'react'
import LessonCard, { OnLessonSelectedCallback } from '../LessonCard'
import useLessonList from './useLessonList'
import LoadingCard from '../LoadingCard'
import { Container } from '../UnregisteredLessonList'

type RegisteredLessonListProps = {
    onLessonSelected: OnLessonSelectedCallback
}

const Index: React.FC<RegisteredLessonListProps> = ({ onLessonSelected }) => {
    const { data, hasNextPage, isFetchingNextPage, isFetching, ref } =
        useLessonList()

    return (
        <Container>
            <Suspense fallback={'loading'}>
                {data?.pages.map((group, i) => (
                    <Fragment key={i}>
                        {group.data.data.map((lesson) => (
                            <LessonCard
                                key={lesson.id}
                                lesson={lesson}
                                onClick={onLessonSelected}
                            />
                        ))}
                    </Fragment>
                ))}
                <LoadingCard
                    ref={ref}
                    isFetchingNextPage={isFetchingNextPage}
                    hasNextPage={hasNextPage}
                    isFetching={isFetching}
                />
            </Suspense>
        </Container>
    )
}

export default Index
