import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-3xl font-bold mb-2">Page not found</h1>
      <p className="text-gray-400 mb-4">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="text-sm font-semibold text-indigo-400 hover:text-indigo-300"
      >
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
