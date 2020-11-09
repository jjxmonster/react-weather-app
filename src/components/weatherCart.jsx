import gsap from 'gsap'

import cloudy from '../images/cloudy.png'
import sunny from '../images/sunny.png'
import snow from '../images/snow_light.png'
import { useEffect, useRef } from 'react'


const WeatherCart = ({ weather }) => {

    const cart = useRef()
    const timeLine = gsap.timeline({ defaults: { ease: 'power3.ease' } })
    const image = () => {
        const { temp } = weather;

        if (temp > 0 && temp < 15) {
            return cloudy
        }
        else if (temp < 0) {
            return snow
        } else if (temp > 15) {
            return sunny
        }
    }


    useEffect(() => {
        timeLine.from(cart.current, { duration: 0.5, delay: 0.3, opacity: 0, top: "45%" },)
    }, [])

    return (

        <div ref={ cart } className="cart">
            <div className="cartTop">
                <div className="cartTitle">
                    <h1>{ weather.cityName }</h1></div>
                <div className="imgWeather">

                    <img src={ image() } alt="" />
                </div>


            </div>

            <div className="weatherResult">
                <div>
                    <h2 className="prefix" >Temperature/Perceptible:</h2>
                    <h2 className="res">{ weather.temp }°C / { weather.feelslike }°C</h2>
                </div>
                <div>
                    <h2 className="prefix" >Max/Min:</h2>
                    <h2 className="res">{ weather.tempMax }°C / { weather.tempMin }°C</h2>
                </div>
                <div>
                    <h2 className="prefix" >Humadity: </h2>
                    <h2 className="res">{ weather.humidity }%</h2>
                </div>
                <div>
                    <h2 className="prefix"  >Pressure:</h2>
                    <h2 className="res">{ weather.pressure } hPa</h2>
                </div>
                <div>
                    <h2 className="prefix"  >Wind Speed:</h2>
                    <h2 className="res">{ weather.windSpeed } km/h</h2>
                </div>
            </div>


        </div >
    );
}

export default WeatherCart;