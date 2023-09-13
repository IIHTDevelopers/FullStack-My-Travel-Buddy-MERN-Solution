import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../../services/auth.service';
import userService from '../../services/user.service';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = async () => {
        try {
            const token = await authService.login(email, password);
            if (token) {
                history.push('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleRegister = async () => {
        try {
            await userService.createUser({ username, email, password });
            const token = await authService.login(email, password);
            if (token) {
                history.push('/');
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div>
            <h1>{isRegistering ? 'Create New Account' : 'Login Account'}</h1>
            {isRegistering && (
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            )}
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button
                onClick={isRegistering ? handleRegister : handleLogin}
                disabled={!email.trim() || !password.trim() || (isRegistering && !username.trim())}
            >
                {isRegistering ? 'Create Account' : 'Login'}
            </button>
            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Back to Login' : 'Create Account'}
            </button>
        </div>
    );
}

export default Login;
