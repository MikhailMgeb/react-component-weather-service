import React from 'react';

import { cnWeatherService } from './WeatherService.classname';

import './WeatherService.css';

const WeatherService = () => {
    
    return (
        <div className={cnWeatherService('Widget')}>
        </div>
    );
}

export { WeatherService };