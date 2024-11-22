import React, { useState, useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import './AnotherPage.css'

import { LuCloudSun } from 'react-icons/lu'
import { LuCloudSunRain } from 'react-icons/lu'
import { RiSunFoggyLine } from 'react-icons/ri'

const MainContent = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const [activeTab, setActiveTab] = useState('weather')
   const [weatherData, setWeatherData] = useState(null)
   const [error, setError] = useState(null)
   const [currentSlide, setCurrentSlide] = useState(0)
   const navigate = useNavigate()

   const API_KEY = 'b71850e88210947de84f043af132a5d1'
   const CITY_NAME = 'Incheon'

   const toggleMenu = () => {
      setIsMenuOpen((prev) => !prev)
   }

   const handleTabClick = (tab) => {
      setActiveTab(tab)
      if (tab === 'login') navigate('/login')
      if (tab === 'settings') navigate('/NotFound')
   }

   const handleLogoClick = () => {
      navigate('/')
   }

   const fetchWeatherData = async () => {
      try {
         const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}&units=metric&lang=kr`)
         console.log('API 응답 상태:', response.status)
         if (!response.ok) throw new Error('날씨 정보를 가져오는 중 오류가 발생했습니다.')
         const data = await response.json()
         console.log('API 데이터:', data)
         setWeatherData(data)
         setError(null)
      } catch (error) {
         console.error('API 호출 에러:', error)
         setError(error.message)
      }
   }

   useEffect(() => {
      fetchWeatherData()
   }, [])

   const getFiveDayForecast = () => {
      if (!weatherData) return []
      const forecast = []
      const addedDates = new Set()

      weatherData.list.forEach((item) => {
         const date = new Date(item.dt_txt).toLocaleDateString()
         if (!addedDates.has(date)) {
            forecast.push(item)
            addedDates.add(date)
         }
      })

      return forecast.slice(0, 5)
   }

   const nextSlide = () => {
      setCurrentSlide((prev) => (prev < 4 ? prev + 1 : 0))
   }

   const prevSlide = () => {
      setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 4))
   }

   return (
      <div className="main-container">
         <header className="header">
            <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
               기상청
            </div>
            <div className="hamburger-menu" onClick={toggleMenu}>
               <AiOutlineMenu size={30} />
            </div>
         </header>

         {isMenuOpen && (
            <div className="menu-dropdown">
               <div className="menu-item" onClick={() => handleTabClick('weather')}>
                  전국 날씨
               </div>
               <div className="menu-item" onClick={() => handleTabClick('login')}>
                  로그인
               </div>
               <div className="menu-item" onClick={() => handleTabClick('settings')}>
                  설정
               </div>
            </div>
         )}

         <div className="content2">
            {activeTab === 'weather' && weatherData && !error && (
               <div className="weather-info">
                  <h1 className="temperature">{weatherData.list[0].main.temp}°</h1>
                  <h2 className="main-title">오늘의 날씨를 알려드릴게요.</h2>
                  <p className="description">{weatherData.list[0].weather[0].description}</p>
               </div>
            )}
            {error && (
               <div className="error-message">
                  <p>날씨 정보를 가져오지 못했습니다. 다시 시도해주세요.</p>
                  <p>에러 메시지: {error}</p>
               </div>
            )}
            {activeTab === 'login' && (
               <div className="login-info">
                  <h2>로그인 페이지</h2>
               </div>
            )}
            {activeTab === 'settings' && (
               <div className="settings-info">
                  <h2>설정 페이지</h2>
               </div>
            )}
         </div>

         <div className="card-section2">
            <div className="card2">
               <LuCloudSunRain size={100} />
               <p>구름조금</p>
            </div>
            <div className="card2">
               <RiSunFoggyLine size={100} />
               <p>바람조금</p>
            </div>

            <div className="card3">
               {weatherData ? (
                  <div className="weather-slider">
                     <div className="slider-content" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {getFiveDayForecast().map((item, index) => (
                           <div className={`weather-card ${index === currentSlide ? 'active' : ''}`} key={index}>
                              <div className="icon-text-container">
                                 <LuCloudSun size={48} />
                                 <h3>{new Date(item.dt_txt).toLocaleDateString()}</h3>
                              </div>
                              <p>기온: {item.main.temp}°C</p>
                              <p>날씨: {item.weather[0].description}</p>
                              <p>습도: {item.main.humidity}%</p>
                           </div>
                        ))}
                     </div>
                     <button className="prev" onClick={prevSlide}>
                        &#10094;
                     </button>
                     <button className="next" onClick={nextSlide}>
                        &#10095;
                     </button>
                  </div>
               ) : (
                  <p>날씨 데이터를 불러오는 중...</p>
               )}
            </div>
         </div>
      </div>
   )
}

export default MainContent
