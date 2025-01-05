import React, { useState } from 'react';
import axios from 'axios';
import weatherIcons from './weatherIcons';
import { VscLocation } from 'react-icons/vsc';
import { CgSearch } from 'react-icons/cg';

function WeatherCard() {

  const [weatherData, setWeatherData] = useState();
  const [icon, setIcon] = useState('');
  const [city, setCity] = useState('');
  const apiKey = '1d8c89daf41e579d0c451ae2919ad835';
  const unit = 'metric';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);

      const weatherCode = weatherData && weatherData.weather[0].icon;
      setIcon(weatherIcons[weatherCode]);

    } catch (e) {
      if (city === '') {
        window.alert('please enter the city name');
      }
      else (city !== weatherData.name)
      {
        window.alert('please enter the correct city name');
      }
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData();
  }

  const handleChange = (e) => {
    setCity(e.target.value);
  }

  const date = new Date();
  const currentDay = date.toLocaleString('en-US', { weekday: 'long' });
  const today = currentDay.toLocaleUpperCase();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return (
    <>
      <h1 className="text-center text-white-500 text-5xl font-extrabold font-bebas">Weather Now</h1>
      <div className='container w-full h-92 mx-auto m-8 p-8 shadow-lg rounded-xl backdrop-blur-sm bg-white/10 backdrop-opacity-none md:w-1/2'>
        <div className='flex justify-center mb-5'><form onSubmit={handleSearch}><input onChange={handleChange} value={city} className='w-80 bg-black-200 rounded-md shadow-sm outline-none p-2 text-black' type='text' placeholder='Search City..' /><button type="submit" className='absolute -ml-12 p-2 text-2xl text-black'><CgSearch /></button></form></div>
        {weatherData ?
          (weatherData && (<div><div className='flex flex-row justify-between'>
            <h2 className='text-left flex flex-row text-4xl font-bold font-bebas'><span><VscLocation /></span>{weatherData.name}, {weatherData.sys.country}</h2>
            <div className='flex flex-row'><p className='p-3'><span>&#8595; </span>{parseInt(weatherData.main.temp_min)}<sup>&deg;</sup>C</p>
              <p className='p-3'><span>&#8593; </span>{parseInt(weatherData.main.temp_max)}<sup>&deg;</sup>C</p></div>
          </div>
            <div className='flex md:flex-row w-full justify-between'>
              <div className='flex flex-col mt-5 text-left w-1/4 font-oswald font-light justify-start'>
                <div className='text-xl'>{today}</div>
                <div className='text-xl'>{day}/{month}/{year}</div>
                <div className='my-2'>Wind<img className='w-8 h-8' src={`./../assets/icons/wind.svg`} />{weatherData.wind.speed}km/h</div>
                <div className='flex flex-col mb-2'>Humidity {weatherData.main.humidity}%</div>
              </div>
              <div className='flex flex-row w-3/4 justify-end'>
                <div className='mr-5 -mt-10 md:-mt-5'>
                  {icon && <img className='w-28 h-28 md:w-48 md:h-48 mt-28 md:mt-10' src={`./../assets/icons/${icon}`} alt={weatherData.weather[0].description} />}
                  <p className='-mt-5 md:-mt-10 font-oswald font-light md:text-2xl'>{weatherData.weather[0].main}</p>
                </div>
                <div className='mt-20 md:mx-10'><h2 className='text-6xl md:text-8xl font-bebas'>{parseInt(weatherData.main.temp)}<sup className='text-4xl md:text-6xl'>&deg;</sup>C</h2>
                </div>
              </div>
            </div>
          </div>)) : (<div className='flex justify-center'><img className='h-48 w-48' src='./../assets/img/search-city.png' /></div>)}
      </div>

    </>
  )
}

export default WeatherCard;