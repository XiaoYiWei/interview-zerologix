import styled from 'styled-components/macro'
import { useCallback } from 'react'
import { LessonData } from '../../utils/lessonHelper'

const Item = styled.button`
    display: inline-block;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    background: #ffffff;
    border: 1px solid #c6c6c6;
    box-sizing: border-box;
    height: 40px;
    padding: 0 12px;
    color: #4a4a4a;
    cursor: pointer;
`

export type OnClickCallback = (lesson: LessonData) => void
export type ListItemProps = {
    lesson: LessonData
    onClick: OnClickCallback
}
const ListItem: React.FC<ListItemProps> = ({ lesson, onClick }) => {
    const handleClick = useCallback(
        (event: React.SyntheticEvent<HTMLButtonElement>) => {
            event.preventDefault()
            event.stopPropagation()
            onClick(lesson)
        },
        [lesson, onClick]
    )
    return <Item onClick={handleClick}>{lesson.title}</Item>
}

export default ListItem
