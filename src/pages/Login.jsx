import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/users/login", {

                email,
                password

            });

            localStorage.setItem("token", response.data.token);

            alert("Login Successful!");

            window.location.href = "/dashboard";

            
        } catch (error) {

            alert("Invalid Credentials");

            console.log(error);

        }

    };

    return (

        <div className="container mt-5">

            <h2>CareerConnect Login</h2>

            <form onSubmit={handleLogin}>

                <div className="mb-3">

                    <label>Email</label>

                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>

                <div className="mb-3">

                    <label>Password</label>

                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>

                <button className="btn btn-primary">
                    Login
                </button>

            </form>

            <p className="mt-3 text-center">
                Don't have an account?{" "}
                <Link to="/register">
                    Register here
                </Link>
            </p>

        </div>

    );

}

export default Login;