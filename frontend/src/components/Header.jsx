import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className='bg-slate-900 text-white'>
            <div className='Header flex items-center justify-between md:py-3 font-bold sm:text-lg text-[10px] w-full p-2'>
                 <div className="left sm:p-1">
                    <img src={logo} alt="" className="sm:h-[60px] sm:w-[60px] h-[30px] w-[30px]" />
                </div>
                <div className="right flex md:gap-12 md:mr-8 sm:gap-6 mr-3 gap-3 ">
                    <Link to='/'>Home</Link>
                    <Link to='/'>About</Link>
                    <Link to='/signup'>Signup</Link>
                    <Link to='/login'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Header
