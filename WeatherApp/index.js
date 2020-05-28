import apiKey from './apikey';
import { OpenWeather } from './open_weather.js';

// ============================================================================

const app = () => {
    const goButton = document.getElementById('go');
    const input = document.getElementById('zip');
    const result = document.getElementById('results');

    goButton.addEventListener('click', () => {
        const zip = input.value.trim();

        OpenWeather.fetch({ zip, apiKey })
            .fork(
                console.error
                , console.log
            )
    })
};

app();


