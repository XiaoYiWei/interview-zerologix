import styled from 'styled-components/macro'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 87px 0;
    @media (max-width: 768px) {
        padding: 156px 0;
    }
    @media (max-width: 320px) {
        padding: 72px 0;
    }
`
const H2 = styled.h2`
    font-size: 28px;
    font-weight: 500;
    line-height: 40px;
    letter-spacing: 0;
    text-align: center;
    color: ${({ theme }) => theme.title};
`

const H5 = styled.h5`
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0;
    text-align: center;
    width: fit-content;
    color: ${({ theme }) => theme.title};

    max-width: 800px;
    @media (max-width: 768px) {
        max-width: 700px;
    }
    @media (max-width: 320px) {
        max-width: 270px;
    }
`
const Introduction: React.FC = () => {
    return (
        <Container>
            <H2>Forex Webinars</H2>
            <H5>
                Whether you are new to foreign exchange trading or already have
                some market experience, we believe that a solid FX trading
                education is vital to your success as a trader.
            </H5>
        </Container>
    )
}

Introduction.displayName = 'Introduction'
export default Introduction
