
import React, { Component } from 'react';
import { getForecast } from '../utils/api';
import queryString from 'query-string';
import DayItem from '../components/DayItem';
import { getDate } from '../utils/helpers';
import ForecastContainer from "../styled-components/ForecastContainer";

class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecastData: [],
      loading: true
    }
  }
  componentDidMount() {
    this.city = queryString.parse(this.props.location.search).city;
    this.makeRequest(this.city);
  }
  componentWillReceiveProps(nextProps) {
    this.city = queryString.parse(nextProps.location.search).city;
    this.makeRequest(this.city);
  }
  makeRequest = (city) => {
    this.setState(function () {
      return {
        loading: true
      }
    })

    getForecast(city)
      .then(function (res) {
        this.setState(function () {
          return {
            loading: false,
            forecastData: res,
          }
        })
      }.bind(this))
  }
  handleClick = (city) => {
    city.city = this.city;
    this.props.history.push({
      pathname: '/details/' + this.city,
      state: city,
    })
  }
  render() {
    const { city, list } = this.state.forecastData;

    return this.state.loading === true
      ? <h1 className='forecast-header'>Loading</h1>
      : <ForecastContainer>
          <div id="display">
            <div id="top">
              <div className="location">{city.name}</div>
              <div className="time">{getDate(list[0].dt)}</div>
              <div className="status">Cloudy</div>
            </div>
            <div id="left-information">
              <img src={require(`../images/weather-icons/${list[0].weather[0].icon}.svg`)} alt='Weather' />
              <div className="temperature">{list[0].temp.max}</div>
              <div className="unit">°C</div>
            </div>
            <div id="right-information">
              <span>Humidity: {list[0].humidity} %</span><br/>
              <span>Pressure: {list[0].pressure} mb</span><br/>
              <span>Wind speed: {list[0].pressure} km/h</span>
            </div>
            <div id="forecast">
              <ul>
                {list.map((listItem, i) =>
                    <li key={i} onClick={() => this.handleClick(listItem)}>
                      <h2 className='subheader'>{getDate(listItem.dt)}</h2>
                      <img src={require(`../images/weather-icons/${listItem.weather[0].icon}.svg`)} alt='Weather' />
                      <b>{ listItem.temp.max }°</b>
                    </li>
                  //  <DayItem onClick={() => this.handleClick(listItem)} key={listItem.dt} day={listItem} />
                )}
              </ul>
            </div>
        </div>
   </ForecastContainer>
  }
}

export default Forecast;