import React, { useState, useContext } from 'react'
import { signUpUser } from '../http'
import { useHistory } from 'react-router-dom';
import { CartContext } from '../CartContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const history = useHistory();
    const { setUser, setShowChat } = useContext(CartContext);


    async function handleSignUp(e) {
        e.preventDefault();
        try {
            const { data } = await signUpUser({ email, name, password });
            localStorage.setItem("token", JSON.stringify(data.token));
            setUser(data.user);
            setShowChat(false);
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
        <form onSubmit={handleSignUp}>
            <div className="center-wrap">
                <div className="section text-center">
                    <h4 className="mb-4 pb-3">Sign Up</h4>
                    <div className="form-group">
                        <input type="text" className="form-style"
                            placeholder="Your Full Name"
                            autoComplete="new-password"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            required />
                        <i className="input-icon uil uil-user"></i>
                    </div>
                    <div className="form-group mt-2">
                        <input type="email" className="form-style"
                            placeholder="Your Email"
                            autoComplete="new-password"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            required />
                        <i className="input-icon uil uil-at"></i>
                    </div>
                    <div className="form-group mt-2">
                        <input type="password" className="form-style"
                            placeholder="Your Password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            required />
                        <i className="input-icon uil uil-lock-alt"></i>
                    </div>
                    <button className="btn mt-4">submit</button>
                </div>
            </div>
            {error && <div>{error}</div>}
        </form>
    )
}

export default Register