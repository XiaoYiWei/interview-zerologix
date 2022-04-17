import styled from 'styled-components/macro'
import { ComponentProps, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

type LinkButtonProps = {
    href: string
    text: string
} & ComponentProps<typeof Button>

const Nav = styled.nav``
const Button = styled.input.attrs({ type: 'button' })`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 40px;
    width: 115px;
    height: 40px;
    gap: 5px;
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.primary};
    box-sizing: border-box;
    border-radius: 2px;
    cursor: pointer;
`

const LinkButton: React.FC<LinkButtonProps> = ({ href, text, ...props }) => {
    const navigate = useNavigate()
    const handleClick = useCallback(() => {
        navigate(href)
    }, [href, navigate])

    return (
        <Nav>
            <Button onClick={handleClick} value={text} {...props} />
        </Nav>
    )
}

LinkButton.displayName = 'LinkButton'
export default LinkButton
