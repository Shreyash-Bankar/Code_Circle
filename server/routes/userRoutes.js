const router = require("express").Router();
const Project = require("../models/Project");
const Application = require("../models/Application");

router.get("/me/projects", async (req, res) => {
  const projects = await Project.find({ creator: req.user.id }).sort({ createdAt: -1 });
  res.json(projects);
});

router.get("/me/applications", async (req, res) => {
  const apps = await Application.find({ applicant: req.user.id })
    .populate("project", "title status")
    .sort({ createdAt: -1 });
  res.json(apps);
});

module.exports = router;
