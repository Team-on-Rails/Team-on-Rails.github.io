import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue.model';
import { environment } from '../../environments/environment';
import {Document} from "../models/document.model";
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  private api_url = environment.api_url;
  private issues_url = this.api_url + '/issues';

  constructor(private http: HttpClient) { }

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.issues_url);
  }

  getIssueById(id: number): Observable<Issue> {
    return this.http.get<Issue>(this.issues_url + '/' + id);
  }

  createIssue(formData: any): Observable<Issue> {
    return this.http.post<Issue>(this.issues_url, formData);
  }

  bulkIssues(formData: any): Observable<Issue> {
    return this.http.post<Issue>(this.issues_url + '/bulk', formData);
  }

  updateIssue(id: number, formData: any): Observable<Issue> {
    return this.http.put<Issue>(this.issues_url + '/' + id, formData);
  }

  buscarIssues(busqueda: string): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.issues_url + '/buscar' + '?busqueda=' + busqueda);
  }

  filtrarIssues(state: string, typeOf: string, severity: string, priority: string, assignedTo: string, createdBy: string): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.issues_url + '?state=' + state + '&typeof=' + typeOf + '&severity=' + severity + '&priority=' + priority + '&assignedTo=' + assignedTo + '&createdBy=' + createdBy);
  }

  deleteIssue(id: number): Observable<string> {
    return this.http.delete<string>(this.issues_url + '/' + id);
  }

  blockIssue(id: number): Observable<Issue> {
    return this.http.patch<Issue>(this.issues_url + '/' + id + '/block', {});
  }

  unlockIssue(id: number): Observable<Issue> {
    return this.http.patch<Issue>(this.issues_url + '/' + id + '/unlock', {});
  }

  watchIssue(id: number): Observable<string> {
    return this.http.put<string>(this.issues_url + '/' + id + '/watch', {});
  }

  unwatchIssue(id: number): Observable<string> {
    return this.http.delete<string>(this.issues_url + '/' + id + '/unwatch', {});
  }

  // DOCUMENTS ///////////////////////////////////////////////////////////////////////////////////////////

  getDocuments(id: number): Observable<Document[]> {
    return this.http.get<Document[]>(this.issues_url + '/' + id + "/documents");
  }

  getDocumentById(id: number, idDocument: number): Observable<Document> {
    return this.http.get<Document>(this.issues_url + '/' + id + "/documents/" + idDocument);
  }

  deleteDocument(id: number, idDocument: number): Observable<string> {
    return this.http.delete<string>(this.issues_url + '/' + id + '/documents' + idDocument, {});
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////


  // COMMENTS ////////////////////////////////////////////////////////////////////////////////////////////

  getComments(id: number): Observable<[]> {
    return this.http.get<[]>(this.issues_url + '/' + id + "/comments");
  }

  getCommentById(id: number, idComment: number): Observable<Comment> {
    return this.http.get<Comment>(this.issues_url + '/' + id + "/comments/" + idComment);
  }

  createComment(id: number, formData: any): Observable<string> {
    return this.http.post<string>(this.issues_url + '/' + id + "/comments", formData);
  }

  deleteComment(id: number, idComment: number): Observable<string> {
    return this.http.delete<string>(this.issues_url + '/' + id + "/comments/" + idComment);
  }

  updateComment(id: number, idComment: number, formData: any): Observable<string> {
    return this.http.patch<string>(this.issues_url + '/' + id + "/comments/" + idComment, formData);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  // ACTIVITIES //////////////////////////////////////////////////////////////////////////////////////////

  getActivities(id: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.issues_url + '/' + id + "/activities");
  }

  getActivityById(id: number, idActivity: number): Observable<Activity> {
    return this.http.get<Activity>(this.issues_url + '/' + id + "/activities/" + idActivity);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////


}
