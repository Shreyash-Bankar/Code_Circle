import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../api";

function ProjectDetails() {
  const { id } = useParams();

  const [comment, setComment] = useState("");
  const [resumeFile, setResumeFile] = useState(null); // ✅ Added

  const handleApply = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("comment", comment);
    if (resumeFile) fd.append("resume", resumeFile);

    try {
      await api.post(`/applications/${id}`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"), // 🔐 JWT
        },
      });

      alert("Application submitted successfully!");
      setComment("");
      setResumeFile(null);

    } catch (err) {
      console.error(err);
      alert("Failed to apply");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header>
        <p className="text-xs text-gray-500 mb-1">Project ID: {id}</p>
        <h1 className="text-3xl font-bold mb-2">Project title here</h1>
        <p className="text-gray-400">
          Full project description will come from the backend.
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Required Skills</h2>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-indigo-200">
            React
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-indigo-200">
            Node.js
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-indigo-200">
            MongoDB
          </span>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Creator Proposal</h2>
        <a
          href="#"
          className="text-sm text-indigo-400 hover:text-indigo-300"
        >
          Download proposal (PDF)
        </a>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Apply to this project</h2>

        <form
          onSubmit={handleApply}
          className="space-y-4 bg-gray-900 p-4 rounded-lg border border-gray-800"
        >
          {/* ---- Comment ---- */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Comment / Motivation
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Explain how you can contribute to this project"
            />
          </div>

          {/* ---- Resume Upload ---- */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Resume (PDF)
            </label>

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="w-full text-sm text-gray-200"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold"
          >
            Apply
          </button>
        </form>
      </section>
    </div>
  );
}

export default ProjectDetails;
