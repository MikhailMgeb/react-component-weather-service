import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

import { cnCitySuggest } from './CitySuggest.classname';
import type { City } from '../../App';
import IconNav from './../image/navigate-svgrepo-com.svg';

import './CitySuggest.css';

type CitySuggestProps = {
    city: string | undefined;
    onAddCity: (city: City | null) => void;
};

let textTitle: string;
let myCurrentPosition: City;

const CitySuggest: FC<CitySuggestProps> = ({ onAddCity, city }) => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [lastSearch, setLastSearch] = useState('');
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleGetCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ENG`);

            const { city } = await res.json();
            myCurrentPosition = { latitude, longitude, name: city };
            onAddCity(myCurrentPosition);
        },);
    };

    useEffect(() => {
        if (loading) {
            return;
        }

        if (search === '') {
            onAddCity(null);
            setLastSearch('');
            setLoading(false);
            return;
        }

        if (lastSearch === search) {
            return;
        }

        setSearch(search);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            setLoading(true);

            fetch(`https://api.api-ninjas.com/v1/city?name=${search}`, {
                headers: { 'X-Api-Key': 'm1n74jUjViEVpnrpDeGNwA==lntdcBrfhcI2p5x7' },
            })
                .then(response => response.json())
                .then((newCity: City[]) => {
                    onAddCity(newCity[0]);
                })
                .finally(() => {
                    setLoading(false);
                    setLastSearch(search);
                })
        }, 400)


    }, [lastSearch, loading, search]);

    if (search.length === 0) {
        textTitle = 'Введите город';
    } else {
        textTitle = 'Загружаем...';
    }

    return (
        <div className={cnCitySuggest()}>
            <button className={cnCitySuggest('Button')} onClick={handleGetCurrentPosition}>
                <img className={cnCitySuggest('Icon')} src={IconNav} alt="nav" />
            </button>
            <input className={cnCitySuggest('Input')} value={search} onChange={handleChangeText} />
            {city === undefined ? <p className={cnCitySuggest('Title')}>{textTitle}</p> : <p className={cnCitySuggest('Title')}>{city}</p>}
        </div>
    );
}

export { CitySuggest };
