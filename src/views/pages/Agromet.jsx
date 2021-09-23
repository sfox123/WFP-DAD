import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import logo from '../../img/0.png'
import Axios from '../../api/api'

const Agromet = (props) => {
    const [archOne, setArchOne] = useState(true);
    const [apiData, setApiData] = useState([])
    const [info, setInfo] = useState([])
    const [load, setLoad] = useState(true)
    const [aList, setAList] = useState([]);

    useEffect(async () => {
        const tmp = [];
        let TMP = [];

        let { data } = await Axios.get('/getWeather/0')
        setApiData(data);
        await Axios.get('/getAdvisory').then(res => {
            setInfo(res.data);

        }).catch(err => console.error(err))

        if (aList.length == 0) {
            info.map((x, i) => { tmp.push(x.author) })

            TMP = tmp.filter(function (item, pos, self) {
                return self.indexOf(item) === pos;
            })


            setAList(TMP)
        }

        setLoad(false)

    }, [aList])


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


    return (
        <>
            {load ? <CircularProgress /> :

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
                                <a href={apiData[0]} target='_blank' rel="noreferrer" className='content__btn'>Sinhala Version</a>
                                <a href={apiData[1]} target='_blank' rel="noreferrer" className='content__btn'>Tamil Version</a>
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
                                        {aList.map((x, i) => (
                                            <a href='#' key={i} className='content__btn'>{x}</a>
                                        ))}
                                        {/* <a id='local' onClick={handleClick} className='content__btn btn content__btn__archive'>Archived Advisories <span className='content__btn__archive__span'>{'->>'}</span></a> */}
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
            }
        </>
    )
}

export default Agromet;