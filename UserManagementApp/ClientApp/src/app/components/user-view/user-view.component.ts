import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { userModel } from '../../Models/userModels';

@Component({
  selector: 'user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  public user: userModel;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.http.get<userModel>(`https://fakerestapi.azurewebsites.net/api/Users/${params['id']}`).subscribe(result => {
        this.user = result;
      }, error => console.error(error));

    });
  }

}
