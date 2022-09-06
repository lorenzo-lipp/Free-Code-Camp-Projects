import { useState } from "react";
import getIcon from "../utils/getIcon.js";
import convertToFahrenheit from "../utils/convertToFahrenheit.js";

export default function Card(props) {
    const [unit, setUnit] = useState("Celsius");

    const handleChangeUnit = () => {
        if (unit === "Celsius") setUnit("Fahrenheit");
        else setUnit("Celsius");
    }
    return (
        <div className="temperature-card">
            <div className="status">{props.data.weather[0].main.toUpperCase()}</div>
            <img className="icon" src={getIcon(props.data.weather[0].main.toLowerCase())} />
            <div className="description">{props.data.weather[0].description.toUpperCase()}</div>
            <div className="temperature">
                <div className="min">
                    <img src="https://cdn-icons-png.flaticon.com/128/1163/1163665.png" />
                    <p>{"Min: " + (unit === "Celsius" ? (props.data.main.temp_min + " ºC") : (convertToFahrenheit(props.data.main.temp_min) + " ºF"))}</p>
                </div>
                <div className="now">
                    <p>{unit === "Celsius" ? (props.data.main.temp + " ºC") : (convertToFahrenheit(props.data.main.temp) + " ºF")}</p>
                </div>
                <div className="max">
                    <img src="https://cdn-icons-png.flaticon.com/128/1163/1163667.png" />
                    <p>{"Max: " + (unit === "Celsius" ? (props.data.main.temp_max + " ºC") : (convertToFahrenheit(props.data.main.temp_max) + " ºF"))}</p>
                </div>
            </div>
            <div className="city">{props.data.name + " - " + props.data.sys.country}</div>
            <div className="credits">Icons from <a href="https://www.flaticon.com/authors/iconixar">iconixar</a></div>
            <button className="change-measure-unit" onClick={handleChangeUnit}>Change to <br/>{unit === "Celsius" ? "Fahrenheit" : "Celsius"}</button>
        </div>
    );
}