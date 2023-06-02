import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IssuesComponent } from './issues/issues.component';
import { UsersComponent } from './users/users.component';
import { ShowIssueComponent } from './issues/show-issue/show-issue.component';
import { EditIssueComponent } from './issues/edit-issue/edit-issue.component';
import { ShowUserComponent } from './users/show-user/show-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { IssuesService } from './services/issues.service';
import { UsersService } from './services/users.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './http-interceptor';
import { FormsModule } from '@angular/forms';
import { BuscarIssueComponent } from './issues/buscar-issue/buscar-issue.component';
import { NewIssueComponent } from './issues/new-issue/new-issue.component';
import { BulkInsertComponent } from './issues/bulk-insert/bulk-insert.component';


@NgModule({
  declarations: [
    AppComponent,
    IssuesComponent,
    UsersComponent,
    ShowIssueComponent,
    EditIssueComponent,
    ShowUserComponent,
    EditUserComponent,
    ShowIssueComponent,
    BuscarIssueComponent,
    NewIssueComponent,
    BulkInsertComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
    IssuesService,
    UsersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


