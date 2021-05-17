import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/userModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: UserModel[];
  filterText: string = '';

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe(
      (response) => {
        this.users = response.data;
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.message);
      }
    );
  }

  getUserType(typeIndex: number) {
    if (typeIndex == 1) {
      return 'Admin';
    } else if (typeIndex == 2) {
      return 'Teacher';
    } else if (typeIndex == 3) {
      return 'Student';
    } else {
      return 'none';
    }
  }

  delete(user: UserModel) {
    this.userService.deleteUser(user).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Success');
        this.ngOnInit();
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.message);
      }
    );
  }
}
