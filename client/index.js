var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "jquery", "knockout"], function (require, exports, $, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ViewModel {
        constructor() {
            this.tasks = ko.observableArray([]);
            this.newTask = ko.observable({ title: '' });
            this.load();
        }
        load() {
            return __awaiter(this, void 0, void 0, function* () {
                let tasks = yield $.get('http://localhost:8080/tasks');
                this.tasks(tasks);
            });
        }
        save() {
            return __awaiter(this, void 0, void 0, function* () {
                yield $.post('http://localhost:8080/tasks', this.newTask());
                this.tasks.push(this.newTask());
                this.newTask({ title: '' });
            });
        }
    }
    ko.applyBindings(new ViewModel());
});
