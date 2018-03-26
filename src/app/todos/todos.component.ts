import {Component, OnInit, Input, Output} from '@angular/core';
import {TaskService} from '../_services/task.service';
import {Task} from '../_models/Task';
import {GroupService} from "../_services/group.service";
import {Globals} from "../app.component";
import {MAT_CHECKBOX_CLICK_ACTION} from "@angular/material";


@Component({
    selector: 'app-tasks',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css'],
    providers: [GroupService,
        TaskService,
        {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check-indeterminate'}
    ],
})

export class TodosComponent implements OnInit {
    @Input() parentId: string;
    @Input() newTask;

    @Input() onSubmit() {
    };

    tasks: Task[];
    editState: string = '';
    taskToEdit: Task;
    disabledCheckbox = true;
    counter: string;


    constructor(private taskService: TaskService,
                public globals: Globals) {
    }

    ngOnInit() {
        this.taskService.getTasks().subscribe(tasks => {
            this.tasks = tasks;
        });
    }

    editTask(task: Task) {
        this.editState = task.id;
        this.taskToEdit = task;
        // this.taskService.updateTask(task);
    }

    deleteTask(task: Task) {
        this.taskService.deleteTask(task);
    }

    checkedTask(task: Task) {
        this.taskService.updateTask(task);
    }

    updateTask(task: Task) {
        this.taskService.updateTask(task);
        this.clearState();
    }

    clearState() {
        this.editState = '';
        this.taskToEdit = null;
    }

}
