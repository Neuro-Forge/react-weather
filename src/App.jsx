import { useState } from 'react'
import style from './components/App.module.css'
import axios from 'axios';
import { Oval } from 'react-loader-spinner';  
function App() {
  const [city, setcity] = useState("");
  const [weather, setWeather] = useState({
    loading:false,
    data:{},
    error:null
    
  })

const search = (event)=>{
  if (event.key ==="Enter"){
    setcity("")
    setWeather({
      ...weather,loading:true
    })
    axios.get("https://api.openweathermap.org/data/2.5/weather",{
      params:{
        q:city,
        units:"metric",
        appid:"6d073fdaf621ed25480b5faef1c19b79"
      }
    }).then(res =>{
      setWeather({
        ...weather,
        data:res.data,
        loading:false,
        error:false
      })
    }).catch(err =>{
      setWeather({ ...weather,data:{},error:true})
    })
  }
}

  return (
    <div className={style.app}>
        
        <div className={style.weather}>
          <h1>Weather App</h1>
           <div className={style.city}>
             <input className='search' type='text' placeholder='enter city' value={city}
             onChange={(e)=>setcity(e.target.value)}
             onKeyDown={search}></input>
           </div>
           {
            <Oval
              height={80}
              width={80}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={weather.loading}
              ariaLabel='oval-loading'
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
           }
           {
            weather.error && <p className={style.error}>City not found</p>
           }
           {
            weather.data.main && (
              <div className={style.weatherInfo}>
                <h2>{weather.data.name}, {weather.data.sys?.country}</h2>
                <p className={style.temp}>{weather.data.main.temp}°C</p>
                <p className={style.description}>{weather.data.weather[0].main}</p>
                <p>Feels like: {weather.data.main.feels_like}°C</p>
                <p>Humidity: {weather.data.main.humidity}%</p>
              </div>
            )
           }
        </div>
    </div>
  )
}

export default App
