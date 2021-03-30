import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'

// As boas práticas recomendam colocar as importações em ordem alfabética
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TaskService } from './tasks/shared/task.service';

const ROUTES = RouterModule.forRoot([   // forRoot gera um módulo com todas os providers e diretivas de rotas 
  {
    path: 'tasks/:id',
    component: TaskDetailComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
])

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    TasksComponent,
    TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ROUTES        // contém todos os módulos necessários, por isso não é necessário importar RouterModule
  ],
 // providers: [
    //   { provide: TaskService, useClass: TaskService } // quando alguém perguntar por TaskService (provide),
    //                                                     // responda com TaskService (useClass)
    // ]
    
    // como provide=useClass, simplifico
  providers: [
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
