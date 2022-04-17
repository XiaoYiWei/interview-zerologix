import styled from 'styled-components/macro'
import { ComponentProps } from 'react'

const Button = styled.button<{ $disable: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 40px;
    width: 115px;
    height: 40px;
    gap: 5px;
    color: ${({ theme, $disable }) =>
        $disable ? theme.disabledText : theme.primary};
    background: ${({ theme, $disable }) =>
        $disable ? theme.disabledBackground : theme.white};
    border: 1px solid
        ${({ theme, $disable }) =>
            $disable ? theme.disabledBackground : theme.primary};
    box-sizing: border-box;
    border-radius: 2px;
    cursor: ${({ $disable }) => ($disable ? 'not-allowed' : 'pointer')};
`

type OutlinedButtonProps = {
    children: React.ReactNode
    disable?: boolean
    onClick?: () => void
} & ComponentProps<typeof Button>

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
    onClick,
    disable = false,
    children,
    ...props
}) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            e.preventDefault()
            onClick()
        }
    }
    return (
        <Button onClick={handleClick} $disable={disable} {...props}>
            {children}
        </Button>
    )
}

OutlinedButton.displayName = 'OutlinedButton'
export default OutlinedButton
