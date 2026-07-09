import { Link } from "react-router-dom";

function Navbar() {

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

                </div>

            </div>

        </nav>

    );

}

export default Navbar;