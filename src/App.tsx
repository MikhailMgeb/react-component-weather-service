import React, { useEffect, useState } from 'react';

import { cnApp } from './App.classname';
import { WeatherService } from './components/WeatherService/WeatherService';
import { fetchIP } from './WeatherUtils';

import './App.css';

export type TimeData = {
  time: number;
  minutes: number;
  city: string;
}

const cities = ['Москва', 'Санкт Петербург']

const App = () => {
  const [data, setData] = useState<TimeData>({ time: 0, minutes: 0, city: '', });

  useEffect(() => {
    return fetchIP(setData);
  }, [])

  if (!cities.includes(data.city) && data.city) {
    cities.push(data.city);
  }

  return (
    <div className={cnApp('App')} data-hour={data.time}>
      {
        cities.map((city, index) =>
          <WeatherService key={index} city={city} />
        )
      }
      <div className="time">
        Последнее обновление {data.time}:{data.minutes}
      </div>
    </div>
  )
}

export { App };
