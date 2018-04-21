import React, { Component } from 'react';
import ZipCode from './ZipCode';
import Forecast from './Forecast';
import Details from '../components/Details';
import Container from "../styled-components/Container";
import ContentWrapper from "../styled-components/ContentWrapper";
import { Route } from 'react-router-dom';
import Routes from '../Routes';

class App extends Component {
  render () {
    return (
        <Container>
          <Route exact path='/' render={function (props) {
            return (
              <ContentWrapper>
                <ZipCode
                  direction='column'
                  onSubmitZipcode={function (city) {
                    props.history.push({
                      pathname: '/forecast',
                      search: '?city=' + city
                    })
                  }}
                  zipcode={123} />
              </ContentWrapper>
            )
          }} />

          <Route path='/forecast' component={Forecast} />
          <Route path='/details/:city' component={Details} />
        </Container>
    )
  }
}

export default App;