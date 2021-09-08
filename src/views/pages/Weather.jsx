import React, { useEffect, useState } from 'react'
import logo from '../../img/4.png'
import axios from 'axios';

const Weather = () => {
    const [apiData, setApiData] = useState('')

    useEffect(async () => {
        const apiData = await (await axios.get('https://us-central1-express-439e0.cloudfunctions.net/app/getWeather/4')).data
        await setApiData(apiData)
    }, [])

    return (
        <div className="section">
            <div className="section__title__box">
                <h1 className="section__title">Weather Around Your Location</h1>
                <img className="section__title__image" src={logo} alt="sun" />
            </div>
            <div className="content">
                <div className="content__national">
                    <div className="content__picture content__picture__1">
                        &nbsp;
                    </div>
                    <h4 className="content__title content__title__1">
                        <span>Local Level</span>
                    </h4>
                    <div className="content__body">
                        <a target='_blank' href={apiData[1]} className='content__btn'>Alutwewa</a>
                        <a target='_blank' href={apiData[2]} className='content__btn'>Kotaweheramankada</a>
                        <a target='_blank' href={apiData[3]} className='content__btn'>Iyankankulam</a>
                        <a target='_blank' href={apiData[4]} className='content__btn'>Uliyankulam</a>
                        <a target='_blank' href={apiData[5]} className='content__btn'>Puththwedduwan</a>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Weather;