import { Component, Input, OnInit } from '@angular/core';   // estou importando os decorators Component e Input
import { ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap'  // adiciona o operador switchMap

import { Task } from '../shared/task.model'
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit{
  @Input() public task: Task;         // @Input significa que eu posso fazer um binding como parâmetro de entrada para atribuir a propriedade task

  public constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ){}

  public ngOnInit(){
    this.route.params
      .switchMap((params: Params) => this.taskService.getTask(+params['id']))  // no app.module.ts definimos que na rota TaskDetailComponent vai ter um id
                                                                               // + transforma o string 'params['id'] em number
      // no caso de ter havido muitas requisições 'dominio.com/id', o switchMap cancela todos e mantem apenas a última
      // o getTask retorna Promise<Task>, porém o switchMap transforma esse retorno em Observable<Task>
      .subscribe(task => this.task = task)  
      // o operador subscribe é obrigatório, ele é o gatilho para o route.params
      // o subscribe usa o Observable<task> retornado pelo switchMap
      // o subscribe é para o Observable o mesmo que then é para Promise
  }
}
