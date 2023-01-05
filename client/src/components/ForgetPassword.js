import React, { useState } from 'react'
import { forgetPassword } from '../http';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await forgetPassword({ email });
            setError(data.message);
            // history.push("/chatbox");
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    }

    return (
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
                                                    <h4 className="mb-4 pb-3">Forget Password</h4>
                                                    <div className="form-group">
                                                        <input type="email" className="form-style"
                                                            placeholder="Your Email" autoComplete="new-password"
                                                            value={email}
                                                            onChange={(e) => { setEmail(e.target.value) }}
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

    )
}

export default ForgetPassword