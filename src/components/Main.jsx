import { useState } from "react";
import '../index.css'


const api = {
 key:'d7132fafa6f4094a6654575a3ea6a9fb',
 base:'https://api.openweathermap.org/data/3.0/onecall/timemachine'
}

  export const Main = () => {

    // действия при изменении города в поле ввода
    const [city, setCity] = useState('');

    // действия с данными погоды
    const [weather, setWeather] = useState({});

    function getUrl() {
    return `${api.base}?lat=${latitude}&lon=${longitude}&dt=${Date.now()}&appid=${api.key}`;   
    }
  
    // обработчик, который срабатывает когда нажата клавиша Enter
    const search = evt => {
      if (evt.key === 'Enter') {
        fetch(getUrl()) // отправляем запрос
          .then(res => res.json())  // ответ преобразуем в json
          .then(result => {         // работа с результатом
            setWeather(result);
            setCity('');
            console.log(result);
          });
      }
    }
  
    // форматирование даты
    const format_date = (d) => {
      let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
      let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
  
      return `${day} ${date} ${month} ${year}`
    }

    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] =useState(null)
   
     const getUserLocation1 = () => {   
         if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                 (position) => {
                    const { latitude, longitude } = position.coords;
                        setLatitude(latitude);
                        setLongitude(longitude)
     },
     
     (error) => {
             console.error('Error getting user location:', error);
         }
         
     );   
    }
     
     else {
     console.error('Geolocation is not supported by this browser.');
      }
    }
  
    // JSX разметка
    return (
<>
      <div>
        <h1>Geolocation App</h1>
        <button onClick={getUserLocation1}>Get User Location</button>
          {latitude && longitude && (
      
            <div>
              <h2>User Location</h2>
              <p>Latitude: {latitude}</p>
              <p>Longitude: {longitude}</p>
            </div>
           )}
      </div>

      <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
        <main className="min-h-[100vh] p-[25px] bg-slate-500">
          <div className="w-[100%] block p-4 appearance-none bg-none border-none outline-none bg-slate-700 rounded-2xl shadow-gray-400 text-slate-500 text-xl focus:bg-slate-200">
            <input
              type='text'
              className="w-[100%] block p-4 appearance-none bg-none border-none outline-none bg-slate-700 rounded-2xl shadow-gray-400 text-slate-500 text-xl focus:bg-slate-200"
              placeholder='Поиск...'
              onChange={e => setCity(e.target.value)}
              value={city}
              onKeyPress={search}
            />
          </div>
          {(typeof weather.main != 'undefined') ? (
          <div>
          <div className="text-white text-3xl font-medium text-center">
          <div className="text-white text-3xl font-medium text-center">{weather.name}, {weather.sys.country}</div>
          <div className="text-white text-3xl font-medium text-center">{format_date(new Date())}</div>
        </div>
        <div className="relative inline-block mx-0 ml-[743px] bg-slate-600 rounded-2xl px-4 py-6 text-white text-8xl font-black text-center">
          <div>
            {Math.round(weather.main.temp)}°c
          </div>
          <div>{weather.weather[0].main}</div>
          </div>
        </div>
          ) : ('')}
        </main>
      </div>
      </>
    );    
  }


  
