import { useState, useEffect } from 'react'

const Weather = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null) // ← inicializamos el estado

  // useEffect para hacer fetch cuando cambian lat o lon
  useEffect(() => {
    if (!lat || !lon) return

    const API_KEY = '16b2818eb47dddc42398c58782575ab7'
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(err => console.log(err))
  }, [lat, lon])

  // 2️⃣ render condicional: si weather aún es null, mostramos "Loading..."
  if (!weather) return <p>Loading weather...</p>

  return (
    <div>
      <h2>Weather</h2>
      <p>Temperature: {weather.current.temp}°C</p>
      <p>Wind: {weather.current.wind_speed} m/s</p>
      <img 
        src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} 
        alt={weather.current.weather[0].description} 
      />
    </div>
  )
}

export default Weather