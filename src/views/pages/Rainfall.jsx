import React, { useEffect, useState } from 'react'
import logo from '../../img/2.png'
import BarChart from './Chart'
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

const mS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const Rainfall = () => {
    const classes = useStyles()
    const [apiData, setApiData] = useState([])
    const [value, setValue] = React.useState('January');
    const [url, setUrl] = useState('https://docs.google.com/spreadsheets/d/1z_GnYRfXM-KveUH0sFe73hfIZwdhnoxW4FRM4f2xA7g/export?format=xlsx')
    const [data, setData] = useState([])

    useEffect(async () => {
        let dataArr = [];
        let tmpArr = [];

        if (apiData.length === 0) {
            await Axios.get('/getRainMaster').then(({ data }) => { dataArr.push(data) }).catch(err => console.error(err)).finally(() => { setApiData(dataArr) });
        }

        if (data.length === 0) {
            apiData.map((x, i) => {
                tmpArr.push(['Station-Name', `Total (mm)`]);
                x.map((y, z) => {
                    if (z > 0) {
                        tmpArr.push([y[0], parseInt(y[3])]);
                    }
                })
            })
            setData(tmpArr);
        }

    }, [apiData, data])

    const handleChange = (event) => {
        let tmpArr = [];
        const val = event.target.value
        let index = mS.indexOf(val);

        setValue(val);
        apiData.map((x, i) => {
            tmpArr.push(['Station-Name', `${val}`]);
            x.map((y, z) => {
                if (z > 0) {
                    tmpArr.push([y[0], parseInt(y[(index) + 3])])
                }
            })
        })
        setData(tmpArr);
    };
    return (
        <div className="section">
            <div className="section__title__box">
                <h1 className="section__title">Rainfall Analysis</h1>
                <img className="section__title__image" src={logo} alt="sun" />
            </div>
            <div className="content__api">
                <FormControl className={classes.formControl, classes.marginBottom}>
                    <InputLabel id="demo-simple-select-label">Month</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label='January'
                        onChange={handleChange}
                    >
                        {mS.map((x, i) => (
                            <MenuItem key={i} value={x}>{x}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button href={url} variant='contained' style={{ marginLeft: '2rem', marginTop: '1rem' }} color='primary'>Download Sheet</Button>
                <BarChart data={data} title='Rainfall - Measurements' />
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