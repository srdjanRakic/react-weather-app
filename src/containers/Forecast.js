
import React, { Component } from 'react';
import { getForecast } from '../utils/api';
import queryString from 'query-string';
import DayItem from '../components/DayItem';
import { getDate, getDay } from '../utils/helpers';
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
              <div className="status">{list[0].weather[0].main}</div>
            </div>
            <div id="left-information">
              <img style={{ height: 64, width: 80 , padding: 10 }} src={require(`../images/weather-icons/${list[0].weather[0].icon}.svg`)} alt='Weather' />
              <div className="temperature">{list[0].temp.max}</div>
              <div className="unit">°C</div>
            </div>
            <div id="right-information">
              <span>Morning: {list[0].temp.morn} °C</span><br/>
              <span>Day: {list[0].temp.day} °C</span><br/>
              <span>Evening: {list[0].temp.eve} °C</span><br/>
              <span>Night:{list[0].temp.night} °C</span>
            </div>
            <div id="forecast">
              <ul>
                {list.map((listItem, i) =>
                    <li key={i} onClick={() => this.handleClick(listItem)}>
                      <div>{getDay(listItem.dt)}</div> <br/>
                      <img style={{ height: 25, width: 25 , padding: 5 }} src={require(`../images/weather-icons/${listItem.weather[0].icon}.svg`)} alt='Weather' /> <br/>
                      <span>{ listItem.temp.max }°</span>
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