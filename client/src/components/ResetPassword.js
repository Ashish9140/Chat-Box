import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react'
import { useParams, useHistory } from 'react-router-dom';

export const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [validURL, setValidURL] = useState(false);
    const [error, setError] = useState();
    const param = useParams();
    const history = useHistory();
    const url = `https://wlone.onrender.com/user/password-reset/${param.id}`

    useEffect(() => {
        const verifyURL = async () => {
            try {
                await axios.get(url);
                setValidURL(true);
            } catch (error) {
                setValidURL(false);
            }
        }
        verifyURL();
    }, [param, url]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(url, { password });
            setError(data.message);
            history.push("/chatbox");
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    }


    return (

        <Fragment>

            {validURL ? (
                <div className="section">
                    <div className="container">
                        <div className="row full-height justify-content-center">
                            <div className="col-12 text-center align-self-center py-5">
                                <div className="section pb-5 pt-5 pt-sm-2 text-center">

                                    <div className="card-3d-wrap mx-auto">
                                        <div className="card-3d-wrapper">

                                            <div className="card-front">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="center-wrap">
                                                        <div className="section text-center">
                                                            <h4 className="mb-4 pb-3">New Password</h4>
                                                            <div className="form-group">
                                                                <input type="password" className="form-style"
                                                                    placeholder="New Password" autoComplete="new-password"
                                                                    value={password}
                                                                    onChange={(e) => { setPassword(e.target.value) }}
                                                                    required />
                                                                <i className="input-icon uil uil-at"></i>
                                                            </div>
                                                            <button type='submit' className="btn mt-4">submit</button>
                                                        </div>

                                                    </div>
                                                    {error && <div>{error}</div>}
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>404 Not Found</h1>
            )}

        </Fragment>
    )
}
