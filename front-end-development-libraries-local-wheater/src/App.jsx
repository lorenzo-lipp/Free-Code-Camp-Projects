import { useEffect, useState } from 'react';
import Card from './components/Card.jsx';
import './App.css';

export default function App() {
    const noData = {};
    const [data, setData] = useState(noData);

    const getWeather = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                    .then(data => data.json())
                    .then(data => {
                        console.log(data)
                        setData(data);
                    })
                    .catch(e => {
                        setData({err: "API responded with error: " + e.message});
                    });
            }, () => setData({err: "Impossible to get your location..."}))
        } else {
            setData({err: "Impossible to get your location..."});
        }
    }

    useEffect(getWeather, []);

    return (
        <main>
            {data.weather ? <Card data={data}/> : <div className='loading'>{data.err ? data.err : "Loading..."}</div>}
        </main>
    )
}