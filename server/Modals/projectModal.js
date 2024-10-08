import mongoose from 'mongoose';


const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['not started', 'in progress', 'completed', 'on hold'],
    default: 'not started',
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'task',
  }],
  assignedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  budget: {
    type: Number,
  },
  client: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const project = mongoose.model('project', projectSchema);

export default project;
