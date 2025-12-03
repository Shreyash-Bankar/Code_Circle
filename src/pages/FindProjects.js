import { useState } from "react";
import { Link } from "react-router-dom";

const MOCK_PROJECTS = [
  {
    _id: "1",
    title: "Open Source Bug Tracker",
    description: "Build a bug tracking tool for small teams.",
    skills: ["React", "Node.js", "MongoDB"],
    status: "Open",
    thumbnail: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
  },
  {
    _id: "2",
    title: "DSA Practice Platform",
    description: "Competitive programming portal for college students.",
    skills: ["React", "Express", "PostgreSQL"],
    status: "In Progress",
    thumbnail: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
  },
];

function FindProjects() {
  const [projects] = useState(MOCK_PROJECTS);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Discover Projects</h1>
      <p className="text-gray-400 mb-6">
        Browse open collaboration opportunities and apply to join teams.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project._id}
            className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-sm hover:border-indigo-500 transition"
          >
            {project.thumbnail && (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="h-40 w-full object-cover"
              />
            )}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{project.title}</h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    project.status === "Open"
                      ? "bg-green-700 text-green-100"
                      : project.status === "In Progress"
                      ? "bg-yellow-700 text-yellow-100"
                      : "bg-red-700 text-red-100"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-1 rounded-full bg-gray-800 text-indigo-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="pt-2">
                <Link
                  to={`/projects/${project._id}`}
                  className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
                >
                  View details & apply →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default FindProjects;
