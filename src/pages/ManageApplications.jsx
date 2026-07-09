import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function ManageApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/applications", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setApplications(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const updateStatus = async (id, status) => {

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/applications/${id}/status?status=${status}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Status Updated Successfully!");

            fetchApplications();

        } catch (error) {

            console.log(error);

            alert("Failed to update status");

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="mb-4">
                    Manage Applications
                </h2>

                <table className="table table-bordered table-striped">

                    <thead className="table-dark">

                        <tr>

                            <th>Name</th>
                            <th>Email</th>
                            <th>Job</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            applications.map(app => (

                                <tr key={app.id}>

                                    <td>{app.applicantName}</td>

                                    <td>{app.applicantEmail}</td>

                                    <td>{app.job.title}</td>

                                    <td>{app.status}</td>

                                    <td>

                                        <button
                                            className="btn btn-success btn-sm me-2"
                                            onClick={() =>
                                                updateStatus(app.id, "SHORTLISTED")
                                            }
                                        >
                                            Shortlist
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                updateStatus(app.id, "REJECTED")
                                            }
                                        >
                                            Reject
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default ManageApplications;