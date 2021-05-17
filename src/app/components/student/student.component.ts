import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentModel } from 'src/app/models/studentModel';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  students: StudentModel[];
  filterText: string = '';

  constructor(
    private studentService: StudentService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getAll().subscribe(
      (response) => {
        this.students = response.data;
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.message);
      }
    );
  }

  delete(student: StudentModel) {
    this.studentService.deleteStudent(student).subscribe(
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
