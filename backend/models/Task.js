const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title required'],
      trim: true,
      maxlength: [100, 'Max 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Max 500 characters'],
      default: ''
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

taskSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Task', taskSchema);
