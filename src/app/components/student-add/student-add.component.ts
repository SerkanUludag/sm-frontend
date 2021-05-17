import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css'],
})
export class StudentAddComponent implements OnInit {
  studentAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.studentAddForm = this.formBuilder.group({
      studentName: ['', Validators.required],
      address: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', Validators.required],
      college: ['', Validators.required],
      year: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      userId: ['', Validators.required],
    });
  }

  add() {
    if (this.studentAddForm.valid) {
      let studentModel = Object.assign({}, this.studentAddForm.value);
      this.studentService.addStudent(studentModel).subscribe(
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
