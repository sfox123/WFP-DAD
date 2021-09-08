import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import sun from '../../img/sun.png'
import logo from '../../img/0.png'
import Axios from '../../api/api'

const Agromet = (props) => {
    const [archOne, setArchOne] = useState(true);
    const [apiData, setApiData] = useState([])
    const [info, setInfo] = useState([])

    useEffect(async () => {
        await Axios.get('/getWeather/0').then(res => setApiData(res.data)).catch(err => console.error(err))
        await Axios.get('/getAdvisory').then(res => setInfo(res.data)).catch(err => console.error(err))
    }, [])

    const handleClick = (evt) => {
        setArchOne(!archOne)
        let node = evt.target.parentNode.parentNode;
        const elTime = {
            duration: 400,
        }
        node.animate([
            {
                transform: 'rotate(0)',
            },
            {
                transform: 'rotateY(-180deg)',
            }
        ], elTime)

    }

    useEffect(() => {
        const el = document.querySelector('.content__local');
        const elBtn = document.querySelector('.btn');
        const elTime = {
            duration: 400,
        }
        elBtn.addEventListener('click', () => {
            el.animate([
                {
                    transform: 'rotate(0)',
                },
                {
                    transform: 'rotateY(-180deg)',
                }
            ], elTime)
        })
    }, [])
    return (
        <div className="section">
            <div className="section__title__box">
                <h1 className="section__title">Agromet Advisory</h1>
                <img className="section__title__image" src={logo} alt="sun" />
            </div>
            <div className="content">
                <div className="content__national">
                    <div className="content__picture content__picture__1">
                        &nbsp;
                    </div>
                    <h4 className="content__title content__title__1">
                        <span>National Level</span>
                    </h4>
                    <div className="content__body">
                        <a href={apiData[0]} target='_blank' className='content__btn'>Sinhala Version</a>
                        <a href={apiData[1]} target='_blank' className='content__btn'>Tamil Version</a>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="content__local">
                    {archOne ?
                        <>
                            <div className="content__picture content__picture__2">
                                &nbsp;
                            </div>
                            <h4 className="content__title content__title__2">
                                <span>Local Level</span>
                            </h4>
                            <div className="content__body">
                                <a href={apiData[2]} target='_blank' className='content__btn'>Thanamlvila</a>
                                <a href={apiData[3]} target='_blank' className='content__btn'>Thunukai</a>
                                <a id='local' onClick={handleClick} className='content__btn btn content__btn__archive'>Archived Advisories <span className='content__btn__archive__span'>{'->>'}</span></a>
                            </div>
                        </> :
                        <div className='content__arch'>
                            <h4 className='content__arch__title'>
                                Archived Advisories
                            </h4>
                            <div className="content__arch__body">
                                {info.map((x, i) => (
                                    <a href={x.link} key={i} className='content__arch__link'>{x.name}</a>
                                ))}
                                <a id='close' onClick={handleClick} className='m-bot content__btn content__btn__archive'>{'<<- Back'}<span className='content__btn__archive__span'>{'->>'}</span></a>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Agromet;