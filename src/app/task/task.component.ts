import {Component, OnInit, Input, Output} from '@angular/core';

import {TaskService} from '../_services/task.service';
import {Task} from '../_models/Task';
import {GroupService} from "../_services/group.service";
import {Globals} from "../app.component";


@Component({
    selector: 'app-task-add',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css'],
    providers: [GroupService, TaskService],

})
export class TaskComponent implements OnInit {

    constructor(public globals: Globals,
                private taskService: TaskService) {

    }

    @Input() parentId: string;
    @Input() task: any;
    @Output() counter: string;

    ngOnInit() {
        this.taskService.getTasks().subscribe(tasks => {
            this.counter = tasks.length.toString();
        });

    }

    @Output() newTask: Task = {
        id: '',
        title: '',
        description: '',
        isChecked: false,
        dueDate: new Date,
        parentId: ''
    };

    @Output() onSubmit(parentId) {

        if (this.newTask.title != '' && this.newTask.description != '' && this.newTask.dueDate != '') {
            this.newTask.id = this.counter;
            this.newTask.parentId = parentId;
            this.taskService.addTask(this.newTask);
            this.newTask.title = '';
            this.newTask.description = '';
            this.newTask.dueDate = '';
        }
    }

}
