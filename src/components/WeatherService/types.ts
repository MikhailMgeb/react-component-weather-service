import { City } from '../../App';

export type WeatherServiceProps = {
    city: City | null;
}

export type WeatherFetch = {
    main: {
        humidity: number;
        temp: number
    };
    wind: {
        speed: number;
    }
}

export type Weather = {
    temperature: number;
    humidity: number;
    wind: number;
}