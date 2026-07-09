import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

    const [dashboard, setDashboard] = useState({
        totalUsers: 0,
        totalJobs: 0,
        totalApplications: 0
    });

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await api.get("/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setDashboard(response.data);

            } catch (error) {

                console.log(error);
                alert("Failed to load dashboard");

            }

        };

        fetchDashboard();

    }, []);

    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <div className="text-center mb-5">
                    <h2 className="fw-bold">CareerConnect Dashboard</h2>
                    <p className="text-muted">
                        Welcome to the CareerConnect Admin Dashboard
                    </p>
                </div>

                <div className="row">

                    <div className="col-md-4 mb-4">
                        <div className="card shadow border-0 text-center">
                            <div className="card-body">
                                <h1>👥</h1>
                                <h5>Total Users</h5>
                                <h2 className="text-primary">
                                    {dashboard.totalUsers}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card shadow border-0 text-center">
                            <div className="card-body">
                                <h1>💼</h1>
                                <h5>Total Jobs</h5>
                                <h2 className="text-success">
                                    {dashboard.totalJobs}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card shadow border-0 text-center">
                            <div className="card-body">
                                <h1>📄</h1>
                                <h5>Total Applications</h5>
                                <h2 className="text-danger">
                                    {dashboard.totalApplications}
                                </h2>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );

}

export default Dashboard;