import React, {useState, useEffect} from 'react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TempAndDetails from './components/TempAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function captilizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const App = () => {

  const [query, setQuery] = useState({q: "chennai"});
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const cityName = query.q ? query.q : "current location";
    toast.info(`Fetching weather data for ${captilizeFirstLetter(cityName)}`)

    await getFormattedWeatherData({...query, units}).then( (data) => {
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`)
      setWeather(data);
      console.log(data);
    });
    
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return 'from-cyan-600 to-blue-700';
    const thresold = units === 'metric' ? 20 : 60
    if (weather.temp <= thresold) return 'from-cyan-600 to-blue-700'
    return 'from-yellow-600 to-orange-700';
  }


  return (
    <div className={`min-h-screen flex flex-col justify-center items-center bg-gradient-to-br ${formatBackground()}} px-5`}>
      <div className='w-full max-w-screen-lg bg-transparent py-5 px-2 shadow-xl shadow-gray-400 rounded-lg'>

      
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} setUnits={setUnits}/>

      { weather && (
        <>
        <TimeAndLocation weather={weather}/>
        <TempAndDetails weather={weather} units={units}/>
        <Forecast title='3 hour step forecast' data={weather.hourly} />
        <Forecast title='daily forecast' data={weather.daily}/>
        </>
      )}

      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
      </div>
    </div>
  )
}

export default App 


