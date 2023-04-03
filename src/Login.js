import React from "react";
import { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [user, setUser] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/login", { username, password });
            console.log(res.data);
            setAccessToken(res.headers["auth-token-access"]);
            setRefreshToken(res.headers["auth-token-refresh"]);
            setUser(res.data.user);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            {
                (user?.username) &&
                <>
                    <Dashboard accessToken={accessToken} setAccessToken={setAccessToken} refreshToken={refreshToken} />
                </>
            }
            {
                (!user || !user?.username) &&
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                </form>
            }
        </div>
    )
}

export default Login;