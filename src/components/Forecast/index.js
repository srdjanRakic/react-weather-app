import React, { Component } from 'react';
import { getForecast } from '../../utils/api';
import { getDate, getDay } from '../../utils/helpers';
import queryString from 'query-string';
import DayItem from '../DayItem';
import {
    MetricSlider,
    Input,
    Metrics,
    ForecastGeneralInfo,
    ForecastStatus,
    ForecastLocation,
    ForecastDate,
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
            temperatureUnit: '°C',
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
                temperatureUnit: this.state.isChecked ? '°F' : '°C',
            };
        });
    }
    render() {
        const { isChecked, temperatureUnit } = this.state;
        const { city, list } = this.state.forecastData;
        const today = list ? list[0] : null;

        return this.state.loading ? (
            <h1 className="forecast-header">Loading</h1>
        ) : (
            <ForecastContainer>
                <ForecastCard>
                    <ForecastGeneralInfo>
                        <MetricSlider>
                            <Input
                                type="checkbox"
                                onChange={() => this.handleChange()}
                            />
                            <Metrics isChecked={isChecked}>
                                {temperatureUnit}
                            </Metrics>
                        </MetricSlider>
                        <ForecastLocation>
                            <StyledLink to="/">&larr;</StyledLink> {city.name}
                        </ForecastLocation>
                        <ForecastDate>{getDate(today.dt)}</ForecastDate>
                        <ForecastStatus>{today.weather[0].main}</ForecastStatus>
                    </ForecastGeneralInfo>
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
                        <span>
                            Morning: {today.temp.morn} {temperatureUnit}
                        </span>
                        <br />
                        <span>
                            Day: {today.temp.day} {temperatureUnit}
                        </span>
                        <br />
                        <span>
                            Evening: {today.temp.eve} {temperatureUnit}
                        </span>
                        <br />
                        <span>
                            Night:{today.temp.night} {temperatureUnit}
                        </span>
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
                                        <span>
                                            {listItem.temp.max}{' '}
                                            {temperatureUnit}
                                        </span>
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
