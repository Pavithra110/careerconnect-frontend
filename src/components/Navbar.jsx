import { Link } from "react-router-dom";

function Navbar() {

    const logout = () => {

        localStorage.removeItem("token");

        alert("Logged out successfully!");

        window.location.href = "/login";

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link className="navbar-brand" to="/dashboard">
                    CareerConnect
                </Link>

                <div className="navbar-nav">

                    <Link className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>

                    <Link className="nav-link" to="/jobs">
                        Jobs
                    </Link>

                    <Link className="nav-link" to="/applications">
                        Applications
                    </Link>

                    <Link className="nav-link" to="/manage-jobs">
                        Manage Jobs
                    </Link>

                    <Link className="nav-link" to="/manage-applications">
                        Manage Applications
                    </Link>

                </div>

                <button
                    className="btn btn-outline-light"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;