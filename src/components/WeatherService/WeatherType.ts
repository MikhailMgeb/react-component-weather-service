export type DataWeather = {
    time: number;
    temperature: number;
    humid: number;
    weatherCode: number;
    describe: string;
    windSpeed: number;
    minutes?: number;
    city?: string;
}

export type WeatherDetailsProps = {
    city: string;
    temperature: number;
    humidity: number;
    describe: string;
    windSpeed: number;
}