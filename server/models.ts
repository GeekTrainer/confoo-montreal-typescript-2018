import { Schema, Document, model } from 'mongoose';

export interface Task {
    title: string;
}

interface TaskDocument extends Document, Task {}

const TaskSchema = new Schema({
    title: String
});

export const TaskModel = model<TaskDocument>('task', TaskSchema);
