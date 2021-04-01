import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';   // Injectable é um decorator para implementar serviços

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/Observable/throw'

import { Task } from './task.model';

@Injectable()

export class TaskService{
  public tasksURL = 'api/tasks';
  public headers = new Headers ({'Content-type': 'application/json'})

  public constructor(private http: Http){}

  public getAll(): Observable<Task[]>{
    return this.http.get(this.tasksURL)
      //.catch((error: Response) => this.handleErrors(error))
      .catch(this.handleErrors)
      .map((response: Response) => response.json().data as Task[])
  }

  public getImportant(): Observable<Task[]>{
    return this.getAll()
      .map(tasks => tasks.slice(0,4));
  }

  public getById(id: number): Observable<Task>{
    let url = `${this.tasksURL}/${id}`;

    return this.http.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => response.json().data as Task);
  }

  public create(task: Task): Observable<Task>{
    let url = this.tasksURL
    let body = JSON.stringify(task);
  
    return this.http.post(url, body, {headers: this.headers}) 
    .catch(this.handleErrors)
    .map(response => response.json().data as Task);
  }

   public update(task: Task): Observable<Task>{
    let url = `${this.tasksURL}/${task.id}`;
    let body = JSON.stringify(task);
   
    return this.http.put(url, body, {headers: this.headers}) 
      .catch(this.handleErrors)
      .map(() => task)
  }

  public delete(id: number): Observable<null>{
    let url = `${this.tasksURL}/${id}`;

    return this.http.delete(url, {headers: this.headers}) 
      .catch(this.handleErrors)
      .map(() => null)
  }

  private handleErrors(error: Response){
    console.log("SALVANDO O ERRO NO ARQUIVO DE LOG - DETALHES DO ERRO => ", error);
    return Observable.throw(error)
  }
 
 }
