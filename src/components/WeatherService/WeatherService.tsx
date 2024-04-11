import React, { FC, useEffect, useState } from 'react';

import { cnWeatherService } from './WeatherService.classname';
import { Weather, WeatherFetch, WeatherServiceProps } from './types';

import './WeatherService.css';

const getCelsius = (kelvinValue: number): number => {
    return kelvinValue - 273.15;
}

const WeatherService: FC<WeatherServiceProps> = ({ city }) => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [lastCity, setlastCity] = useState<string>('');

    useEffect(() => {
        if (city === null) {
            return;
        }

        if (lastCity === city.name) {
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city?.latitude}&lon=${city?.longitude}&appid=51d524e6591a001b21768fd08d6d589d
        `)
            .then(response => response.json())
            .then((data: WeatherFetch) => {
                setlastCity(city.name)
                setWeather({
                    temperature: data.main.temp,
                    humidity: data.main.humidity,
                    wind: data.wind.speed,
                })
            })
    }, [city])

    console.log(weather);

    return (
        <div className={cnWeatherService('')}>

        </div>
    );
}

export { WeatherService };