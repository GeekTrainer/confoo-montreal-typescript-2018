import * as restify from 'restify';
import { TaskModel, Task } from './models';
import * as mongoose from 'mongoose';
import * as corsMiddleware from 'restify-cors-middleware';

mongoose.connect("mongodb://localhost/confoo-demos");

const server = restify.createServer();
server.use(restify.plugins.bodyParser());

const cors = corsMiddleware({
    origins: [
        'http://localhost:3000'
    ],
    allowHeaders: ['*'],
    exposeHeaders: ['*']
})
server.pre(cors.preflight);
server.use(cors.actual);
server.listen(8080, () => console.log('Server up!!'));

server.get(
    '/tasks',
    async (req: restify.Request, res: restify.Response) => {
        const tasks = await TaskModel.find() as Task[];
        res.send(200, tasks);
        res.end();
    });

server.post(
    '/tasks',
    async (req: restify.Request, res: restify.Response) => {
        const task = req.body as Task;
        await TaskModel.create(task);
        res.send(201);
        res.end();
    });
