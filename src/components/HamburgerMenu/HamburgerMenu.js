import React, { useState } from 'react'
import './Header.css'

function HamburgerMenu() {
   const [menuOpen, setMenuOpen] = useState(false)

   const toggleMenu = () => {
      setMenuOpen(!menuOpen)
   }

   return (
      <>
         <div className="hamburger-menu" onClick={toggleMenu}>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
         </div>
         {menuOpen && (
            <nav className="menu">
               <ul>
                  <li>메인</li>
               </ul>
            </nav>
         )}
      </>
   )
}

export default HamburgerMenu
