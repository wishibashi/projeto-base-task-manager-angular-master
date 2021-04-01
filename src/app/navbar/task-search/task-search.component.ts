import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/Observable/of';

import { Task } from 'app/tasks/shared/task.model';
import { TaskService } from 'app/tasks/shared/task.service';

@Component({
    selector: 'task-search',
    templateUrl: './task-search.component.html',
})

export class TaskSearchComponent implements OnInit { 
    public searchTerms: Subject<string> = new Subject();    // Subject é uma classe que pode ser Observador e Observado ao mesmo tempo
    public tasks: Task[] = [];

    public constructor(private taskService: TaskService, private router: Router) {}

    public ngOnInit(){
        this.searchTerms
            .debounceTime(300)  // se ocorrer nova tecla antes de 300 ms, pula pro próximo term
            .distinctUntilChanged() // se o usuário digitou uma palavra, começou a segunda, mas logo apagou, não vai repetir a última busca
            .switchMap(         // switchMap garante que eu vou considerar somente o último acesso ao searchByTitle
                term => term ? this.taskService.searchByTitle(term) : Observable.of<Task[]>([])    // se o term for vazio, retorna [] 
            )
            .subscribe(
                tasks => this.tasks = tasks
            )
    }

    public search(term: string) {
        this.searchTerms.next(term); // next passa o próximo term que chegou
    }

    public gotoTask(task: Task) {
        this.tasks = [];
        this.router.navigate(['/tasks',task.id]);
    }

}
