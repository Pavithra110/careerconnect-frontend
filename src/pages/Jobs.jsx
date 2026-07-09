import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../services/api";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);

    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [company, setCompany] = useState("");
    const [sortSalary, setSortSalary] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
        fetchAppliedJobs();
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
            alert("Failed to load jobs");

        } finally {

            setLoading(false);

        }
    };

    const fetchAppliedJobs = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get("/applications/my", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const appliedIds = response.data.map(
                application => application.job.id
            );

            setAppliedJobs(appliedIds);

        } catch (error) {

            console.log(error);

        }

    };

    const applyJob = async (jobId) => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.post(
                "/applications",
                {
                    resume: "Pavithra_Resume.pdf",
                    job: {
                        id: jobId
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Applied Successfully!");

            setAppliedJobs(prev => [...prev, jobId]);

        } catch (error) {

            if (error.response?.status === 400) {

                alert("Already Applied");

            }
            else if (error.response?.status === 403) {

                alert("Access Denied");

            }
            else {

                alert("Something went wrong");

            }

        }

    };

    const filteredJobs = jobs
        .filter(job =>
            job.title.toLowerCase().includes(search.toLowerCase()) &&
            job.location.toLowerCase().includes(location.toLowerCase()) &&
            job.company.toLowerCase().includes(company.toLowerCase())
        )
        .sort((a, b) => {

            if (sortSalary === "low") {

                return a.salary - b.salary;

            }

            if (sortSalary === "high") {

                return b.salary - a.salary;

            }

            return 0;

        });

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="mb-4 text-center">
                    Available Jobs
                </h2>

                <div className="row mb-4">

                    <div className="col-md-3">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Job"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <div className="col-md-3">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />

                    </div>

                    <div className="col-md-3">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />

                    </div>

                    <div className="col-md-3">

                        <select
                            className="form-select"
                            value={sortSalary}
                            onChange={(e) => setSortSalary(e.target.value)}
                        >

                            <option value="">Sort Salary</option>
                            <option value="low">
                                Low → High
                            </option>
                            <option value="high">
                                High → Low
                            </option>

                        </select>

                    </div>

                </div>

                {
                    loading ?

                        <div className="text-center mt-5">

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            >
                            </div>

                            <p className="mt-3">
                                Loading Jobs...
                            </p>

                        </div>

                        :

                        <div className="row">

                            {
                                filteredJobs.length === 0 ?

                                    <div className="text-center">

                                        <h4>No Jobs Found</h4>

                                    </div>

                                    :

                                    filteredJobs.map(job => (

                                        <div
                                            className="col-md-4 mb-4"
                                            key={job.id}
                                        >

                                            <div className="card shadow h-100">

                                                <div className="card-body d-flex flex-column">

                                                    <h4>{job.title}</h4>

                                                    <h5 className="text-primary">
                                                        {job.company}
                                                    </h5>

                                                    <p>
                                                        📍 {job.location}
                                                    </p>

                                                    <p>
                                                        💰 ₹{job.salary}
                                                    </p>

                                                    <p className="flex-grow-1">
                                                        {job.description}
                                                    </p>

                                                    <button
                                                        className={
                                                            appliedJobs.includes(job.id)
                                                                ? "btn btn-secondary w-100"
                                                                : "btn btn-success w-100"
                                                        }

                                                        disabled={
                                                            appliedJobs.includes(job.id)
                                                        }

                                                        onClick={() =>
                                                            applyJob(job.id)
                                                        }

                                                    >

                                                        {
                                                            appliedJobs.includes(job.id)

                                                                ? "✓ Applied"

                                                                : "Apply Now"
                                                        }

                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    ))

                            }

                        </div>

                }

            </div>

        </>

    );

}

export default Jobs;
