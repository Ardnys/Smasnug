import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import smasnugLogo from './assets/smasnug.jpg';
import viteLogo from '/vite.svg';
import './App.css';

function Login() {
    // form validation is taken from
    // https://stackoverflow.com/questions/41296668/how-do-i-add-validation-to-the-form-in-my-react-component

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateUsername = () => {
        let usernameValid = true;

        if (username === '') {
            usernameValid = false;
            setUsernameError('*username cannot be empty');
        } else if (typeof username !== 'undefined') {
            if (!username.match(/^[a-zA-Z0-9]+$/)) {
                usernameValid = false;
                setUsernameError(
                    '*only letters and numbers are allowed in username'
                );
            }
        }
        return usernameValid;
    };

    const validatePassword = () => {
        let passwordValid = true;
        if (password === '') {
            passwordValid = false;
            setPasswordError('*password cannot be empty');
        } else if (typeof password !== 'undefined') {
            if (
                password.match(
                    '^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$'
                )
            ) {
                // regex taken from Matt Timmermans. I think I actually understand this regex:
                // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
                console.error(password);
                passwordValid = false;
                setPasswordError(
                    '*password must contain minimum 8 characters, ' +
                        'at least one letter, one number and one special character.'
                );
            }
        }
        return passwordValid;
    };

    let navigate = useNavigate();

    const validate = () => {
        setUsernameError('');
        setPasswordError('');
        let iuv = validateUsername();
        let ipv = validatePassword();
        if (iuv && ipv) {
            let path = 'login';
            navigate(path);
        } else {
            // console.error('try again');
        }
    };

    const inputStyle = {
        fontSize: '32px',
    };

    const titleStyle = {
        fontSize: '64px',
        color: '#646cffaa',
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
                <div className="fields">
                    <h2>Username</h2>
                    <input
                        type="text"
                        value={username}
                        style={inputStyle}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <span className="error">{usernameError}</span>
                    <h2>Password</h2>

                    <input
                        type="password"
                        value={password}
                        style={inputStyle}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <span className="error">{passwordError}</span>
                    <button
                        type="button"
                        className="loginButton"
                        onClick={validate}
                    >
                        Login
                    </button>
                </div>
            </div>
        </>
    );
}

export default Login;
