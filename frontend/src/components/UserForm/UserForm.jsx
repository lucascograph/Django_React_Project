import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./UserForm.css"
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';

const UserForm = ({ method }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCheckBoxChange = () => {
        setRememberMe(!rememberMe);
        console.log(rememberMe);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (method === 'register') {
                const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/api/user/register/`, {
                    username,
                    email,
                    password,
                });

                console.log('User registered successfully:', response.data);
                navigate("/login");
            } else if (method === 'login') {
                const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/api/token/`, {
                    username,
                    password,
                });

                if (rememberMe){
                    localStorage.setItem(ACCESS_TOKEN, response.data.access);
                    localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                } else {
                    sessionStorage.setItem(ACCESS_TOKEN, response.data.access);
                    sessionStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                }

                navigate("/");

            }
        } catch (err) {
            if (err.response && err.response.data) {
                const errorMessages = Object.values(err.response.data).flat().join(', ');
                setError(`Operation failed: ${errorMessages}`);
            } else {
                setError("");
            }
        }
    };

    return (
        <div className='wrapper'>
            <h2>{method === 'register' ? 'New User' : 'Login'}</h2>
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
                {method === 'register' && (
                    <div className='input-box'>
                        <input
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <MdEmail className='icon' />
                    </div>
                )}
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
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">{method === 'register' ? 'Sign Up' : 'Login'}</button>
                {method === 'login' && (
                    <div>
                        <div className='remember-me'>
                            <label>
                                <input type='checkbox' checked={rememberMe} onChange={handleCheckBoxChange} />
                                Remember me
                            </label>
                        </div>
                        <div className='links'>
                            <a className="link" href='#'>Forgot Password?</a>
                            <a className="link" href={import.meta.env.VITE_FRONT_URL + '/register/'}>Sign Up</a>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default UserForm;
