import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project' // Reference to the associated project
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' // Reference to the user assigned to the task
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'revision'], // Possible task statuses
    default: 'pending'
  },
  dueDate: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'], // Task priority
    default: 'medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

taskSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const task = mongoose.model('task', taskSchema);

export default task;
