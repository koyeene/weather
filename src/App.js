// App.js
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainContent from './components/MainContent/MainContent'
import AnotherPage from './components/MainContent/AnotherPage'
import Login from './components/Login/Login'
import NotFound from './components/MainContent/NotFound'

function App() {
   return (
      <Router>
         <div className="App">
            <Routes>
               <Route path="/" element={<MainContent />} />
               <Route path="/another-page" element={<AnotherPage />} />
               <Route path="/login" element={<Login />} />
               <Route path="/notfound" element={<NotFound />} /> {/* 설정 페이지.. 추가,, */}
            </Routes>
         </div>
      </Router>
   )
}

export default App
