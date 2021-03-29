import { Component, Input } from '@angular/core';   // estou importando os decorators Component e Input

import { Task } from '../shared/task.model'

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent{
  @Input() public task: Task;         // @Input significa que eu posso fazer um binding como parâmetro de entrada para atribuir a propriedade task

}
