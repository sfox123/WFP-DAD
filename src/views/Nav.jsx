import React, { useContext, useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import Agromet from './pages/Agromet'
import Drought from './pages/Drought'
import Rainfall from './pages/Rainfall'
import Tank from './pages/Tank'
import Weather from './pages/Weather'
import Forecast from './pages/Forecast'
import Login from './pages/Login'

import logo from '../img/logo.png'

const handleResponse = (evt) => {

    const el = document.querySelector('.ul').classList;
    if (el.contains('bar__ul')) {
        el.toggle('bar__ul');
        el.toggle('bar__ul__phone');
    } else {
        el.toggle('bar__ul');
        el.toggle('bar__ul__phone');
    }
}

const Nav = () => {

    const navItems = ["Agromet Advisory", "Tank-Water Level", "Rainfall Analysis", "Drought Analysis", "weather around your location", "Weather forecast"];
    const [active, setActive] = useState(0);

    const handleClick = (btn) => {
        handleResponse()
        const className = btn.currentTarget.id
        setActive(className)
        const arr = document.getElementsByClassName("bar__list");

        for (let i = 0; i < arr.length; i++) {
            if (i == 6) {
                document.querySelector('.bar__list__selected').classList.remove('bar__list__selected');
            }
            else if (i == className) {
                arr[i].classList.add("bar__list__selected")
            } else {
                arr[i].classList.remove("bar__list__selected")
            }
        }
    }

    return (
        <>
            <div className="container">
                <div className='Nav'>
                    <div className="Nav__logobox">
                        <a href="#" className="Nav__home">
                            <img src={logo} alt="logo" className='Nav__logo' />
                        </a>
                    </div>
                    <div onClick={handleClick} id={6} className="login">

                    </div>
                </div>
                <div className="bar">
                    <div className="bar__items">
                        <ul className="ul bar__ul">
                            <li key='10' onClick={handleResponse} className='bar__bar'><a href="#" className='bar__link'><FontAwesomeIcon icon={faBars} /></a></li>
                            {navItems.map((x, i) => (
                                <li onClick={handleClick} id={i} key={i} className={`bar__list ${i == 0 ? 'bar__list__selected' : null}`}><a href="#" className='bar__link'>{x}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    {active == 0 ? <Agromet /> : null}
                    {active == 3 ? <Drought /> : null}
                    {active == 2 ? <Rainfall /> : null}
                    {active == 1 ? <Tank /> : null}
                    {active == 4 ? <Weather /> : null}
                    {active == 5 ? <Forecast /> : null}
                    {active == 6 ? <Login /> : null}
                </div>
            </div>
        </>
    )
}

export default Nav;