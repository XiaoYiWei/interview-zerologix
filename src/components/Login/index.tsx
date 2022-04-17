import styled from 'styled-components/macro'
import TextBox, { ErrorMessage } from '../TextBox'
import useLogin from './useLogin'
import { Suspense } from 'react'
import OutlinedButton from '../OutlinedButton'
import { LoginErrorResponse } from '../../hooks/useAuth'

const Container = styled.div`
    display: flex;
    flex-flow: column wrap;
    max-height: 770px;
    padding: 80px 91px;
    overflow-x: auto;
    overflow-y: hidden;
`

const Form = styled.form`
    display: flex;
    width: 100%;
    padding: 20px;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    border: 1px solid #dbdbdb;
    box-sizing: border-box;
    box-shadow: 0 4px 14px rgba(132, 132, 132, 0.5);
    border-radius: 20px;
`
const Section = styled.section`
    display: flex;
    width: 600px;
    flex-direction: column;
    @media (max-width: 768px) {
        width: fit-content;
    }
    @media (max-width: 320px) {
        width: 276px;
    }
`

const Title = styled.h3`
    font-size: 22px;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: 0;
    text-align: center;
    margin-bottom: 20px;
`
const Description = styled.h4`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    margin-bottom: 40px;
`

const SubmitButton = styled(OutlinedButton)`
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    text-align: center;
    border-color: ${({ theme }) => theme.registerText};
    color: ${({ theme }) => theme.registerText};
    width: 100%;
`

const Login: React.FC = () => {
    const {
        handleEmailChanged,
        handlePasswordChanged,
        handleSubmit,
        state,
        loginMutation,
    } = useLogin()
    return (
        <Container>
            <Suspense>
                <Form onSubmit={handleSubmit}>
                    <Section>
                        <Title>Login</Title>
                        <Description>
                            Please fill in the form below to login to your
                            account.
                        </Description>
                        <TextBox
                            id="txtEmail"
                            label={'Email'}
                            value={state.email}
                            onChange={handleEmailChanged}
                            errorMessage={state.emailErrorMessage}
                            showError={state.isSubmitted}
                        />
                        <TextBox
                            id="txtPassword"
                            label={'Password'}
                            value={state.password}
                            onChange={handlePasswordChanged}
                            errorMessage={state.passwordErrorMessage}
                            showError={state.isSubmitted}
                        />
                        <SubmitButton disable={loginMutation.isLoading}>
                            Login
                        </SubmitButton>
                        {loginMutation.isError && (
                            <ErrorMessage>
                                {(
                                    (loginMutation as any).error
                                        .data as LoginErrorResponse
                                ).status_code === 422
                                    ? 'Account / Password is incorrect'
                                    : 'Oops. Error occurred during login, please try again later.'}
                            </ErrorMessage>
                        )}
                    </Section>
                </Form>
            </Suspense>
        </Container>
    )
}

export default Login
