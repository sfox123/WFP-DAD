import React, { useEffect, useState } from 'react'
import logo from '../../img/1.png'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
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

const Tank = () => {
    const classes = useStyles()
    const [apiData, setApiData] = useState([])
    const [value, setValue] = React.useState(1);
    const [url, setUrl] = useState('https://docs.google.com/spreadsheets/d/1vglLgviFoxQQwa2Wgq1GhCyupgVtmr12WrGkRcSIZ6w/export?format=xlsx')

    useEffect(async () => {
        await Axios.get('/getWeather/1').then(res => setApiData(res.data)).catch(console.log(err => {
            alert('Connection Error Reloading Page');
            window.location.reload()
        }))
        // await setApiData(apiData)
    }, [])

    const handleChange = (event) => {
        const val = event.target.value
        setValue(val);
        val == 1 ? setUrl('https://docs.google.com/spreadsheets/d/1vglLgviFoxQQwa2Wgq1GhCyupgVtmr12WrGkRcSIZ6w/export?format=xlsx') :
            setUrl('https://docs.google.com/spreadsheets/d/1G7Cj1a1OGINUXtYCO8qs7kF7Aweh6TiJERcfzW-vPxU/export?format=xlsx')
    };

    return (
        <div className="section">
            <div className="section__title__box">
                <h1 className="section__title">Tank-Water Level</h1>
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
                        <MenuItem value={1}>Thanamalvila</MenuItem>
                        <MenuItem value={2}>Thunukai</MenuItem>
                    </Select>
                </FormControl>
                <Button href={url} variant='contained' style={{ marginLeft: '2rem', marginTop: '1rem' }} color='primary'>Download Sheet</Button>
                {value == 1 ?
                    <iframe width="1000" height='400' src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRT55xoyzu9iZwZDeKJi0bb1VjyezY1AFjqFLKrxD-JkAe9DTBzcTsOhmHb_RE5C2pmQYgWhYVvoxfs/pubhtml?widget=true&amp;headers=false"></iframe>
                    :
                    <iframe width="1000" height='400' src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTODNREZ7ov2KtiJr7-sPxLFZDCLlXP34drU4SrOCaLIbsXmwadVrlbSQqBtidM8zNZsq5MoIG7fNl3/pubhtml?widget=true&amp;headers=false"></iframe>
                }
                {/* <div className="content__national">
                    <div className="content__picture content__picture__1">
                        &nbsp;
                    </div>
                    <h4 className="content__title content__title__1">
                        <span>Local Level</span>
                    </h4>
                    <div className="content__body">
                        <a target='_blank' href={apiData[0]} className='content__btn'>Thanamalvila</a>
                        <a target='_blank' href={apiData[1]} className='content__btn'>Thunukai</a>
                    </div> */}
            </div>
        </div>
        // </div >
    )

}

export default Tank;