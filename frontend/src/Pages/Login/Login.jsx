import { useState } from 'react';
import "./Login.css";
import api from '../../Api';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleCheckBoxChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post(`${import.meta.env.VITE_BACK_URL}/api/token/`, {username, password});
            if (rememberMe){
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
            } else {
                sessionStorage.setItem(ACCESS_TOKEN, response.data.access);
                sessionStorage.setItem(REFRESH_TOKEN, response.data.refresh);
            }

            navigate("/");

        } catch (error) {
            console.log(error);
            setError("Wrong username or password, try again!");
        }
    };

    return (
        <div className='wrapper'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='input-box'>
                    <input
                        type="text"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FaLock className='icon' />
                </div>
                <div className='remember-me'>
                    <label>
                        <input type='checkbox' checked={rememberMe} onChange={handleCheckBoxChange} />
                        Remember me
                    </label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
                <div className='links'>
                    <a className="link" href='#'>Forgot Password?</a>
                    <a className="link" href={import.meta.env.VITE_FRONT_URL + '/register/'}>Sign Up</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
