import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Dashboard() {
  const navigate = useNavigate();

  const [created, setCreated] = useState([]);
  const [applied, setApplied] = useState([]);

  // 🔐 Load user’s created + applied projects
  useEffect(() => {
    const token = localStorage.getItem("cc_token");
    if (!token) {
      navigate("/auth");
      return;
    }

    const load = async () => {
      try {
        const [createdRes, appliedRes] = await Promise.all([
          api.get("/users/me/projects"),
          api.get("/users/me/applications"),
        ]);

        setCreated(createdRes.data);
        setApplied(appliedRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [navigate]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-gray-400">
          Manage your created projects and track your applications.
        </p>
      </header>

      {/* ----------------- Created Projects ----------------- */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Your Created Projects</h2>
          <Link
            to="/post-project"
            className="text-sm text-indigo-400 hover:text-indigo-300"
          >
            + New project
          </Link>
        </div>

        {created.length === 0 ? (
          <p className="text-sm text-gray-500">
            You have not created any projects yet.
          </p>
        ) : (
          <div className="space-y-3">
            {created.map((p) => (
              <div
                key={p._id}
                className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-lg px-4 py-3"
              >
                <div>
                  <Link
                    to={`/projects/${p._id}`}
                    className="font-medium hover:text-indigo-400"
                  >
                    {p.title}
                  </Link>
                  <p className="text-xs text-gray-500">
                    {p.applicationsCount} applications • Status: {p.status}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs rounded-md bg-gray-800 hover:bg-gray-700">
                    View applications
                  </button>
                  <button className="px-3 py-1 text-xs rounded-md bg-red-600 hover:bg-red-500">
                    Close project
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ----------------- Applied Projects ----------------- */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Projects You Applied To</h2>

        {applied.length === 0 ? (
          <p className="text-sm text-gray-500">
            You have not applied to any projects yet.
          </p>
        ) : (
          <div className="space-y-3">
            {applied.map((p) => (
              <div
                key={p._id}
                className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-lg px-4 py-3"
              >
                <div>
                  <Link
                    to={`/projects/${p._id}`}
                    className="font-medium hover:text-indigo-400"
                  >
                    {p.title}
                  </Link>
                  <p className="text-xs text-gray-500">Status: {p.status}</p>
                </div>
                <button className="px-3 py-1 text-xs rounded-md bg-gray-800 hover:bg-gray-700">
                  View details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
