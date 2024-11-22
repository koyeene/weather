import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import './NotFound.css'

const NotFound = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const navigate = useNavigate()

   const toggleMenu = () => setIsMenuOpen((prev) => !prev)

   return (
      <div className="notfound-container">
         {/* 헤더 시작 */}
         <header className="header">
            <div className="title" onClick={() => navigate('/')}>
               기상청
            </div>
            <div className="hamburger-menu" onClick={toggleMenu}>
               <AiOutlineMenu size={30} />
            </div>
            {isMenuOpen && (
               <div className="dropdown-menu">
                  <div onClick={() => navigate('/another-page')}>전국 날씨</div>
                  <div onClick={() => navigate('/Login')}>로그인</div>
                  <div onClick={() => navigate('/NotFound')}>설정</div>
               </div>
            )}
         </header>
         {/* 헤더 끝 */}

         {/* NotFound 페이지 콘텐츠 */}
         <div className="content">
            <h2 className="NotFound">NotFound - 페이지를 찾을 수 없습니다.</h2>
         </div>
      </div>
   )
}

export default NotFound
