import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  allUsers: User[] = [];

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    ) {
    this.usersService.getUsers().subscribe((data: User[]) => {
      console.log("Get all Users");
      this.allUsers = data;
    });
  }





  showUser(id: number) {
    this.router.navigate(['/users', id]);
  }

}
