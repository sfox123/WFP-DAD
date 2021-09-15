import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';

import User from './User'
import { useCookies } from 'react-cookie'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from '../../api/api';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { List } from '@material-ui/core';
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';


const sheet = 'https://docs.google.com/spreadsheets/d/'


const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        backgroundColor: theme.palette.background.paper,
    },
    margin: {
        marginTop: '2rem'
    },
    Cardroot: {
        minWidth: 275,
        margin: '2rem'
    }, title: {
        fontSize: 20,
        fontWeight: 700,
        textTransform: 'uppercase'
    },
}));

const createItem = (x) => {
    return { [x]: false }
}

const Sheet = (props) => {
    const { editorList, open, setOpen, sheetList } = props
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const [load, setLoad] = useState(false)
    const [openUser, setOpenUser] = useState(false)
    const [openDel, setOpenDel] = useState(false);
    const [check, setCheck] = useState([])
    const [list, setList] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['isLoggedinASC', 'AscID'])
    const [Name, setName] = useState('')
    const [Pass, setPass] = useState('')
    const [Id, setId] = useState('')

    useEffect(async () => {
        const { data } = await Axios.get('/getEditor/All')

    }, [])

    const handleOpen = (e) => {
        setValue(e.currentTarget.ariaLabel)
        setOpenDel(true)
    }
    const handleOpenUser = (e) => {
        setName(e.currentTarget.ariaLabel)
        setPass(e.currentTarget.ariaCurrent)
        setId(e.currentTarget.ariaLevel)
        setOpenUser(true)
    }
    const handleClose = () => {
        setOpenDel(false)
        setOpenUser(false)
    }

    const handleDelete = async (e) => {
        setLoad(true)
        await Axios.delete(`/editor/${value}`).then(res => {
            alert('Deleted Successfully');
            window.location.reload()
        }).catch(err => {
            alert('Something went wrong');
            window.location.reload()
        })
    }



    const handleClickOpen = async (e) => {
        const label = e.currentTarget.ariaLabel

        const tmpArr = []

        sheetList.map((e, elem) => {
            editorList.map((x, index) => {
                const { email, sheetName } = x;
                if (email == label) {
                    sheetName.map((el, i) => {
                        const val = el.split('-')[0].trim();
                        if (e[1] == val) {
                            tmpArr.push({ [e[1]]: true })
                        } 
                        else {
                            tmpArr.push({ [e[1]]: false })
                        }
                    })
                }
            })
        })
        
        setList(tmpArr);
        console.log(tmpArr)
        setOpen(true);
    };

    const handleClickClose = (e) => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            {editorList.map((x, i) => (
                x.asc == cookies.AscID ?
                    <Card key={i} className={classes.Cardroot}>
                        <CardContent>
                            <Typography className={classes.title} color="textPrimary" gutterBottom>
                                {x.email}
                            </Typography>
                            {x.rainFall[0] &&
                                <CardActions>
                                    <Button target='_blank' href={`${sheet + x.rainFall[1]}`} color="primary" variant="contained" size="small">RainFall Sheet</Button>
                                </CardActions>
                            }
                            {x.tankWater[0] &&
                                <CardActions>
                                    <Button target='_blank' href={`${sheet + x.tankWater[1]}`} color="primary" variant="contained" size="small">TankWater Sheet</Button>
                                </CardActions>
                            }

                            <CardActions className={classes.margin}>
                                <Button aria-label={x.email} onClick={handleOpenUser} aria-current={x.decoded} aria-level={x._id} variant="contained" size="small">User Details</Button>
                            </CardActions>
                            <CardActions className={classes.margin}>
                                <Button aria-label={x._id} variant="contained" onClick={handleOpen} color='secondary' size="small">Delete User</Button>
                            </CardActions>
                            <CardActions>
                                <List>
                                    <ListItem aria-label={x.email} autoFocus button onClick={handleClickOpen}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AddIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Add or Remove Stations" />
                                    </ListItem>
                                </List>
                            </CardActions>
                        </CardContent>
                    </Card>
                    : null
            ))}
            <Dialog open={openDel} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>Warning !!!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Action Cannot be reversed !
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {load ? <CircularProgress />
                        :
                        <Button color='secondary' onClick={handleDelete} variant="contained" color='secondary'>
                            Delete User
                        </Button>
                    }
                    <Button color='primary' variant='contained' onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <User open={openUser} setOpen={setOpenUser} name={Name} passWord={Pass} Id={Id}/>
            <Dialog
                open={open}
                onClose={handleClickClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Add or Remove Stations"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormGroup row>
                            {list.map((x, i) => (
                                <div key={i} aria-label={x[Object.keys(x)[0]]}>
                                    <FormControlLabel
                                        control={<Checkbox checked={x[Object.keys(x)[0]]} name="station" />}
                                        label={Object.keys(x)[0]}
                                    />
                                    <br />
                                </div>
                            ))}
                        </FormGroup>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleClickClose} color="primary" variant='outlined' autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Sheet