const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: { type: Date, default: Date.now },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: false }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
