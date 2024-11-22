import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setWeatherData, setError } from '../store/weatherSlice'
import axios from 'axios'
import { AiOutlineMenu } from 'react-icons/ai'
import { AiOutlineRise, AiOutlineFall } from 'react-icons/ai'
import { TiWeatherWindyCloudy, TiWeatherPartlySunny } from 'react-icons/ti'
import { BiSolidDroplet, BiCloset } from 'react-icons/bi'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import './MainContent.css' // 기존 CSS 파일을 import

const MainContent = () => {
   const [location, setLocation] = useState('incheon')
   const [inputValue, setInputValue] = useState(location)
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const { data: weatherData, error } = useSelector((state) => state.weather)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const apiKey = 'b71850e88210947de84f043af132a5d1'

   useEffect(() => {
      axios
         .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=kr`)
         .then((response) => {
            const data = response.data
            if (data.cod === 200) {
               dispatch(setWeatherData(data))
               dispatch(setError(null))
            } else {
               dispatch(setError('해당 지역의 날씨를 찾을 수 없습니다.'))
            }
         })
         .catch(() => {
            dispatch(setError('날씨 데이터를 가져오는 데 실패했습니다.'))
         })
   }, [location, dispatch])

   const iconUrl = weatherData ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png` : ''

   const toggleMenu = () => setIsMenuOpen((prev) => !prev)

   const handleSearch = (e) => {
      e.preventDefault()
      setLocation(inputValue)
   }

   const handleInputChange = (e) => setInputValue(e.target.value)

   return (
      <div className="main-container">
         <header className="header">
            <div className="title" onClick={() => navigate('/')}>
               기상청
            </div>
            <div className="hamburger-menu" onClick={toggleMenu}>
               <AiOutlineMenu size={30} />
            </div>
            {isMenuOpen && (
               <div className="dropdown-menu">
                  <div onClick={() => navigate('/another-page')}>인천 날씨</div>
                  <div onClick={() => navigate('/Login')}>로그인</div>
                  <div onClick={() => navigate('/NotFound')}>설정</div>
               </div>
            )}
         </header>

         <div className="weather-icon">
            <img src={iconUrl} alt="날씨 아이콘" />
         </div>

         <div className="content">
            {error ? (
               <div className="error">{error}</div>
            ) : (
               <>
                  <div className="temperature1">{weatherData?.main?.temp}°</div>
                  <div className="subtitle">{weatherData?.weather[0]?.description}</div>
               </>
            )}

            <Box className="SearchBar" component="form" onSubmit={handleSearch}>
               <TextField label="지역을 입력하세요." variant="outlined" fullWidth value={inputValue} onChange={handleInputChange} />
            </Box>

            <div className="card-container">
               <div className="card">
                  <AiOutlineRise size={50} color="#333" />
                  최고기온: {weatherData?.main?.temp_max}°C
               </div>
               <div className="card">
                  <AiOutlineFall size={50} color="#333" />
                  최저기온: {weatherData?.main?.temp_min}°C
               </div>
               <div className="card">
                  <TiWeatherWindyCloudy size={50} color="#333" />
                  온도: {weatherData?.main?.temp}°C
               </div>
               <div className="card">
                  <BiSolidDroplet size={50} color="#333" />
                  습도: {weatherData?.main?.humidity}%
               </div>
               <div className="card">
                  <BiCloset size={50} color="#333" />
                  옷차림: {weatherData?.weather[0]?.main}
               </div>
               <div className="card">
                  <TiWeatherPartlySunny size={50} color="#333" />
                  기후: {weatherData?.weather[0]?.description}
               </div>
            </div>
         </div>
      </div>
   )
}

export default MainContent
