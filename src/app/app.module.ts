// Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// component imports
// As boas práticas recomendam colocar as importações em ordem alfabética
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';

// services imports
import { TaskService } from './tasks/shared/task.service';

// routing imports
import { AppRoutingModule } from './app.routing.module';

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
    AppRoutingModule
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
