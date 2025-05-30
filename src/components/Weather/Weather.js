'use client'
import * as React from "react";
import { useState, useEffect } from "react";
import { styled, useTheme } from '@mui/material/styles';
import styles from './Weather.module.css';
import { IconButton} from "@mui/material";
import { CloseTwoTone, ExpandMoreTwoTone, LocationCity, LocationOn } from '@mui/icons-material';
import Image from "next/image";

// Styled components for Weather Widget
const WeatherWidget = styled('div')(({ theme }) => ({
    display: 'grid',
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor:
         'var(--background-primary)',
    backdropFilter: 'blur(40px)',
}));    

const TinyText = styled('div')(({ theme }) => ({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
}));

//current time and date 


function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const theme = useTheme();
    const [location, setLocation] = useState(null);
    const [open, setOpen] = useState(false);

    const getWeather = async (latitude, longitude) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f0ccc6f6a70ebbfb8c22be550e5c0f76`);
        const data = await response.json();
        setWeatherData(data);
    };

    const getLocation = async () => {
        const response = await fetch('https://ipapi.co/json');
        const data = await response.json();
        setLocation(data);
        getWeather(data.latitude, data.longitude);
    };
    const convertToF = (kelvin) => {
        return Math.round((kelvin - 273.15) * 9/5 + 32);
    }


    useEffect(() => {
        getLocation();
    }, []);

    const WeatherDetails = ({weatherData}) => {
        if (!weatherData) return <div>Loading...</div>;
        return (
            <div style={{ height: "100px", width: "100px" }}>
               {weatherData.weather[0].description}
            </div>
        );
    };

    const handleOpen = () => setOpen(!open);

    return (
        <div className={styles.weatherCard}>    
    {weatherData ? (
        <WeatherWidget>
            <span>
                <div 
                className={styles.location}
                >
                    <LocationOn
                    style={{verticalAlign: 'middle', fontSize: '20px'}}
                    />
                    {weatherData.name}
                </div>
                
     
          <div className={styles.weatherDetails}>
            <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            style={{height: '50px'}}
            alt="weather icon"
            />
            </div>
            <div className={styles.weather}>
                {weatherData.weather[0].main}
            </div>
            <div className={styles.temperature}>
                {weatherData.weather[0].temperature}
                
            </div>
          
            </span>

        </WeatherWidget>
    ) : (
        <TinyText>Loading...</TinyText>
    )}

</div>

    );

}

export default Weather;