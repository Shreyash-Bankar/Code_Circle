const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comment: String,
    resumeUrl: String, // later: file path
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
