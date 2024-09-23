const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed', 'on-hold'], // Include "on-hold" if needed
    default: 'not-started'
  },
  languages: {
    type: [String],
    enum: ['JavaScript', 'Python', 'C#', 'CSS', 'HTML', 'Other', 'Angular', "Node.js", "React", "MongoDB", "MySQL"],
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task' // Reference to tasks
  }],
  milestones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Milestone' // Reference to milestones
  }],
  dueDate: {
    type: Date // For due date tracking
  }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
