import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TeacherModel } from 'src/app/models/teacherModel';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent implements OnInit {
  teachers: TeacherModel[];
  filterText: string = '';

  constructor(
    private teacherService: TeacherService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers() {
    this.teacherService.getAll().subscribe(
      (response) => {
        this.teachers = response.data;
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.message);
      }
    );
  }

  delete(teacher: TeacherModel) {
    this.teacherService.deleteTeacher(teacher).subscribe(
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
