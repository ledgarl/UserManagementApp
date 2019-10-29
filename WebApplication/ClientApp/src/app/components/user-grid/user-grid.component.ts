import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material'
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { userModel } from '../../Models/userModels';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {

  public users: userModel[];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {
    http.get<userModel[]>('https://fakerestapi.azurewebsites.net/api/Users').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }

  ngOnInit() {
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

