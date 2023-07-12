import React from 'react'
import instagram from '/../Users/HP FOLIO 9480/Desktop/instagram-clone/src/Assets/instagram.png'
import NavLinks from './NavLinks'
import MobileNav from './MobileNav'
import Navigation from './Navigation'

const Nav = () => {
  return (
    <nav>
        <button className='logo'>
            <img src={instagram} alt="logo" />
        </button>

        <input type="text" className='search' placeholder='Search' />
       
          <Navigation />

          <MobileNav />

        

       


    </nav>
  )
}

export default Nav