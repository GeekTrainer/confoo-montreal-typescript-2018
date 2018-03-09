import * as $ from 'jquery';
import * as ko from 'knockout';

interface ITask {
    title: string;
}

class ViewModel {
    tasks: KnockoutObservableArray<ITask> = ko.observableArray<ITask>([]);
    newTask: KnockoutObservable<ITask> = ko.observable<ITask>({ title: '' });

    constructor() {
        this.load();
    }

    async load() {
        let tasks = await $.get('http://localhost:8080/tasks') as ITask[];
        this.tasks(tasks);
    }

    async save() {
        await $.post('http://localhost:8080/tasks', this.newTask());
        this.tasks.push(this.newTask());
        this.newTask({title: ''});
    }
}

ko.applyBindings(new ViewModel());