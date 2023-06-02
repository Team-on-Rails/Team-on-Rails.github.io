import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { Issue } from 'src/app/models/issue.model';
import { User } from 'src/app/models/user.model';
import { IssuesService } from 'src/app/services/issues.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent {

  private userId!: number;
  user!: User;
  isWatcher: boolean = false;
  activities: Activity[] = [];
  watched: Issue[] = [];
  section: string | null = null;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private issuesService: IssuesService,
  )
  {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.section = params.get('section');
    });
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      this.userId = Number(userId);
      console.log(this.userId);
    });
    this.section = this.route.snapshot.queryParamMap.get('section');
    console.log("SECTIONE:",this.section);

    this.usersService.getUserById(this.userId).subscribe(user => {
        if (user.avatar) {
          user.avatar = environment.api_url + user.avatar;
        }
        this.user = user;

        this.user.watched_issue_ids.forEach(issueId => {
          this.issuesService.getIssueById(issueId).subscribe(issue => {
            this.watched.push(issue);
          });
        }
        );

      }
    );
    this.usersService.getActivities(this.userId).subscribe(activities => {
      this.activities = activities;
      this.activities.sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      );
    }
    );
  }



  goBack() {
    // Navegar a la página de users por defecto
    this.router.navigate(['/users']);
  }


  getUserPath(section: string): string {
    console.log("SECTION:",section);
    if (section === 'comments') {
      return `/user/${this.user.id}/comments`;
    } else if (section === 'activities') {
      return `/user/${this.user.id}/activities`;
    } else {
      return '';
    }
  }

  changeSection(section: string): void {
    this.router.navigate([], { queryParams: { section }, queryParamsHandling: 'merge' });
  }


}
