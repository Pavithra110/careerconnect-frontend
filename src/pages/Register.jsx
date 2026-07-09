import { useState } from "react";
import api from "../services/api";

function Register() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await api.post("/users/register", {
                fullName,
                email,
                password,
                role: "CANDIDATE"
            });

            alert("Registration Successful!");

            window.location.href = "/login";

        } catch (error) {

            console.log(error);

            alert("Registration Failed");

        }
    };

    return (

        <div className="container mt-5">

            <h2>CareerConnect Register</h2>

            <form onSubmit={handleRegister}>

                <div className="mb-3">
                    <label>Full Name</label>

                    <input
                        className="form-control"
                        value={fullName}
                        onChange={(e)=>setFullName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Email</label>

                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>

                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>

                <button className="btn btn-success">
                    Register
                </button>

            </form>

        </div>

    );

}

export default Register;