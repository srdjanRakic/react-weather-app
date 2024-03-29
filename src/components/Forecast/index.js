import React, { Component } from 'react';
import { getFullDate, getDay, mapTimeOfDay } from '../../utils/helpers';
import queryString from 'query-string';
import {
    TempUnitSlider,
    Input,
    TempUnit,
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
import Spinner from '../shared/Spinner';
import NotFound from '../NotFound';
import StyledLink from '../shared/StyledLink';
import { observer, inject } from 'mobx-react';

@inject('forecastStore')
@observer
export default class Forecast extends Component {
    componentDidMount() {
        let city = queryString.parse(this.props.location.search).city;
        let geoLocation = {
            lat: queryString.parse(this.props.location.search).lat,
            lon: queryString.parse(this.props.location.search).lon,
        };

        if (city) {
            this.props.forecastStore.fetchForecastByCity(city);
        }

        if (Object.keys(geoLocation).length !== 0) {
            this.props.forecastStore.fetchForecastByGeoLocation(geoLocation);
        }
    }

    renderExtendedForecast() {
        const {
            temperatureUnit,
            extendedForecastList,
        } = this.props.forecastStore;

        return extendedForecastList.map((listItem, i) => (
            <ExtendedForecastItem key={i}>
                <div>{getDay(listItem.dt)}</div>
                <img
                    style={{
                        height: 25,
                        width: 25,
                        padding: 5,
                    }}
                    src={require(`../../assets/img/weather-icons/${
                        listItem.weather[0].icon
                    }.svg`)}
                    alt="Weather"
                />{' '}
                <br />
                <span>
                    {Math.round(listItem.temp.max)} {temperatureUnit}
                </span>
            </ExtendedForecastItem>
        ));
    }

    renderTodaysTempInfo() {
        const {
            temperatureUnit,
            extendedForecastList,
        } = this.props.forecastStore;
        // the first value of the list is todays temp info
        const todayTempInfo = extendedForecastList[0].temp || null;

        return Object.entries(todayTempInfo).map(([key, value]) => {
            if (
                key === 'morn' ||
                key === 'day' ||
                key === 'night' ||
                key === 'eve'
            ) {
                return (
                    <div key={key}>
                        {mapTimeOfDay(key)}: {Math.round(value)}
                        {temperatureUnit}
                    </div>
                );
            }
        });
    }

    renderErrors = () => {
        if (this.props.forecastStore.forecastErrors) {
            return (
                <NotFound
                    message={this.props.forecastStore.forecastErrors.message}
                />
            );
        }

        return <NotFound message="Something happend, please try again." />;
    };

    renderForecastData = () => {
        const {
            isChecked,
            temperatureUnit,
            cityInfo,
            extendedForecastList,
        } = this.props.forecastStore;

        // the first value of the list is todays temp info
        const todayTempInfo = extendedForecastList[0] || null;

        return (
            <ForecastContainer>
                <ForecastCard>
                    <ForecastGeneralInfo>
                        <TempUnitSlider>
                            <Input
                                type="checkbox"
                                onChange={() =>
                                    this.props.forecastStore.handleTempUnitChange()
                                }
                            />
                            <TempUnit isChecked={isChecked}>
                                {temperatureUnit}
                            </TempUnit>
                        </TempUnitSlider>
                        <ForecastLocation>
                            <StyledLink to="/">&larr;</StyledLink>{' '}
                            {cityInfo.name}
                        </ForecastLocation>
                        <ForecastDate>
                            {getFullDate(todayTempInfo.dt)}
                        </ForecastDate>
                        <ForecastStatus>
                            {todayTempInfo.weather[0].main}
                        </ForecastStatus>
                    </ForecastGeneralInfo>
                    <ForecastTodaysTemperature>
                        <ForecastThumbnail
                            src={require(`../../assets/img/weather-icons/${
                                todayTempInfo.weather[0].icon
                            }.svg`)}
                            alt="Weather"
                        />
                        <ForecastTodaysTemperature>
                            {Math.round(todayTempInfo.temp.max)}
                        </ForecastTodaysTemperature>
                        <ForecastTemperatureUnit>
                            {temperatureUnit}
                        </ForecastTemperatureUnit>
                    </ForecastTodaysTemperature>
                    <ForecastPeriodOfDayInfo>
                        {this.renderTodaysTempInfo()}
                    </ForecastPeriodOfDayInfo>
                    <ExtendedForecast>
                        <ExtendedForecastList>
                            {this.renderExtendedForecast()}
                        </ExtendedForecastList>
                    </ExtendedForecast>
                </ForecastCard>
            </ForecastContainer>
        );
    };

    render() {
        const {
            isLoadingForecast,
            extendedForecastList,
        } = this.props.forecastStore;

        if (isLoadingForecast) return <Spinner />;

        if (extendedForecastList.length > 0) {
            return this.renderForecastData();
        } else {
            return this.renderErrors();
        }
    }
}
