import styled from 'styled-components/macro'

const Input = styled.input`
    display: flex;
    background: #ffffff;
    border: 1px solid #c6c6c6;
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    height: 40px;
    padding: 5px;
    color: ${({ theme }) => theme.input};
`
export const Label = styled.label`
    display: flex;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 8px;
`

export const ErrorMessage = styled.span`
    color: #d8000c;
    background-color: #ffbaba;
`

const Container = styled.p`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
`

export type OnChangeCallback = React.ChangeEventHandler<HTMLInputElement>
type TextBoxProps = {
    id: string
    label: string
    value: string
    errorMessage: string
    onChange: OnChangeCallback
    showError?: boolean
}
const TextBox: React.FC<TextBoxProps> = ({
    id,
    label,
    value,
    onChange,
    errorMessage,
    showError = false,
}) => {
    return (
        <Container>
            <Label htmlFor={id} className="placeholder">
                {label}
            </Label>
            <Input
                id={id}
                className="input"
                type="text"
                placeholder=" "
                value={value}
                onChange={onChange}
            />
            {showError && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Container>
    )
}

export default TextBox
