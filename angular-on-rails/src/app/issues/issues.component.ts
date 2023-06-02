import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Issue, Priority, Severity, State, TypeOf} from '../models/issue.model';
import {User} from '../models/user.model';
import {IssuesService} from '../services/issues.service';
import {UsersService} from '../services/users.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent {
  users: string[] = ['Usuario 1', 'Usuario 2', 'Usuario 3', 'Usuario 4'];

  busqueda: string = '';
  allIssues: Issue[] = [];
  firstIssueId: number = 0;
  firstIssue: Issue = {} as Issue;
  todosUsers!: User[];
  paramsIssues: Issue[] = [];

  existingParams = {
    state: '',
    typeOf: '',
    severity: '',
    priority: '',
    assignedTo: '',
    createdBy: ''
  };
  issueStates: string[] = [
    '', // empty string to show all issues
    State.New,
    State.InProgress,
    State.ReadyForTest,
    State.Closed,
    State.NeedsInfo,
    State.Rejected,
    State.Postponed,
  ];

  issueTypes: string[] = [
    '', // empty string to show all issues
    TypeOf.Bug,
    TypeOf.Enhancement,
    TypeOf.Question
  ];

  issueSeverities: string[] = [
    '', // empty string to show all issues
    Severity.Wishlist,
    Severity.Minor,
    Severity.Normal,
    Severity.Important,
    Severity.Critical
  ];

  issuePriorities: string[] = [
    '', // empty string to show all issues
    Priority.Low,
    Priority.Normal,
    Priority.High
  ];

  constructor(
    private issuesService: IssuesService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,


  ) {
    this.issuesService.getIssues().subscribe((data: Issue[]) => {
      console.log("Get all Issues");
      this.allIssues = data;
      this.firstIssueId = this.allIssues[0].id;
      console.log(this.allIssues);

      this.issuesService.getIssueById(this.firstIssueId).subscribe((data: Issue) => {
          console.log("Get first Issue");
          this.firstIssue = data;
          console.log(this.firstIssue);
        }
      );
    });
    this.usersService.getUsers().subscribe((data: User[]) => {
        this.todosUsers = data;
      }
    );
  }

  submittedIssueId!: string;


  ngOnInit() {
    this.submittedIssueId = "1";
  }

  buscarIssues() {
    this.router.navigate(['/issues/buscar'], { queryParams: { busqueda: this.busqueda } });
  }

  showIssue(id: number) {
    this.router.navigate(['/issues', id]);
  }

  selectUser(user: string) {
    this.usersService.setUser(user);
    console.log('Usuario seleccionado:', user);
  }

  filtrar() {
    const { state, typeOf, severity, priority, assignedTo, createdBy } = this.existingParams;
    this.issuesService.filtrarIssues(state, typeOf, severity, priority, assignedTo, createdBy).subscribe( (data: Issue[]) => {
      this.allIssues= data;
      console.log('Botón de filtro clickeado');
      console.log('Enviar parámetros de filtro:', this.existingParams, this.allIssues);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/issues']);
      });
    });
  }

  goCreate() {
    this.router.navigate(['/new']);
  }

  goBulk() {
    this.router.navigate(['/bulk']);
  }
}
