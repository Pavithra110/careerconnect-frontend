import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import api from "../services/api";

function ManageJobs() {

    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: ""
    });

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
    fetchJobs();
}, []);

const fetchJobs = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await api.get("/jobs", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setJobs(response.data);

    } catch (error) {

        console.log(error);

    }

};

    const handleChange = (e) => {
        setJob({
            ...job,
            [e.target.name]: e.target.value
        });
    };

    const addJob = async () => {

        try {

            const token = localStorage.getItem("token");

            await api.post("/jobs", job, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Job Added Successfully!");
            fetchJobs();

            setJob({
                title: "",
                company: "",
                location: "",
                salary: "",
                description: ""
            });

        } catch (error) {

            console.log(error);
            alert("Failed to add job");

        }

    };

    const deleteJob = async (id) => {

    try {

        const token = localStorage.getItem("token");

        await api.delete(`/jobs/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        alert("Job Deleted");

        fetchJobs();

    } catch (error) {

        console.log(error);

        alert("Delete Failed");

    }

};

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="text-center mb-4">
                    Manage Jobs
                </h2>

                <div className="card shadow p-4">

                    <input
                        className="form-control mb-3"
                        placeholder="Job Title"
                        name="title"
                        value={job.title}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Company"
                        name="company"
                        value={job.company}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Location"
                        name="location"
                        value={job.location}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Salary"
                        name="salary"
                        type="number"
                        value={job.salary}
                        onChange={handleChange}
                    />

                    <textarea
                        className="form-control mb-3"
                        placeholder="Description"
                        name="description"
                        value={job.description}
                        onChange={handleChange}
                    />

                    <button
                        className="btn btn-primary"
                        onClick={addJob}
                    >
                        Add Job
                    </button>

                </div>

            </div>

            <hr className="my-5" />

<h3>Existing Jobs</h3>

{
    jobs.map((job) => (

        <div key={job.id} className="card mb-3">

            <div className="card-body">

                <h4>{job.title}</h4>

                <p><strong>Company:</strong> {job.company}</p>

                <p><strong>Location:</strong> {job.location}</p>

                <p><strong>Salary:</strong> ₹{job.salary}</p>

                <p>{job.description}</p>

                <button
                    className="btn btn-danger mt-2"
                    onClick={() => deleteJob(job.id)}
                >
                    Delete Job
                </button>

            </div>

        </div>

    ))
}

        </>

    );
}

export default ManageJobs;