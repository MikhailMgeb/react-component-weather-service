import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { cnCitySuggest } from './CitySuggest.classname';
import type { City } from '../../App';
import IconNav from './../image/navigate-svgrepo-com.svg';

import './CitySuggest.css';

type CitySuggestProps = {
    city: string;
    onAddCity: (city: City[]) => void;
}

let textTitle;

const CitySuggest: FC<CitySuggestProps> = ({ onAddCity, city }) => {
    const [text, setText] = useState('');

    const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    const handleGetMyLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ENG`);

            const { city } = await res.json();
            onAddCity([{ latitude, longitude, name: city }]);
        },);
    }

    useEffect(() => {
        if (text.length === 0) {
            onAddCity([]);
            return;
        }

        fetch(`https://api.api-ninjas.com/v1/city?name=${text}`, {
            headers: { 'X-Api-Key': 'vmehBHqcLJubIXr/Hzr/sg==aswLFRdHvtsWATlz' },
        })
            .then(response => response.json())
            .then((newCity: City[]) => {
                onAddCity(newCity);
            })
    }, [text]);

    if (text.length === 0) {
        textTitle = 'Введите город';
    } else {
        textTitle = 'Загружаем...';
    }

    return (
        <div className={cnCitySuggest()}>
            <button className={cnCitySuggest('Button')} onClick={handleGetMyLocation}>
                <img className={cnCitySuggest('Icon')} src={IconNav} alt="nav" />
            </button>
            <input className={cnCitySuggest('Input')} value={text} onChange={handleChangeText} />
            {city === undefined ? <p className={cnCitySuggest('Title')}>{textTitle}</p> : <p className={cnCitySuggest('Title')}>{city}</p>}
        </div>
    );
}

export { CitySuggest };