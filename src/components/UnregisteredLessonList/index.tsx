import styled from 'styled-components/macro'
import { Fragment, Suspense } from 'react'
import LessonCard, { OnLessonSelectedCallback } from '../LessonCard'
import useLessonList from './useLessonList'
import LoadingCard from '../LoadingCard'

export const Container = styled.div`
    display: flex;
    flex-flow: column wrap;
    background: #f2f2f2;

    max-height: 770px;
    padding: 80px 91px;
    overflow-x: auto;
    overflow-y: hidden;
    @media (max-width: 768px) {
        padding: 40px 34px;
        max-height: 980px;
    }
    @media (max-width: 320px) {
        padding: 40px 25px;
        max-height: unset;
    }
`
type UnregisteredLessonListProps = {
    onLessonSelected: OnLessonSelectedCallback
}

const Index: React.FC<UnregisteredLessonListProps> = ({ onLessonSelected }) => {
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
