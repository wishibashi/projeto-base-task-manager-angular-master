import { Component, OnInit } from '@angular/core';

import { Task } from '../tasks/shared/task.model';
import { TaskService } from '../tasks/shared/task.service';

TaskService

@Component({       
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    // providers: [ TaskService ]    // o provider TaskService está declarado no app.module.ts
})

export class DashboardComponent implements OnInit { 
    public tasks: Task[];

    constructor(private taskService: TaskService) {}

    public ngOnInit(){
        this.taskService.getImportantTasks()   // utilizo o método getImportantTasks do serviço taskService
        .then((tasks) => this.tasks = tasks )
    }
}