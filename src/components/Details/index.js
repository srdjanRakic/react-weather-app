import React from 'react';
import DayItem from '../DayItem';
import { convertTemp } from '../../utils/helpers';
import { DescriptionContainer } from './styled';

const Details = props => {
    return (
        <div>
            <DayItem day={props.location.state} />
            <DescriptionContainer>
                <p>{props.location.state.city}</p>
                <p>{props.location.state.weather[0].description}</p>
                <p>
                    min temp: {convertTemp(props.location.state.temp.min)}{' '}
                    degrees
                </p>
                <p>
                    max temp: {convertTemp(props.location.state.temp.max)}{' '}
                    degrees
                </p>
                <p>humidity: {props.location.state.humidity}</p>
            </DescriptionContainer>
        </div>
    );
};

export default Details;
