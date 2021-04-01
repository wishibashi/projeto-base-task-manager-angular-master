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
    // providers: [ TaskService ]    // o provider TaskService está declarado no app.module.ts
})

export class TasksComponent implements OnInit{
    public tasks: Array<Task>;
    public newTask: Task;
   
    // private taskService: TaskService;

    // public constructor(taskService: TaskService){   // no construtor, eu declaro os Serviços que irei importar
    //   this.taskService = taskService;
    // }

    // Simplificando o que estava acima:
    public constructor(private taskService: TaskService){ // typescript permite declarar um atributo privato
                                                          // associado ao parâmetro do construtor
        this.newTask = new Task(null, '');
    }

    public ngOnInit(){
      this.taskService.getTasks()   // utilizo o método getTask do serviço taskService
        .subscribe(
            tasks => this.tasks = tasks,
            error => alert('Ocorreu um erro no servidor, tente mais tarde.')
        )
    }

    public createTask(){
        this.newTask.title = this.newTask.title.trim(); // trim retira brancos do início e do fim do string, além dos duplicados internamente

        if(!this.newTask.title){
            alert('A tarefa deve ter um título');
        }else{
            this.taskService.createTask(this.newTask)
                .subscribe(
                    (task) => {
                        this.tasks.push(task);  // inserir a tarefa na lista tasks
                        this.newTask = new Task(null, '');  // após inserir a tarefa, zera o newTask
                    },
                    () => alert('Ocorreu um erro no servidor, tente mais tarde.')
                )
        }
    }

    public deleteTask(task: Task){
        if(confirm(`Deseja realmente excluir a tarefa "${task.title}"`)) {  // sempre que tiver ${} utilizar a crase `` para delimitar o string
            this.taskService.deleteTask(task.id)
            .subscribe(
                () => this.tasks = this.tasks.filter(t => t !== task),
                () => alert('Ocorreu um erro no servidor, tente mais tarde.')
            )
        }
    }
}
