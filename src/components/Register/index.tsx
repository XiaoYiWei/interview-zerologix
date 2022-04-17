import styled from 'styled-components/macro'
import TextBox from '../TextBox'
import { forwardRef } from 'react'
import useRegister from './useRegister'
import Dropdown from '../Dropdown'
import OutlinedButton from '../OutlinedButton'
import { LessonData } from '../../utils/lessonHelper'

const Container = styled.div`
    height: 100vh;
    padding: 80px 93px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;

    @media (max-width: 768px) {
        padding: 80px 34px;
    }
    @media (max-width: 320px) {
        padding: 80px 16px;
    }
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

type RegisterProps = {
    lesson?: LessonData
}

export type RefFunctions = {
    setLesson: (lesson: LessonData) => void
    setEmail: (email: string) => void
    getContainerRef: () => HTMLDivElement | null
}
const Register = forwardRef<RefFunctions, RegisterProps>(({ lesson }, ref) => {
    const {
        containerRef,
        state,
        isValid,
        handleFirstNameChanged,
        handleLastNameChanged,
        handleEmailChanged,
        handleLessonChanged,
        handleSubmit,
        lessonErrorMessage,
        firstNameErrorMessage,
        lastNameErrorMessage,
        emailErrorMessage,
        lessons,
    } = useRegister(ref)

    const buttonText = lesson?.favourited ? 'Unregister' : 'Register now'

    return (
        <Container ref={containerRef}>
            <Form onSubmit={handleSubmit}>
                <Section>
                    <Title>Register for a Webinar now</Title>
                    <Description>
                        Please fill in the form below and you will be contacted
                        by one of our professional business experts.
                    </Description>
                    <Dropdown
                        label="Topic"
                        value={state.lesson}
                        onChange={handleLessonChanged}
                        options={lessons}
                        errorMessage={lessonErrorMessage}
                        showError={state.isSubmitted}
                    />
                    <TextBox
                        id="txtFirstName"
                        label={'First Name'}
                        value={state.firstName}
                        onChange={handleFirstNameChanged}
                        errorMessage={firstNameErrorMessage}
                        showError={state.isSubmitted}
                    />
                    <TextBox
                        id="txtLastName"
                        label={'Last Name'}
                        value={state.lastName}
                        onChange={handleLastNameChanged}
                        errorMessage={lastNameErrorMessage}
                        showError={state.isSubmitted}
                    />
                    <TextBox
                        id="txtEmail"
                        label={'Email'}
                        value={state.email}
                        onChange={handleEmailChanged}
                        errorMessage={emailErrorMessage}
                        showError={state.isSubmitted}
                    />
                    <SubmitButton disable={state.isSubmitted && !isValid}>
                        {buttonText}
                    </SubmitButton>
                </Section>
            </Form>
        </Container>
    )
})

export default Register
