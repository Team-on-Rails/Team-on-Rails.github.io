import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {IssuesService} from "../../services/issues.service";
import {Issue} from "../../models/issue.model";

@Component({
  selector: 'app-buscar-issue',
  templateUrl: './buscar-issue.component.html',
  styleUrls: ['./buscar-issue.component.css']
})
export class BuscarIssueComponent {
  busqueda: string = '';
  Issues: Issue[] = [];

  constructor(
    private router: Router,
    private issuesService: IssuesService,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.busqueda = params['busqueda'];
      console.log(this.busqueda);
      this.buscarIssues();
    });
  }

  buscarIssues() {
    this.issuesService.buscarIssues(this.busqueda).subscribe((data: Issue[]) => {
      console.log("Get all Issues");
      console.log(data);
      this.Issues = data;
    });
  }
  showIssue(id: number) {
    this.router.navigate(['/issues', id]);
  }
  goBackToIssues() {
    // Navegar a la página de issues por defecto
    this.router.navigate(['/issues']);
  }
}
