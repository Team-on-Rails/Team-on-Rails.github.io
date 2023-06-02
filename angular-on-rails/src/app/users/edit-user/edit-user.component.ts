import { Component } from '@angular/core';
import { User } from "../../models/user.model";
import { UsersService } from "../../services/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup,FormBuilder, Validators } from "@angular/forms";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent {
  user!: User;
  updateForm!: FormGroup;
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  onSubmit() {
    if (this.updateForm.valid) {
      const formUData = {
        user: JSON.stringify(this.updateForm.get('user')!.value),
        avatar: this.selectedFile as Blob
      };
      console.log(formUData);

      // Use the formData to send the request to the server
      this.usersService.updateUser(formUData).subscribe((data: User) => {
          console.log("Update User");
          console.log(data);
          this.goBack();
        }
      );
    }
  }

  ngOnInit() {
      this.usersService.getMe().subscribe((data: User) => {
          this.user = data;
          if (this.user.avatar) {
            this.user.avatar = environment.api_url + this.user.avatar;
          }
          console.log(this.user);
          
          this.updateForm.setValue({
            user: {
              name: this.user.name,
              bio: this.user.bio,
            },
            avatar: ''
          });
        }
      );
      this.buildUpdateForm();

  }

  goBack() {
    // Navegar a la página de users por defecto
    this.router.navigate(['/users']);
  }

  buildUpdateForm() {
    this.updateForm = this.formBuilder.group({
      user: this.formBuilder.group({
        name: ['', Validators.required],
        bio: [''], 
      }),
      avatar: ['']
    });
  }
}
