import React, { Component } from 'react';
import { getForecast } from '../../utils/api';
import { getFullDate, getDay, convertTemp } from '../../utils/helpers';
import queryString from 'query-string';
import Loading from '../Loading';
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
    ExtendedForecastItem,
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
        this.setState(() => {
            return {
                loading: true,
            };
        });
        getForecast(city).then(res => {
            this.setState(() => {
                return {
                    loading: false,
                    forecastData: res,
                };
            });
        });
    };
    handleClick = city => {
        this.props.history.push({
            pathname: '/details/' + city,
            state: city,
        });
    };
    handleChange() {
        this.setState(() => {
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
            <Loading />
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
                        <ForecastDate>{getFullDate(today.dt)}</ForecastDate>
                        <ForecastStatus>{today.weather[0].main}</ForecastStatus>
                    </ForecastGeneralInfo>

                    <div>
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
                            <ForecastTemperatureUnit>
                                {temperatureUnit}
                            </ForecastTemperatureUnit>
                        </ForecastTodaysTemperature>
                        <ForecastPeriodOfDayInfo>
                            <span>
                                Morning:{' '}
                                {convertTemp(temperatureUnit, today.temp.morn)}{' '}
                                {temperatureUnit}
                            </span>
                            <br />
                            <span>
                                Day:{' '}
                                {convertTemp(temperatureUnit, today.temp.day)}{' '}
                                {temperatureUnit}
                            </span>
                            <br />
                            <span>
                                Evening:{' '}
                                {convertTemp(temperatureUnit, today.temp.eve)}{' '}
                                {temperatureUnit}
                            </span>
                            <br />
                            <span>
                                Night:{convertTemp(
                                    temperatureUnit,
                                    today.temp.night
                                )}{' '}
                                {temperatureUnit}
                            </span>
                        </ForecastPeriodOfDayInfo>
                    </div>

                    <ExtendedForecast>
                        <ExtendedForecastList>
                            {list.map(
                                (listItem, i) => (
                                    <ExtendedForecastItem
                                        key={i}
                                        onClick={() =>
                                            this.handleClick(listItem)
                                        }
                                    >
                                        <div>{getDay(listItem.dt)}</div>
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
                                    </ExtendedForecastItem>
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
