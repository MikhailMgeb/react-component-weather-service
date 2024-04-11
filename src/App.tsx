import React, { useEffect, useState } from 'react';

import { cnApp } from './App.classname';
import { WeatherService } from './components/WeatherService/WeatherService';
import { CitySuggest } from './components/CitySuggest/CitySuggest';

import './App.css';

export type City = {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
}

const App = () => {
  const [city, setCity] = useState<City | null>(null);

  useEffect(() => {
    if (localStorage.getItem('city') !== null) {
      const storageCity = localStorage.getItem('city');
      setCity(JSON.parse(storageCity || ''))
    }
  }, [])


  const handleAddCity = (city: City | null) => {
    if (city !== null) {
      localStorage.setItem('city', JSON.stringify(city));
    }

    setCity(city);
  }

  return (
    <div className={cnApp()}>
      <CitySuggest onAddCity={handleAddCity} city={city?.name} />
      <WeatherService city={city} />
    </div>
  )
}

export { App };
