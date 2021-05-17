import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.css'],
})
export class TeacherAddComponent implements OnInit {
  teacherAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.teacherAddForm = this.formBuilder.group({
      teacherName: ['', Validators.required],
      subject: ['', Validators.required],
      userId: ['', Validators.required],
    });
  }

  add() {
    if (this.teacherAddForm.valid) {
      let teacherModel = Object.assign({}, this.teacherAddForm.value);
      this.teacherService.addTeacher(teacherModel).subscribe(
        (response) => {
          this.toastrService.info(response.message, 'Success');
          this.router.navigate(['/home']);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.message, 'Failed');
        }
      );
    }
  }
}
