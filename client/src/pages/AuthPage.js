import React, { useState, useContext } from 'react'
import { CartContext } from "../CartContext";
import Login from '../components/Login';
import Register from '../components/Register';
import './../css/Auth.css'

const AuthPage = () => {

    return (
        <div className="authScroll">
            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                <label htmlFor="reg-log"></label>


                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">

                                        <div className="card-front">
                                            <Login />
                                        </div>

                                        <div className="card-back">
                                            <Register />
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage