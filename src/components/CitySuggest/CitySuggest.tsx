import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { cnCitySuggest } from './CitySuggest.classname';
import type { City } from '../../App';

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
            <input className={cnCitySuggest('Input')} value={text} onChange={handleChangeText} />
            {city === undefined ? <p className={cnCitySuggest('Title')}>{textTitle}</p> : <p className={cnCitySuggest('Title')}>{city}</p>}
        </div>
    );
}

export { CitySuggest };