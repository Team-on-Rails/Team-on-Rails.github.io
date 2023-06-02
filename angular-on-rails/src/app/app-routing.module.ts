import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuesComponent } from './issues/issues.component';
import { UsersComponent } from './users/users.component';
import { EditIssueComponent } from "./issues/edit-issue/edit-issue.component";
import { ShowIssueComponent } from "./issues/show-issue/show-issue.component";
import { ShowUserComponent } from './users/show-user/show-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { BuscarIssueComponent } from "./issues/buscar-issue/buscar-issue.component";
import { NewIssueComponent } from './issues/new-issue/new-issue.component';
import { BulkInsertComponent } from './issues/bulk-insert/bulk-insert.component';

const routes: Routes = [
  { path: '', redirectTo: '/issues', pathMatch: 'full' },
  { path: 'issues', component: IssuesComponent },
  { path: 'issues/buscar', component: BuscarIssueComponent },
  { path: 'issues/:issueId', component: ShowIssueComponent },
  { path: 'issues/:issueId/edit', component: EditIssueComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/edit', component: EditUserComponent },
  { path: 'users/:userId', component: ShowUserComponent },
  { path: 'new', component: NewIssueComponent },
  { path: 'bulk', component: BulkInsertComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
