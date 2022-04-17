import styled from 'styled-components/macro'
import Login from '../../components/Login'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 87px 0;
    @media (max-width: 768px) {
        padding: 72px 0;
    }
    @media (max-width: 320px) {
        padding: 72px 0;
    }
`

const LoginPage: React.FC = () => {
    return (
        <Container>
            <Login />
        </Container>
    )
}

export default LoginPage
