import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {UsersService} from "./services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  users: any[] = [];
  selectedUser: string = '';

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.users = usersService.users;
  }
  title = 'angular-on-rails';
  usuariSeleccionat = 'user1';

  editUser() {
    // Navegar a la página de edición del user
    this.router.navigate(['/users', 'edit']);
  }

  goIssues() {
    this.router.navigate(['/issues']);
  }

  goUsers() {
    this.router.navigate(['/users']);
  }
/*
  selectUser() {
    const user = this.users.find(u => u.name === this.selectedUser);
    this.usersService.setUser(user);
    environment.apiKey = user.apiKey;
    console.log('Usuario seleccionado:', user);
  }*/

  switchToUser(user: string): void {
    if (user === 'user1') {
      this.usersService.switchUser('user1');
      environment.apiKey = environment.apiKeyUser1;
    } else if (user === 'user2') {
      this.usersService.switchUser('user2');
      environment.apiKey = environment.apiKeyUser2;
    } else {
      // Manejar el caso cuando se proporciona un usuario inválido
      console.error('Usuario inválido');
    }
  }

}
