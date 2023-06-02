import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: any[] = [
    { name: 'Didac', apiKey: '61a9b3265f5a86dbdcb6d6895359ea85' },
    { name: 'Pol', apiKey: 'API_KEY_2' },
    { name: 'Carles', apiKey: 'ad6b4df59ad43b82d5036fefada69a83' }
  ];

  selectedUser: any = null;

  private api_url = environment.api_url;
  private users_url = this.api_url + '/users';

  private currentUser: 'user1' | 'user2' = 'user1';
  private apiKey: string;

  constructor(private http: HttpClient) {
    this.currentUser = 'user1';
    this.apiKey = environment.apiKeyUser1;
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.users_url);
  }

  getMe(): Observable<User> {
    return this.http.get<User>(this.users_url + '/me');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.users_url + '/' + id);
  }

  updateUser(formData: any): Observable<User> {
    return this.http.patch<User>(this.users_url + '/update', formData);
  }

  getActivities(userId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.users_url + '/' + userId + '/activities');
  }

  setUser(user: string) {
    this.selectedUser = user;

  }

  getCurrentUser(): 'user1' | 'user2' {
    return this.currentUser;
  }

  // Cambiar al usuario especificado y actualizar la API Key correspondiente
  switchUser(user: 'user1' | 'user2'): void {
    this.currentUser = user;
    this.apiKey = (user === 'user1') ? environment.apiKeyUser1 : environment.apiKeyUser2;
  }

  // Obtener la API Key actualmente utilizada
  getApiKey(): string {
    return this.apiKey;
  }

}
