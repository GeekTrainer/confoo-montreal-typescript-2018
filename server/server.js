"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const models_1 = require("./models");
const mongoose = require("mongoose");
const corsMiddleware = require("restify-cors-middleware");
mongoose.connect("mongodb://localhost/confoo-demos");
const server = restify.createServer();
server.use(restify.plugins.bodyParser());
const cors = corsMiddleware({
    origins: [
        'http://localhost:3000'
    ],
    allowHeaders: ['*'],
    exposeHeaders: ['*']
});
server.pre(cors.preflight);
server.use(cors.actual);
server.listen(8080, () => console.log('Server up!!'));
server.get('/tasks', async (req, res) => {
    const tasks = await models_1.TaskModel.find();
    res.send(200, tasks);
    res.end();
});
server.post('/tasks', async (req, res) => {
    const task = req.body;
    await models_1.TaskModel.create(task);
    res.send(201);
    res.end();
});
