import React, { Component } from 'react';
import { getForecast } from '../../utils/api';
import { getDate, getDay } from '../../utils/helpers';
import queryString from 'query-string';
import DayItem from '../DayItem';
import {
    ForecastContainer,
    ForecastCard,
    ExtendedForecast,
    ForecastPeriodOfDayInfo,
    ForecastTodaysTemperature,
    ExtendedForecastList,
    ExtendedForecastDay,
    ForecastTemperatureUnit,
    ForecastThumbnail,
} from './styled';
// import { CheckboxSlider } from '../styled';
import StyledLink from '../shared/StyledLink';

class Forecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecastData: [],
            loading: true,
            isChecked: true,
            metric: 'C',
        };
    }
    componentDidMount() {
        this.city = queryString.parse(this.props.location.search).city;
        this.makeRequest(this.city);
    }
    componentWillReceiveProps(nextProps) {
        this.city = queryString.parse(nextProps.location.search).city;
        this.makeRequest(this.city);
    }
    makeRequest = city => {
        this.setState(function() {
            return {
                loading: true,
            };
        });

        getForecast(city).then(
            function(res) {
                this.setState(function() {
                    return {
                        loading: false,
                        forecastData: res,
                    };
                });
            }.bind(this)
        );
    };
    handleClick = city => {
        city.city = this.city;
        this.props.history.push({
            pathname: '/details/' + this.city,
            state: city,
        });
    };
    handleChange() {
        console.log('fireee');
        this.setState(function() {
            return {
                isChecked: !this.state.isChecked,
                metric: this.state.isChecked ? 'C' : 'F',
            };
        });
    }
    render() {
        const { isChecked, metric } = this.state;
        const { city, list } = this.state.forecastData;
        const today = list ? list[0] : null;

        return this.state.loading ? (
            <h1 className="forecast-header">Loading</h1>
        ) : (
            <ForecastContainer>
                <ForecastCard>
                    {/* <CheckboxSlider handleChange={() => this.handleChange} isChecked={isChecked ? 1 : 0} metric={metric}/> */}
                    <div id="top">
                        <div className="location">
                            <StyledLink to="/">&larr;</StyledLink> {city.name}
                        </div>
                        <div className="time">{getDate(today.dt)}</div>
                        <div className="status">{today.weather[0].main}</div>
                    </div>
                    <ForecastTodaysTemperature>
                        <ForecastThumbnail
                            src={require(`../../images/weather-icons/${
                                today.weather[0].icon
                            }.svg`)}
                            alt="Weather"
                        />
                        <ForecastTodaysTemperature>
                            {today.temp.max}
                        </ForecastTodaysTemperature>
                        <ForecastTemperatureUnit>°C</ForecastTemperatureUnit>
                    </ForecastTodaysTemperature>
                    <ForecastPeriodOfDayInfo>
                        <span>Morning: {today.temp.morn} °C</span>
                        <br />
                        <span>Day: {today.temp.day} °C</span>
                        <br />
                        <span>Evening: {today.temp.eve} °C</span>
                        <br />
                        <span>Night:{today.temp.night} °C</span>
                    </ForecastPeriodOfDayInfo>

                    <ExtendedForecast>
                        <ExtendedForecastList>
                            {list.map(
                                (listItem, i) => (
                                    <ExtendedForecastDay
                                        key={i}
                                        onClick={() =>
                                            this.handleClick(listItem)
                                        }
                                    >
                                        <div>{getDay(listItem.dt)}</div> <br />
                                        <img
                                            style={{
                                                height: 25,
                                                width: 25,
                                                padding: 5,
                                            }}
                                            src={require(`../../images/weather-icons/${
                                                listItem.weather[0].icon
                                            }.svg`)}
                                            alt="Weather"
                                        />{' '}
                                        <br />
                                        <span>{listItem.temp.max}°</span>
                                    </ExtendedForecastDay>
                                )
                                //  <DayItem onClick={() => this.handleClick(listItem)} key={listItem.dt} day={listItem} />
                            )}
                        </ExtendedForecastList>
                    </ExtendedForecast>
                </ForecastCard>
            </ForecastContainer>
        );
    }
}

export default Forecast;
