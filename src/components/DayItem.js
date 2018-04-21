import React from 'react';
import { getDate } from '../utils/helpers';
import DayContainer from "../styled-components/DayContainer";

const DayItem = props => {
  let date = getDate(props.day.dt);
  let icon = props.day.weather[0].icon;
  let imgUrl = require(`../images/weather-icons/${icon}.svg`);

  return (
    <li onClick={props.onClick}>
      <img className='weather' src={imgUrl} alt='Weather' />
      <h2 className='subheader'>{date}</h2>
    </li>
  );
};

export default DayItem;