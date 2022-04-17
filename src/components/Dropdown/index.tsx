import { useImmer } from 'use-immer'
import { useCallback, useRef } from 'react'
import { ReactComponent as Victor } from '../../assets/svgs/Vector.svg'
import styled from 'styled-components/macro'
import useOnClickOutside from '../../hooks/useClickOutside'
import { ErrorMessage, Label } from '../TextBox'
import ListItem, { OnClickCallback } from './ListItem'
import { LessonData } from '../../utils/lessonHelper'

const VictorIcon = styled(Victor)<{ $expand: boolean }>`
    transform: ${({ $expand }) =>
        $expand ? 'rotate(90deg)' : 'rotate(-90deg)'};
    margin: 0 10px;
`

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
`
const Header = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    background: #ffffff;
    border: 1px solid #c6c6c6;
    box-sizing: border-box;
    border-radius: 4px;
    height: 40px;
    padding: 0 12px;
    color: #4a4a4a;
    cursor: pointer;
`

const List = styled.div`
    position: absolute;
    z-index: 10;
    width: 100%;
    max-height: 215px;
    background: #ffffff;
    border: 1px solid #c6c6c6;
    box-sizing: border-box;
    border-radius: 4px;
    min-height: 40px;
`

const ScrollArea = styled.div`
    overflow-y: scroll;
    max-height: 215px;
    padding: 15px 0;
`

type DropdownProps = {
    label: string
    options: LessonData[]
    onChange: OnClickCallback
    value: LessonData | null
    errorMessage: string
    showError?: boolean
}
type DropdownState = {
    isListOpen: boolean
}
const Dropdown: React.FC<DropdownProps> = ({
    label,
    onChange,
    options,
    value,
    errorMessage,
    showError = false,
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [state, updateState] = useImmer<DropdownState>({
        isListOpen: false,
    })
    const clickOutsideCallback = useCallback(() => {
        updateState((draft) => {
            draft.isListOpen = false
        })
    }, [updateState])
    useOnClickOutside(ref, clickOutsideCallback)
    const toggleList = useCallback(
        (e: React.SyntheticEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            e.preventDefault()
            updateState((draft) => {
                draft.isListOpen = !draft.isListOpen
            })
        },
        [updateState]
    )
    const handleItemSelected = useCallback(
        (item: LessonData) => {
            updateState((draft) => {
                draft.isListOpen = false
            })
            onChange(item)
        },
        [onChange, updateState]
    )

    return (
        <Wrapper>
            <Label>{label}</Label>
            <Container ref={ref}>
                <Header onClick={toggleList}>
                    <div className="dd-header-title">{value?.title ?? ''}</div>
                    <VictorIcon $expand={state.isListOpen} />
                </Header>
                {state.isListOpen && (
                    <List>
                        <ScrollArea>
                            {options.map((lesson) => (
                                <ListItem
                                    key={lesson.id}
                                    lesson={lesson}
                                    onClick={handleItemSelected}
                                />
                            ))}
                        </ScrollArea>
                    </List>
                )}
            </Container>
            {showError && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Wrapper>
    )
}

export default Dropdown
