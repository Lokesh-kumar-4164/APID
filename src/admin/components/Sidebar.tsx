import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "block px-6 py-3 bg-gray-800 font-semibold rounded-r-lg"
      : "block px-6 py-3 hover:bg-gray-800";

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col fixed">
      <h2 className="p-6 text-2xl font-bold border-b border-gray-800">
        Admin Panel
      </h2>
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          <li>
            <NavLink to="/admin/dashboard" end className={linkClasses}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/students" className={linkClasses}>
              Students
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/reports" className={linkClasses}>
              Reports
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
