"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    title: String
});
exports.TaskModel = mongoose_1.model('task', TaskSchema);
