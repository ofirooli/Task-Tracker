const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    validate: {
      validator: function (v) {
        return v >= Date.now();
      },
      message: 'Due date must be in the future'
    },
    default: null
  },
  completed: {
    type: Boolean,
    default: false
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
}, {
  timestamps: true  // Automatically adds `createdAt` and `updatedAt` fields
});

const Milestone = mongoose.model('Milestone', milestoneSchema);

module.exports = Milestone;
