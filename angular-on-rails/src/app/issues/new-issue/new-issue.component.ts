import { Component, OnInit, Type } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Issue, Priority, Severity, State, TypeOf } from 'src/app/models/issue.model';
import { IssuesService } from 'src/app/services/issues.service';

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css']
})
export class NewIssueComponent implements OnInit{

  constructor(private issuesService: IssuesService, private formBuilder: FormBuilder, private router: Router) {}

  creationForm!: FormGroup;
  updateForm!: FormGroup;
  deleteForm!: FormGroup;
  submittedIssueId!: string;
  userIds!: string[];
  typeOptions: string[] = Object.values(TypeOf);
  severityOptions: string[] = Object.values(Severity);
  priorityOptions: string[] = Object.values(Priority);
  stateOptions: string[] = Object.values(State);


  ngOnInit(): void {
    this.buildCreateForm();
    this.userIds = this.getUsers();
  }

  buildCreateForm() {
    this.creationForm = this.formBuilder.group({
      issue: this.formBuilder.group({
        subject: ['', Validators.required],
        description: ['', Validators.required],
        state: ['new'],
        typeof: ['bug'],
        severity: ['critical'],
        priority: ['low'],
        deadline: [''],
        assigned_to_id: [null]
      }),
      documents: ['']
    });
  }

  getUsers() {
    return ['1','2','3'];
  }

  goToIssues() {
    this.router.navigate(['/issues']);
  }

  onSubmit(formIdentifier: string) {
    if (this.creationForm.valid && formIdentifier == "creationForm") {
      const formData = {
        issue: JSON.stringify(this.creationForm.get('issue')!.value),
        documents: this.creationForm.get('documents')!.value
      };
      console.log(formData);
      // Use the formData to send the request to the server
      this.issuesService.createIssue(formData).subscribe((data: Issue) => {
        console.log("Create Issue");
        console.log(data);
        this.submittedIssueId = data.id.toString();
      }
      );
      this.router.navigate(['/issues']);
    }
  }
}


