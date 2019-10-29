import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { userModel } from '../../Models/userModels';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  ngOnInit() {

  }

  onSubmit(submitData) {
    this.submitted = true;
    var userId = 0;
    if (this.form.invalid) {
      return;
    }

    this.http.put<userModel[]>(`https://fakerestapi.azurewebsites.net/api/Users/${userId}`, submitData).subscribe(result => {
      this.router.navigate(['/app-home','userAdded']);
    }, error => console.error(error));

  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

}
