import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import smasnugLogo from './assets/smasnug.jpg';
import viteLogo from '/vite.svg';
import './App.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const inputStyle = {
        fontSize: '32px',
    };

    const titleStyle = {
        fontSize: '64px',
        color: '#646cffaa',
    };

    let navigate = useNavigate();
    const routeChange = () => {
        let path = 'login';
        navigate(path);
    };

    return (
        <>
            <h1 style={titleStyle}>Smasnug Galoxy Phon Book</h1>
            <div className="login">
                <img
                    src={smasnugLogo}
                    className="logo"
                    alt="smasnug. it's misspelled samsung"
                />
                <form className="fields">
                    <h2>Username</h2>
                    <input
                        type="text"
                        value={username}
                        style={inputStyle}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <h2>Password</h2>

                    <input
                        type="password"
                        value={password}
                        style={inputStyle}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </form>
                <button
                    type="button"
                    className="loginButton"
                    onClick={routeChange}
                >
                    Login
                </button>
            </div>
        </>
    );
}

export default Login;
