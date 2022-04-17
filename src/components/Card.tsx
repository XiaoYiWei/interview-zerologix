import styled from 'styled-components/macro'
import { forwardRef } from 'react'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background: #ffffff;
    border: 1px solid ${({ theme }) => theme.cardBorder};
    box-sizing: border-box;
    box-shadow: 1px 2px 6px rgba(219, 219, 219, 0.5);
    border-radius: 4px;
    padding: 20px;
    width: 380px;
    max-width: 380px;
    height: 300px;
    max-height: 300px;
    margin: 10px;
    position: relative;

    @media (max-width: 768px) {
        width: 340px;
        max-width: 340px;
        height: 300px;
        max-height: 300px;
        margin: 10px;
    }
    @media (max-width: 320px) {
        width: 270px;
        max-width: 270px;
        height: 260px;
        max-height: 260px;
        margin: 6px;
    }
`
export type CardClickCallback = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
) => void
type CardProps = {
    children?: React.ReactNode | React.ReactNode[]
    onClick?: CardClickCallback
}
const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ children, onClick }, ref) => {
        return (
            <Container ref={ref} onClick={onClick}>
                {children}
            </Container>
        )
    }
)

Card.displayName = 'Card'
export default Card
