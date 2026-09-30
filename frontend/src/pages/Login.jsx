import { useState } from "react";
import { login } from "../services/api";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        setError("");

        try {
            const data = await login(username, password);

            sessionStorage.setItem("auth", data.credentials);
            sessionStorage.setItem("username", data.username);
            sessionStorage.setItem("role", data.role);

            onLogin();
        } catch (error) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <div className="login-header">
                    <div className="login-icon">
                        AMS
                    </div>

                    <h1>Military Asset Management</h1>
                    <p>Secure Logistics Management System</p>
                </div>

                <div className="login-body">
                    <h2>Sign In</h2>

                    <p className="login-subtitle">
                        Enter your credentials to access the system
                    </p>

                    <form onSubmit={handleLogin}>

                        <div className="login-field">
                            <label>Username</label>

                            <input
                                type="text"
                                value={username}
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        <div className="login-field">
                            <label>Password</label>

                            <input
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {error && (
                            <div className="login-error">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-button"
                        >
                            Sign In
                        </button>

                    </form>
                </div>

                <div className="login-footer">
                    Military Asset Management System
                </div>

            </div>
        </div>
    );
}

export default Login;