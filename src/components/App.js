import React from 'react';
import Routes from '../routes';
import Container from '../styled-components/Container';
import ContentWrapper from '../styled-components/ContentWrapper';

const App = () => (
    <React.Fragment>
        <Container>
            <ContentWrapper>
                <Routes />
            </ContentWrapper>
        </Container>
    </React.Fragment>
);

export default App;
