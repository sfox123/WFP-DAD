import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { ApiContext } from '../../context/ApiContext'
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router'
import Axios from '../../api/api'
import loader from '../../img/loader.png'

const Login = (props) => {
    const [formData, updateFormData] = React.useState('');
    const [cookies, setCookie] = useCookies(['isLoggedin', 'AscID', 'isLoggedinEditor', 'EditorID']);
    const provideHistory = useHistory()
    const { setUser } = useContext(ApiContext)

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const loginErr = document.querySelector('.login__error').classList
        const loginLoader = document.querySelector('.login__loader').classList.add('enable')
        const { email } = formData;
        const splitMail = email.split('-')
        const index = splitMail.indexOf("agro")
        if (index == 0) {
            await Axios.post('/signin', { ...formData })
                .then(res => {
                    setUser(res.data.user)
                    provideHistory.push('/admin')
                    setCookie('isLoggedinAdmin', true)
                })
                .catch(err => loginErr.remove('none'))
        } else if (index == 1) {
            await Axios.post('/signin', { ...formData })
                .then(res => {
                    setUser(res.data.editor)
                    window.open("asc")
                    setCookie('isLoggedinASC', true)
                    setCookie('AscID', res.data.asc._id)
                })
                .catch(err => loginErr.remove('none'))

        } else {
            await Axios.post('/signin', { ...formData })
                .then(res => {
                    setUser(res.data.asc)
                    window.open("editor")
                    setCookie('isLoggedinEditor', true)
                    setCookie('EditorID', res.data.editor._id)
                })
                .catch(err => loginErr.remove('none'))
        }

    };
    return (
        <>
            <section className='section__drought'>
                <div className='section__drought__main section__drought__main__img__2'>
                    <div className="drought">
                        <div className="drought__title" >
                            <h1 style={{ margin: "1rem 2rem" }} className="section__title">Login</h1>
                        </div>
                        <form method='post' onSubmit={handleSubmit} autoComplete='off' className="form">
                            <div className="form__control">
                                <input placeholder='User ID' onChange={handleChange} name="email" type="text" className="form__input" />
                                <label htmlFor="email" className="form__label">User ID</label>
                            </div>
                            <div className="form__control">
                                <input placeholder='Password' onChange={handleChange} name="password" type="password" className="form__input" />
                                <label htmlFor="name" className="form__label">Password</label>
                            </div>
                            <div className="drought__box" style={{ margin: '0' }}>
                                <span className='none login__error'>Username or Password Incorrect</span>
                                <button className='login__btn' target='_blank'>Login {'->'} </button>
                            </div>
                        </form>
                    </div>
                </div>
                <img src={loader} alt="loader" className='login__loader' />
            </section>
        </>
    )
}

export default Login;