import { Task } from '../types.js';
import { compose, invoker } from 'ramda';

const makeWeatherUrl = ({ zip, apiKey }) =>
    `http://api.openweathermap.org/data/2.5/forecast?zip=${zip},br&units=metric&APPID=${apiKey}`

const parseJSON = invoker(0, 'json');

const fetchIt = (url) =>
    Task((rej, res) =>
        fetch(url)
            .then(parseJSON)
            .then(res)
            .catch(rej)
    );

const toJSON = x => x.json();

const OpenWeather = {
    fetch: compose(
        fetchIt
        , makeWeatherUrl
    )
};

export { OpenWeather };
