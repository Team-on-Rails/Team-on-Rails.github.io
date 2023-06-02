import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IssuesService } from '../../services/issues.service';
import { Issue } from "../../models/issue.model";
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from "../../models/document.model";
import { UsersService } from "../../services/users.service";
import { User } from "../../models/user.model";


@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.css']
})

export class EditIssueComponent {
  updateForm!: FormGroup;
  submittedIssueId!: number;
  issue!: Issue;
  users!: User[];
  watchers: number[] | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private issuesService: IssuesService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
  }

  ngOnInit() {
    this.loadUsers();
    this.route.paramMap.subscribe(params => {
      const issueId = params.get('issueId');
      this.submittedIssueId = Number(issueId);
    });

    this.buildUpdateForm();


    this.issuesService.getIssueById(this.submittedIssueId).subscribe(issue => {
      this.issue = issue;
      console.log(this.issue);
      this.watchers = this.issue.watched_by_ids;
      this.patchUpdateForm();

      }
    );

    this.issuesService.getDocuments(this.submittedIssueId).subscribe((documents: Document[]) => {
      this.issue = {...this.issue, documents: documents};
    });

  }

  loadUsers() {
    this.usersService.getUsers().subscribe  (users => {
      this.users = users;
      console.log(this.users);
    });
  }

  getDocumentUrl(document: any): string {
    // Lógica para obtener la URL del documento adjunto
    // Aquí debes generar y retornar la URL adecuada para el documento proporcionado
    return document.url;
  }

  goBack() {
    // Navegar a la página de show issue
    this.router.navigate(['/issues', this.submittedIssueId]);
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const formUData = {
        issue: JSON.stringify(this.updateForm.get('issue')!.value),
        documents: this.updateForm.get('documents')!.value,
      };
      console.log(formUData);
      // Use the formData to send the request to the server
      this.issuesService.updateIssue(Number(this.submittedIssueId), formUData).subscribe((data: Issue) => {
          console.log("Update Issue");
          console.log(data);
          this.goBack();
        }
      );
    }
  }

  buildUpdateForm() {
    this.updateForm = this.formBuilder.group({
      issue: this.formBuilder.group({
        subject: ['', Validators.required],
        description: ['', Validators.required],
        state: [''],
        typeof: [''],
        severity: [''],
        priority: [''],
        deadline: [''],
        assigned_to_id: [''],
        watched_by_ids: ['']
      }),

      documents: [[]],// Inicializar como un array vacío
    });
  }

  patchUpdateForm(){
    this.updateForm.patchValue({
      issue: {
        subject: this.issue.subject,
        description: this.issue.description,
        state: this.issue.state,
        typeof: this.issue.typeof,
        severity: this.issue.severity,
        priority: this.issue.priority,
        deadline: this.issue.deadline,
        assigned_to_id: [this.issue.assigned_to_id],
        watched_by_ids: [this.issue.watched_by_ids]
      },
      documents: [this.issue.documents],
    });
  }
}
