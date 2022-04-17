import { forwardRef } from 'react'
import Card from './Card'

type CardProps = {
    isFetchingNextPage: boolean
    hasNextPage: boolean | undefined
    isFetching: boolean
}
const LoadingCard = forwardRef<HTMLDivElement, CardProps>(
    ({ isFetchingNextPage, hasNextPage, isFetching }, ref) => {
        return (
            <Card ref={ref}>
                <h1>
                    {isFetching || isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                        ? 'Load Newer'
                        : 'Nothing more to load'}
                </h1>
            </Card>
        )
    }
)

LoadingCard.displayName = 'LoadingCard'
export default LoadingCard
