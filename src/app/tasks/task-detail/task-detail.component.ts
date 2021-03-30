// import { Component, Input, OnInit } from '@angular/core';   // estou importando os decorators Component e Input
// Veja abaixo que não utilizaremos mais o Input
import { Component, OnInit } from '@angular/core';   // estou importando os decorators Component e OnInit
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common'  // Location já é declarado como provider em ROUTES no app.modules.ts

import 'rxjs/add/operator/switchMap'  // adiciona o operador switchMap

import { Task } from '../shared/task.model'
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit{
  // @Input() public task: Task;         // @Input significa que eu posso fazer um binding como parâmetro de entrada para atribuir a propriedade task
  // Retiramos a linha abaixo do tasks.component.html, não precisamos mais do input
  // <task-detail [task]="selectedTask"></task-detail>   <!-- a propriedade task do task-detail recebe o valor selectedTask -->
  public task: Task;

  public constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location
  ){}

  public ngOnInit(){
    this.route.params
      // no caso de ter havido muitas requisições 'dominio.com/id', o switchMap cancela todos e mantem apenas a última
      // o getTask retorna Promise<Task>, porém o switchMap transforma esse retorno em Observable<Task>
      .switchMap((params: Params) => this.taskService.getTask(+params['id']))  // no app.module.ts definimos que na rota TaskDetailComponent vai ter um id
                                                                               // + transforma o string 'params['id'] em number
      // o operador subscribe é obrigatório, ele é o gatilho para o route.params
      // o subscribe usa o Observable<task> retornado pelo switchMap
      // o subscribe é para o Observable o mesmo que then é para Promise
      .subscribe(
        task => this.task = task,
        error => alert("Ocorreu um erro no servidor, tente mais tarde.")
        )  
    }

  public goBack(){
    this.location.back();
  }

  public updateTask(task: Task){
    if(!this.task.title){   // this.task.title verifica se title está presente, ! = negação
      alert("A tarefa deve ter um título")      
    }else{
      this.taskService.updateTask(this.task)
      .subscribe(
        () => alert("Tarefa atualizada com sucesso!"),  // não preciso do valor retornado pelo updateTask
        () => alert("Ocorreu um erro no servidor, tente mais tarde.") // não preciso do valor do erro
      )
    }
  }

}
