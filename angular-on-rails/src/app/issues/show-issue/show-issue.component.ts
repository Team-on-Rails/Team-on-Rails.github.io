import { Component } from '@angular/core';
import { Issue } from "../../models/issue.model";
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { IssuesService } from '../../services/issues.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Comment } from '@angular/compiler';
import * as $ from 'jquery';


@Component({
  selector: 'app-show-issue',
  templateUrl: './show-issue.component.html',
  styleUrls: ['./show-issue.component.css']
})
export class ShowIssueComponent {
  private issueId!: number;
  unlockForm: FormGroup;
  blockForm: FormGroup;
  issue!: Issue;
  comments!: [];
  isWatcher: boolean = false;

  constructor(
    private issuesService: IssuesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  )
  {
    this.unlockForm = this.formBuilder.group({});
    this.blockForm = this.formBuilder.group({});
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const issueId = params.get('issueId');
      this.issueId = Number(issueId);
      console.log(this.issueId);
    });
    this.issuesService.getIssueById(this.issueId).subscribe(issue => {
        this.issue = issue;
      }
    );
    this.issuesService.getComments(this.issueId).subscribe(comments => {
      this.comments = comments;
      console.log(this.comments);
    })
  }

  unlockIssue() {
    this.issuesService.unlockIssue(this.issueId).subscribe(issue => {
        console.log("Unlocked Issue");
        this.issue = { ...this.issue, bloqueada: false };
      }
    );
  }
  blockIssue() {
    this.issuesService.blockIssue(this.issueId).subscribe(issue => {
        console.log("Locked Issue");
        this.issue = { ...this.issue, bloqueada: true };

      }
    );
  }

  postComment(comment: any) {
    const formattedComment = {
      comment: {
        content: comment
      }

  };

    console.log(formattedComment);
    this.issuesService.createComment(this.issueId, formattedComment).subscribe((response) => {
      console.log(response);
    });

    this.issuesService.getComments(this.issueId).subscribe(comments => {
      this.comments = comments;
      console.log(this.comments);
    });

    $('#commentInput').val('');
  }

  followIssue() {
    this.issuesService.watchIssue(this.issueId).subscribe((data: string) => {
        console.log("Watch Issue");
        console.log(data);
        this.issue = { ...this.issue, watched_by_ids: [1] };
      }
    );
    this.isWatcher = true;
  }

  unfollowIssue() {
    this.issuesService.unwatchIssue(this.issueId).subscribe((data: string) => {
        console.log("Watch Issue");
        console.log(data);
        this.issue = { ...this.issue, watched_by_ids: null };
      }
    );
    this.isWatcher = false;
  }

  goBack() {
    // Navegar a la página de issues por defecto
    this.router.navigate(['/issues']);
  }

  deleteIssue() {
    console.log('Intent de esborrar');
    this.issuesService.deleteIssue(this.issueId).subscribe((data: string) => {
        console.log("Delete Issue");
        console.log(data);
      }
    );
    this.router.navigate(['/issues']);
  }

  editIssue() {
    // Navegar a la página de edición del issue
    this.router.navigate(['/issues', this.issueId, 'edit']);
  }
  getIssuePath(section: string): string {
    if (section === 'comments') {
      return `/issue/${this.issue.id}/comments`;
    } else if (section === 'activities') {
      return `/issue/${this.issue.id}/activities`;
    } else {
      return '';
    }
  }
}
