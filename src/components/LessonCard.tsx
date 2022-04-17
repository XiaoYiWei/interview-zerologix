import { addDays, format } from 'date-fns'
import styled from 'styled-components/macro'
import { useCallback } from 'react'
import { ReactComponent as CircleArrowRight } from '../assets/svgs/CircleRightArrow.svg'
import Card from './Card'
import { useUserStore } from '../stores/userStore'
import { useNavigate } from 'react-router-dom'
import { LessonData } from '../utils/lessonHelper'

const LessonDate = styled.h5`
    font-size: 14px;
    font-weight: 900;
    line-height: 20px;
    letter-spacing: 0;
    text-align: left;
    color: ${({ theme }) => theme.title};
    margin-bottom: 20px;
`

const Title = styled.h4`
    font-size: 16px;
    font-weight: 900;
    line-height: 24px;
    letter-spacing: 0;
    text-align: left;
    color: ${({ theme }) => theme.title};
    margin-bottom: 12px;
`

const Description = styled.span`
    display: -webkit-box;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0;
    text-align: left;
    color: #000000a6;
    margin-bottom: 20px;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    width: 80%;
    white-space: break-spaces;
    overflow: hidden;
    text-overflow: ellipsis;
`
const Footer = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    left: 20px;
    display: flex;
    justify-content: space-between;
`

const RegisterButton = styled.button`
    background-color: inherit;
    color: ${({ theme }) => theme.registerText};
    font-size: 16px;
    font-weight: 900;
    line-height: 24px;
    letter-spacing: 0;
    text-align: left;
    border: none;
    outline: none;
    cursor: pointer;
`

const ToDetailButton = styled.button`
    background-color: inherit;
    border: none;
    outline: none;
    cursor: pointer;
`

export type OnLessonSelectedCallback = (lesson: LessonData) => void
export type LessonCardProps = {
    lesson: LessonData
    onClick: OnLessonSelectedCallback
}
const LessonCard: React.FC<LessonCardProps> = ({ lesson, onClick }) => {
    const navigate = useNavigate()
    const { token } = useUserStore()
    const createAt = format(lesson.created_at, 'yyyy/MM/dd')
    const startTime = addDays(lesson.created_at, 10)
    const startTimeString = format(startTime, 'yyyy/MM/dd hh:mm')
    const description = lesson.content.blocks[0]?.text ?? ''
    const buttonText = lesson.favourited ? 'Unregister' : 'Register now'
    const handleCardClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.stopPropagation()
            if (token) {
                onClick(lesson)
            } else {
                navigate('/login')
            }
        },
        [lesson, navigate, onClick, token]
    )
    return (
        <Card>
            <LessonDate>{createAt}</LessonDate>
            <Title>{lesson.title}</Title>
            <Description>{description}</Description>
            <Description>{startTimeString}</Description>
            <Footer>
                <RegisterButton onClick={handleCardClick}>
                    {buttonText}
                </RegisterButton>
                <ToDetailButton>
                    <CircleArrowRight />
                </ToDetailButton>
            </Footer>
        </Card>
    )
}

LessonCard.displayName = 'LessonCard'
export default LessonCard
