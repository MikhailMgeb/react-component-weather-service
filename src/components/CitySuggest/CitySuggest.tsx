import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { cnCitySuggest } from './CitySuggest.classname';
import type { City } from '../../App';
import IconNav from './../image/navigate-svgrepo-com.svg';

import './CitySuggest.css';

type CitySuggestProps = {
    city: string | undefined;
    onAddCity: (city: City | null) => void;
}

let textTitle: string;
let myCurrentPosition: City;

const CitySuggest: FC<CitySuggestProps> = ({ onAddCity, city }) => {
    const [text, setText] = useState('');

    const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    const handleGetCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ENG`);

            const { city } = await res.json();
            myCurrentPosition = { latitude, longitude, name: city };
            onAddCity(myCurrentPosition);
        },);
    }

    useEffect(() => {
        if (text.length === 0) {
            onAddCity(null);
            return;
        }

        fetch(`https://api.api-ninjas.com/v1/city?name=${text}`, {
            headers: { 'X-Api-Key': 'vmehBHqcLJubIXr/Hzr/sg==aswLFRdHvtsWATlz' },
        })
            .then(response => response.json())
            .then((newCity: City[]) => {
                onAddCity(newCity[0]);
            })

    }, [text]);

    if (text.length === 0) {
        textTitle = 'Введите город';
    } else {
        textTitle = 'Загружаем...';
    }

    return (
        <div className={cnCitySuggest()}>
            <button className={cnCitySuggest('Button')} onClick={handleGetCurrentPosition}>
                <img className={cnCitySuggest('Icon')} src={IconNav} alt="nav" />
            </button>
            <input className={cnCitySuggest('Input')} value={text} onChange={handleChangeText} />
            {city === undefined ? <p className={cnCitySuggest('Title')}>{textTitle}</p> : <p className={cnCitySuggest('Title')}>{city}</p>}
        </div>
    );
}

export { CitySuggest };