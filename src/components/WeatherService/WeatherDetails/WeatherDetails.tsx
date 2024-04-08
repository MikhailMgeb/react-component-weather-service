import React, { FC } from 'react';
import type { WeatherDetailsProps } from './../WeatherType';
import { cnWeatherService } from '../WeatherService.classname';

const WeatherDetails: FC<WeatherDetailsProps> = ({ city, temperature, humidity, describe, windSpeed }) => {
    return (
        <div className={cnWeatherService('Details')}>
            <div className={cnWeatherService('city')}>{city}</div>
            <div className={cnWeatherService('temperature')}>{temperature} &deg; C</div>
            <div className={cnWeatherService('describe')}>{describe}</div>
            <div className={cnWeatherService('humidity')}>Влажность {humidity} %</div>
            <div className={cnWeatherService('windSpeed')}>Скорость ветра {windSpeed} м/c</div>
        </div>
    )
}

export { WeatherDetails };