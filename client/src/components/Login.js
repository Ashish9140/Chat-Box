import React, { useState, useContext } from 'react'
import { loginUser } from '../http'
import { useHistory, Link } from 'react-router-dom';
import { CartContext } from '../CartContext';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const history = useHistory();
    const { setUser, setShowChat } = useContext(CartContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser({ email, password });
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
        <form onSubmit={handleLogin}>
            <div className="center-wrap">
                <div className="section text-center">
                    <h4 className="mb-4 pb-3">Log In</h4>
                    <div className="form-group">
                        <input type="email" className="form-style"
                            placeholder="Your Email"
                            autoComplete="new-password"
                            value={email} onChange={(e) => { setEmail(e.target.value) }}
                            required />
                        <i className="input-icon uil uil-at"></i>
                    </div>
                    <div className="form-group mt-2">
                        <input type="password" className="form-style"
                            placeholder="Your Password"
                            autoComplete="new-password"
                            value={password} onChange={(e) => { setPassword(e.target.value) }}
                            required />
                        <i className="input-icon uil uil-lock-alt"></i>
                    </div>
                    <button type='submit' className="btn mt-4">submit</button>
                    <p className="mb-0 mt-4 text-center"><Link to="/forget-password" className="link">Forgot your password?</Link></p>
                </div>
            </div>
            {error && <div>{error}</div>}
        </form>
    )
}

export default Login