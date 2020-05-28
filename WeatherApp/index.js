import apiKey from './apikey';
import { OpenWeather } from './open_weather.js';
import { prop, paths, tap, map, compose } from 'ramda';
import moment from 'moment';

const Weather = ([dt, temp]) => ({
    dt: moment.unix(dt).locale('pt-br').calendar()
    , temp
})

const City = ([name, country]) => ({
    name
    , country
})

const toLi = ({ dt, temp }) =>
    `<li>${dt} - <b>${temp}º</li></b>`

const getListTempsAndDates = compose(
    map(compose(toLi, Weather, paths([['dt'], ['main', 'temp']])))
    , prop('list')
);

const cityToString = ({ name, country }) =>
    `${name}/${country}`

const getCity = compose(
    tap(console.log)
    , cityToString
    , City
    , paths([['city', 'name'], ['city', 'country']])
)

const getWeather = zip =>
    OpenWeather.fetch({zip, apiKey})
        .map(results => ({
                place: getCity(results)
                , listTempAndDates: getListTempsAndDates(results).join('')
            })
        )

// ============================================================================

const app = () => {
    const goButton = document.getElementById('go');
    const input = document.getElementById('zip');
    const result = document.getElementById('results');
    const city = document.getElementById('city');

    goButton.addEventListener('click', () => {
        const zip = input.value.trim();

        getWeather(zip)
            .fork(
                console.error
                , ({ place, listTempAndDates }) => {
                    city.innerHTML = place
                    result.innerHTML = listTempAndDates
                }
            )
    })
};

app();


