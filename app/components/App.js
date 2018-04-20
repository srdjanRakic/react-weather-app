import React from 'react';
import ZipCode from './ZipCode';
import Forecast from './Forecast';
import Detail from './Detail';
import Container from "../styled-components/Container";
import ContentWrapper from "../styled-components/ContentWrapper";
var ReactRouter = require('react-router-dom');
var BrowserRouter = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
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
          <Route path='/details/:city' component={Detail} />
        </Container>
      </BrowserRouter>
    )
  }
}

module.exports = App;