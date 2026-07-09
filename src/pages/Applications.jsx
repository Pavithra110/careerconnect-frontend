import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../services/api";

function Applications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/applications/my", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setApplications(response.data);

            console.log("Applications:", response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2>My Applications</h2>

                <table className="table table-striped mt-4">

                    <thead className="table-dark">
<tr>
    <th>Job</th>
    <th>Company</th>
    <th>Resume</th>
    <th>Status</th>
</tr>
</thead>

                    <tbody>
{applications.map((app) => (
<tr key={app.id}>

    <td>{app.job.title}</td>

    <td>{app.job.company}</td>

    <td>{app.resume}</td>

    <td>
        <span
    className={
        app.status === "APPLIED"
            ? "badge bg-primary"
            : app.status === "SHORTLISTED"
            ? "badge bg-info"
            : app.status === "INTERVIEW"
            ? "badge bg-warning text-dark"
            : app.status === "SELECTED"
            ? "badge bg-success"
            : "badge bg-danger"
    }
>
    {app.status}
</span>
    </td>

</tr>
))}
</tbody>

                </table>

            </div>

        </>

    );

}

export default Applications;