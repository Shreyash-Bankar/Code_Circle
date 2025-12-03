import { useState } from "react";
import api from "../api";

function PostProject() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    skills: "",
    status: "Open",
    thumbnail: "",
  });

  // NEW — state for proposal PDF file
  const [proposalFile, setProposalFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get logged-in user from localStorage
    const user = JSON.parse(localStorage.getItem("cc_user") || "{}");

    if (!user._id) {
      alert("You must be logged in to post a project!");
      return;
    }

    // Use FormData for file upload
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("skills", form.skills);
    fd.append("status", form.status);
    fd.append("thumbnail", form.thumbnail);
    fd.append("creatorId", user._id);

    if (proposalFile) {
      fd.append("proposal", proposalFile); // Upload PDF
    }

    try {
      const res = await api.post("/projects/with-file", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      console.log(res.data);
      alert("Project created successfully!");

      // Clear form
      setForm({
        title: "",
        description: "",
        skills: "",
        status: "Open",
        thumbnail: "",
      });
      setProposalFile(null);

    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Post a New Project</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-900 p-6 rounded-lg border border-gray-700"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Project Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Required Skills (comma separated)
          </label>
          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Thumbnail Image URL
            </label>
            <input
              type="url"
              name="thumbnail"
              value={form.thumbnail}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>

        {/* NEW — PDF File Input */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Proposal (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setProposalFile(e.target.files[0])}
            className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}

export default PostProject;
