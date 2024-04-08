import type { TimeData } from './App';

export const fetchWeatherData = (city: string, setData: (DataWeather: any) => void) => {
    const baseUrl = `http://api.openweathermap.org`
    const path = `/data/2.5/weather`
    const appId = `0ce0696e903175c9d64f88fccfa096a9`
    const query = `units=metric&lang=ru&appid=${appId}`

    fetch(`${baseUrl}${path}?q=${city}&${query}`)
        .then(response => response.json())
        .then(data => {
            const date = new Date()
            const time = date.getHours()
            let minutes = date.getMinutes()
            if (minutes < 10) {
                minutes = 0 + minutes
            }

            setData({
                time,
                minutes,
                city,
                temperature: Math.round(data.main.temp),
                humid: Math.round(data.main.humidity),
                describe: data.weather[0].description,
                weatherCode: data.weather[0].id,
                windSpeed: data.wind.speed
            })
        })
        .catch(error => console.error(error))
}

export const fetchIP = (setData: any) => {
    fetch('https://api.ipbase.com/v2/info?apikey=ipb_live_eWJaqbsziQ1SZFLWl9Pg8BcESuOIpQNsMqcjKdho&ip=1.1.1.1')
        .then(response => response.json())
        .then(({ city }) => fetchWeatherData(city, setData))
        .catch(error => console.log(error))
}
