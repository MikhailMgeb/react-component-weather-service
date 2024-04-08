import React, { FC } from 'react'

type WeatherIconProps = {
    time: number;
    weatherCode: number;
}

const WeatherIcon: FC<WeatherIconProps> = ({ time, weatherCode }) => {
    const timeOfDay = (time > 7 && time < 18) ? 'day' : 'night'
    const className = `weather-icon wi wi-owm-${timeOfDay}-${weatherCode}`

    return <i className={className} />
}


export { WeatherIcon }