import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? "bg-indigo-600 text-white" : "text-gray-200 hover:bg-indigo-500"
    }`;

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-semibold">
          Code Circle
        </Link>
        <div className="flex gap-2">
          <NavLink to="/find-projects" className={linkClasses}>
            Find Projects
          </NavLink>
          <NavLink to="/post-project" className={linkClasses}>
            Post Project
          </NavLink>
          <NavLink to="/dashboard" className={linkClasses}>
            Dashboard
          </NavLink>
          <NavLink to="/auth" className={linkClasses}>
            Login / Signup
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
