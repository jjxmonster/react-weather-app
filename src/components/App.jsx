import { useRef, useState } from 'react';
import gsap from 'gsap'

import WeatherCart from './weatherCart'

import '../css/App.css';

import cloud1 from '../images/img_cloud1.png'
import cloud2 from '../images/img_cloud2.png'



function App () {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState("")
  const [errorMessage, toggleErrorMessage] = useState(false)

  const div = useRef()
  const cloudOne = useRef()
  const cloudTwo = useRef()
  const timeLine = gsap.timeline({ defaults: { ease: 'power3.ease' } })


  const handleOnChange = e => setCity(e.target.value)


  const handleSearch = () => {


    setCity("")
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8da0d5a20c2c90179ac4ee1f9a3cc2c9`)
      .then(response => {
        if (response.status === 200) {

          timeLine.add("start")
          timeLine.to(cloudOne.current, { duration: 0.5, left: "5%" }, "start")
          timeLine.to(cloudTwo.current, { duration: 0.5, right: "5%" }, "start")
          timeLine.to(div.current, { duration: 0.7, top: "5%" }, "start")
          response.json()
            .then(data => {

              if (errorMessage) {
                toggleErrorMessage(false)
              }
              setWeather({
                "cityName": data.name,
                "feelslike": data.main.feels_like,
                "humidity": data.main.humidity,
                "pressure": data.main.pressure,
                "temp": data.main.temp,
                "tempMax": data.main.temp_max,
                "tempMin": data.main.temp_min,
                "windSpeed": data.wind.speed
              })
            })

        } else {
          setWeather("")
          toggleErrorMessage(true)
        }
      })
  }

  return (

    <div className="app">
      <img ref={ cloudOne } src={ cloud1 } id="cloud1" alt="cloud" />
      <img ref={ cloudTwo } src={ cloud2 } id="cloud2" alt="cloud2" />
      <div ref={ div } className="main">
        <h1>Weather App</h1>
        <input type="text" value={ city } onChange={ handleOnChange } placeholder="Your city..." />
        <button onClick={ handleSearch }>SEARCH</button>
        { errorMessage ? <p className="errorMessage">Ooops something went wrong!</p> : null }
      </div>
      { weather !== "" ? <WeatherCart weather={ weather } /> : null }


    </  div >
  );
}



export default App;
