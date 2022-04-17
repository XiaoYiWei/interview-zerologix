import styled from 'styled-components/macro'
import { useCallback, useLayoutEffect, useState } from 'react'
import { debounce, isNil } from 'lodash'
import { ReactComponent as HamburgerIcon } from '../assets/svgs/Hamburger.svg'
import LinkButton from './LinkButton'
import OutlinedButton from './OutlinedButton'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores/userStore'

const Outline = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: 132px;
    padding: 0 90px;
    @media (max-width: 768px) {
        padding: 0 34px;
    }
    @media (max-width: 320px) {
        padding: 0 16px;
    }
`

const MyWebinarButton = styled(LinkButton)`
    margin-right: 8px;
`

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
`

const Logo = styled.img.attrs({ loading: 'lazy' })`
    width: 136px;
    height: 60px;
    cursor: pointer;
    @media (max-width: 768px) {
        width: 114px;
        height: 52px;
    }
    @media (max-width: 320px) {
        width: 72px;
        height: 32px;
    }
`
type HeaderProps = {}

const Header: React.FC<HeaderProps> = () => {
    const navigate = useNavigate()
    const { token } = useUserStore()
    const { logoutMutation } = useAuth()
    const [width, setWidth] = useState(0)

    const handleResize = useCallback(() => {
        setWidth(window.innerWidth)
    }, [])

    const onLogoClick = useCallback(() => {
        navigate('/')
    }, [navigate])

    const onLogoutClick = useCallback(() => {
        logoutMutation.mutate()
    }, [logoutMutation])

    useLayoutEffect(() => {
        handleResize()
        const debouncedHandleResize = debounce(handleResize, 300)
        window.addEventListener('resize', debouncedHandleResize)
        return () => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    }, [handleResize])

    return (
        <Outline>
            <Logo
                src={process.env.PUBLIC_URL + '/logo.svg'}
                alt="Logo"
                onClick={onLogoClick}
            />
            {width <= 320 ? (
                <HamburgerIcon />
            ) : !isNil(token) ? (
                <ButtonGroup>
                    <MyWebinarButton href={'/my_webinars'} text="My Webinars" />
                    <OutlinedButton onClick={onLogoutClick}>
                        Logout
                    </OutlinedButton>
                </ButtonGroup>
            ) : (
                <LinkButton href="/Login" text="Login" />
            )}
        </Outline>
    )
}

export default Header
