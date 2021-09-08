import React, { useEffect, useState } from 'react'
import logo from '../../img/2.png'
import Map from './Map'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Donut from './Donut'
import Axios from '../../api/api';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    marginBottom: {
        marginBottom: '2rem'
    }
}));

const Rainfall = () => {
    const classes = useStyles()
    const [apiData, setApiData] = useState([])
    const [value, setValue] = React.useState(1);
    const [url, setUrl] = useState('https://docs.google.com/spreadsheets/d/1xpm1j5pulQFL4GPeU8LLsp74UeHymHytJEO1olDCzn0/export?format=xlsx')

    useEffect(async () => {
        await Axios.get('/getWeather/2').then(res => setApiData(res.data)).catch(err => console.error(err))
    }, [])

    const handleChange = (event) => {
        const val = event.target.value
        setValue(val);
        val == 1 ? setUrl('https://docs.google.com/spreadsheets/d/1xpm1j5pulQFL4GPeU8LLsp74UeHymHytJEO1olDCzn0/export?format=xlsx') :
            setUrl('https://docs.google.com/spreadsheets/d/1sPRn1djyNIpw20pJIzSCtyYna1mVJIeFf43Rep2UXgM/export?format=xlsx')
    };

    return (
        <div className="section">
            <div className="section__title__box">
                <h1 className="section__title">Rainfall Analysis</h1>
                <img className="section__title__image" src={logo} alt="sun" />
            </div>
            <div className="content__api">
                <FormControl className={classes.formControl, classes.marginBottom}>
                    <InputLabel id="demo-simple-select-label">Station</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Moneragala</MenuItem>
                        <MenuItem value={2}>Mulaitivu</MenuItem>
                    </Select>
                </FormControl>
                <Button href={url} variant='contained' style={{ marginLeft: '2rem', marginTop: '1rem' }} color='primary'>Download Sheet</Button>
                {/* {value == 1 ?
                    <iframe width="1000" height='400' src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQqTIQ8HGrYAmRnx-VamWBltsXrKwwxmNdYaIzb1wxE2iFrJ5tdk1BR_azFshfnPFlWdJEWW2qcvKCB/pubhtml?widget=true&amp;headers=false"></iframe>
                    :
                    <iframe width="1000" height='400' src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQi3rQHeICEfrn50yatT-t5RsztxVp1nDhuLcOI6ClTPzDLUTDnh8S8YXnQTHYrikqq_e-JDlzzIwUT/pubhtml?gid=1192892718&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
                } */}
                <div className="dist">
                    <Donut />
                </div>
                {/* <div className="content__national">
                    <div className="content__picture content__picture__1">
                        &nbsp;
                    </div>
                    <h4 className="content__title content__title__1">
                        <span>Local Level</span>
                    </h4>
                    <div className="content__body">
                        <a target='_blank' href={apiData[0]} className='content__btn'>Moneragala</a>
                        <a target='_blank' href={apiData[1]} className='content__btn'>Mulaitivu</a>
                    </div>
                </div> */}
            </div>
        </div>
    )

}

export default Rainfall