const router = require("express").Router();
const upload = require("../config/upload");
const Application = require("../models/Application");

router.post("/:projectId", upload.single("resume"), async (req, res) => {
  const applicantId = req.user.id;
  const { comment } = req.body;
  const resumeUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

  const doc = await Application.create({
    project: req.params.projectId,
    applicant: applicantId,
    comment,
    resumeUrl,
  });

  res.status(201).json(doc);
});

module.exports = router;
