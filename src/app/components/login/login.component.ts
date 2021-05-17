import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private teacherService: TeacherService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          localStorage.setItem('userType', response.data.userType.toString());
          if (response.data.userType == 2) {
            this.teacherService.getByUserId(response.data.id).subscribe(
              (tResponse) => {
                localStorage.setItem('teacherId', tResponse.data.id.toString());
              },
              (tErrorResponse) => {
                this.toastrService.error(tErrorResponse.error.message);
              }
            );
          } else if (response.data.userType == 3) {
            this.studentService.getByUserId(response.data.id).subscribe(
              (sResponse) => {
                localStorage.setItem('studentId', sResponse.data.id.toString());
              },
              (sErrorResponse) => {
                this.toastrService.error(sErrorResponse.error.message);
              }
            );
          }
          this.toastrService.success(response.message, 'Success');
          this.router.navigate(['/home']);
          setTimeout(() => {
            location.reload();
          }, 1000);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.message, 'Login failed');
        }
      );
    }
  }
}
