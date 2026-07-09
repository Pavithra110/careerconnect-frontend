import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import ManageJobs from "./pages/ManageJobs";
import ManageApplications from "./pages/ManageApplications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/manage-jobs" element={<ManageJobs />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/manage-applications" element={<ManageApplications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;