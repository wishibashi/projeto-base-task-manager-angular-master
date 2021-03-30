import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';   // Injectable é um decorator para implementar serviços

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Task } from './task.model';

@Injectable()

export class TaskService{
  public tasksURL = 'api/tasks';

  public constructor(private http: Http){}

  public getTasks(): Observable<Task[]>{
    return this.http.get(this.tasksURL)
      .map((response: Response) => response.json().data as Task[]);
  }

  public getImportantTasks(): Observable<Task[]>{
    return this.getTasks()
      .map(tasks => tasks.slice(0,4));
  }

  public getTask(id: number): Observable<Task>{
    let url = `${this.tasksURL}/${id}`;

    return this.http.get(url)
      .map((response: Response) => response.json().data as Task);
  }
 
}
