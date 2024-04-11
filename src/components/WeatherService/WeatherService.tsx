import React from 'react';

import { cnWeatherService } from './WeatherService.classname';

import './WeatherService.css';

const url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;

const WeatherService = () => {

    return (
        <div className={cnWeatherService('')}>
        </div>
    );
}

export { WeatherService };