import apiKey from './apikey';
import { Task } from '../types.js';
import { compose } from 'ramda';

const makeWeatherUrl = (zip) =>
        `http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&APPID=${apiKey}`

const fetchIt = (url) =>
    Task((rej, res) =>
        fetch(url)
            .then(res)
            .catch(rej)
    );

const OpenWeather = {
    fetch: compose(
        fetchIt
        , makeWeatherUrl
    )
}

// ============================================================================

const app = () => {
    const goButton = document.getElementById('go');
    const input = document.getElementById('zip');
    const result = document.getElementById('results');

    goButton.addEventListener('click', () => {
        const zipCode = input.value.trim();

        OpenWeather.fetch(zipCode)
            .fork(
                console.error
                , console.log
            )
    })
};

app();


