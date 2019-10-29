import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public action = "";

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.action = params['action'];
    });
  }
}
