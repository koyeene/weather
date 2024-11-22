import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai' // 햄버거 메뉴 아이콘
import './Login.css'

const Login = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const navigate = useNavigate()

   const handleLogin = (e) => {
      e.preventDefault()

      if (!email || !password) {
         setError('이메일과 비밀번호를 모두 입력해주세요.')
         return
      }

      // 로그인 성공 시
      setError('')
      alert('로그인 성공!')
      navigate('/') // 로그인 후 메인 페이지로 이동
   }

   // 햄버거 메뉴 토글
   const toggleMenu = () => {
      setIsMenuOpen((prev) => !prev)
   }

   // 기상청 로고 클릭 시 메인 페이지로 이동
   const handleLogoClick = () => {
      navigate('/') // 메인 페이지로 이동
   }

   return (
      <div className="login-container">
         {/* 헤더 추가 */}
         <header className="header">
            <div className="title" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
               기상청
            </div>
            <div className="hamburger-menu" onClick={toggleMenu}>
               <AiOutlineMenu size={30} /> {/* 햄버거 메뉴 아이콘 */}
            </div>

            {/* 드롭다운 메뉴 */}
            {isMenuOpen && (
               <div className="dropdown-menu">
                  <div onClick={() => navigate('/another-page')}>전국 날씨</div>
                  <div onClick={() => navigate('/login')}>로그인</div>
                  <div onClick={() => navigate('/settings')}>설정</div>
               </div>
            )}
         </header>

         <div className="login-box">
            <h2>로그인</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleLogin}>
               <div className="input-group">
                  <label htmlFor="email">이메일</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="이메일을 입력하세요" />
               </div>

               <div className="input-group">
                  <label htmlFor="password">비밀번호</label>
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="비밀번호를 입력하세요" />
               </div>

               <button type="submit" className="login-button">
                  로그인
               </button>
            </form>

            <div className="signup-link">
               <span>아직 계정이 없으신가요?</span>
               <button onClick={() => navigate('/signup')}>회원가입</button>
            </div>
         </div>
      </div>
   )
}

export default Login
