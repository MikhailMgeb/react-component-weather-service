import React, { useState } from 'react';

import { cnApp } from './App.classname';
import { WeatherService } from './components/WeatherService/WeatherService';
import { CitySuggest } from './components/CitySuggest/CitySuggest';

import './App.css';

export type City = {
  'name': string;
  'latitude': number;
  'longitude': number;
  'country': string;
  'population': number;
  'is_capital': boolean
}

const App = () => {
  const [city, setCity] = useState<City[]>([]);

  const handleAddCity = (city: City[]) => {
    setCity(city);
  }

  return (
    <div className={cnApp('App')}>
      <CitySuggest onAddCity={handleAddCity} city={city[0]?.name} />
      <WeatherService />
    </div>
  )
}

export { App };
