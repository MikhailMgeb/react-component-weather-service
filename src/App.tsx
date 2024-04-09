import React, { useState } from 'react';

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
  const [dataCity, setDataCity] = useState<City | null>(null);

  const handleAddCity = (city: City | null) => {
    setDataCity(city);
  }

  console.log(dataCity);

  return (
    <div className={cnApp()}>
      <CitySuggest onAddCity={handleAddCity} city={dataCity?.name} />
      <WeatherService />
    </div>
  )
}

export { App };
