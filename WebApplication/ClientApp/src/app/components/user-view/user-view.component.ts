import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { userModel } from '../../Models/userModels';

@Component({
  selector: 'user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  public user: userModel;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.http.get<userModel>(`https://fakerestapi.azurewebsites.net/api/Users/${params['id']}`).subscribe(result => {
        this.user = result;
      }, error => console.error(error));

    });
  }

  deleteUser(id: string) {
    this.http.get<any[]>(`https://fakerestapi.azurewebsites.net/api/Users/${id}`).subscribe(result => {
      this.router.navigate(['/app-home', 'userDeleted']);
    }, error => console.error(error));
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the deletion of this user?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(id);

      }
    });
  }

}
