import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Students from "./pages/Students";
import StudentDetails from "./pages/StudentDetails";
import { Navigate } from "react-router-dom";

const AdminApp = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 ml-64 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
           <Route
            path="/"
            element={<Navigate to="/admin/dashboard" replace />}
          />
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminApp;
