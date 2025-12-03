const express = require("express");
const Project = require("../models/Project");
const Application = require("../models/Application");
const router = express.Router();

// GET /api/projects - list all projects
router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

// GET /api/projects/:id - project details
router.get("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id).populate("creator", "firstname lastname email");
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
});

// POST /api/projects - create project (TEMP user id from body)
router.post("/", async (req, res) => {
  const { title, description, skills, status, thumbnail, proposalUrl, creatorId } = req.body;
  const project = await Project.create({
    title,
    description,
    requiredSkills: skills.split(",").map((s) => s.trim()),
    status,
    thumbnailUrl: thumbnail,
    proposalUrl,
    creator: creatorId, // later: from auth token
  });
  res.status(201).json(project);
});

// POST /api/projects/:id/apply - create application
router.post("/:id/apply", async (req, res) => {
  const { applicantId, comment, resumeUrl } = req.body;
  const application = await Application.create({
    project: req.params.id,
    applicant: applicantId,
    comment,
    resumeUrl,
  });
  res.status(201).json(application);
});

const upload = require("../config/upload");

router.post("/with-file", upload.single("proposal"), async (req, res) => {
  const { title, description, skills, status, thumbnail } = req.body;
  const creatorId = req.user.id;
  const proposalUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

  const project = await Project.create({
    title,
    description,
    requiredSkills: skills.split(",").map((s) => s.trim()),
    status,
    thumbnailUrl: thumbnail,
    proposalUrl,
    creator: creatorId,
  });

  res.status(201).json(project);
});


module.exports = router;
