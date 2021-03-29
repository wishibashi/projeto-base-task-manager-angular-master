// Primeiramente importamos os módulos do framework
import { Component, OnInit } from '@angular/core';      // importação do decorator Component do Angular
                                        // OnInit é uma Interface do Angular, portanto existe um contrato
                                        // que nos exige definir alguns métodos.

// Em seguida importamos os módulos do nosso projeto
import { Task } from './shared/task.model'
import { TaskService } from './shared/task.service';

@Component({
    selector: 'tasks',
    templateUrl: './tasks.component.html',
    // providers: [
    //   { provide: TaskService, useClass: TaskService } // quando alguém perguntar por TaskService (provide),
    //                                                     // responda com TaskService (useClass)
    // ]
    providers: [ TaskService ]    // como provide=useClass, simplifico
})

export class TasksComponent implements OnInit{
    public tasks: Array<Task>;
    public selectedTask: Task;

    // private taskService: TaskService;

    // public constructor(taskService: TaskService){   // no construtor, eu declaro os Serviços que irei importar
    //   this.taskService = taskService;
    // }

    // Simplificando o que estava acima:
    public constructor(private taskService: TaskService){} // typescript permite declarar um atributo privato
                                                          // associado ao parâmetro do construtor

    public ngOnInit(){
      this.tasks = this.taskService.getTask()   // utilizo o método getTask do serviço taskService
    }

    public onSelect(task: Task): void {
        this.selectedTask = task;
    }

}
