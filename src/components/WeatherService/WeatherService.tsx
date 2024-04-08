import React, { FC, useEffect, useState } from 'react';

import { cnWeatherService } from './WeatherService.classname';
import { fetchWeatherData } from '../../WeatherUtils';
import { WeatherDetails } from './WeatherDetails/WeatherDetails';
import { WeatherIcon } from './WeatherIcon/WeatherIcon';
import { DataWeather } from './WeatherType';

import './WeatherService.css';

export type WeatherService = {
    city: string;
}

const INITIAL_STATE = {
    time: 0,
    temperature: 0,
    humid: 0,
    weatherCode: 0,
    describe: '',
    windSpeed: 0,
}

const WeatherService: FC<WeatherService> = ({ city }) => {
    const [data, setData] = useState<DataWeather>({ ...INITIAL_STATE });

    useEffect(() => {
        fetchWeatherData(city, setData);
    }, [])


    return (
        <div className={cnWeatherService('Widget')}>
            <WeatherIcon
                weatherCode={data.weatherCode}
                time={data.time} />
            <WeatherDetails
                city={city}
                temperature={data.temperature}
                humidity={data.humid}
                describe={data.describe}
                windSpeed={data.windSpeed} />
        </div>
    );
}

export { WeatherService };