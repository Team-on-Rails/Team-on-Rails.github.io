import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IssuesService } from 'src/app/services/issues.service';

@Component({
  selector: 'app-bulk-insert',
  templateUrl: './bulk-insert.component.html',
  styleUrls: ['./bulk-insert.component.css']
})
export class BulkInsertComponent {

  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private issuesService: IssuesService) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      description: ['']
    });
  }

  bulkInsert(): void {
    const formData = {
      issues_subjects: this.myForm.value.description.replace(/\n/g, '\r\n'),    
    };
    this.issuesService.bulkIssues(formData).subscribe((response) => {
      console.log(response);
      console.log('Issues added in bulk!');
    });
    this.router.navigate(['/issues']);
    
  }   

  goToIssues() {
    this.router.navigate(['/issues']);
  }
}
