import mongoose, { Schema, Document } from 'mongoose';

// TypeScript interface
export interface ITask extends Document {
  title: string;
  completed: boolean;
  deadline: Date | null;  // ← new
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
      maxlength: [200, 'Title too long'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: Date,
      default: null,   // optional — not every task needs a deadline
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>('Task', TaskSchema);