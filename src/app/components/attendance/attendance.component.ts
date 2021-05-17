import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AttendanceModel } from 'src/app/models/attendanceModel';
import { CourseModel } from 'src/app/models/courseModel';
import { StudentModel } from 'src/app/models/studentModel';
import { AttendanceService } from 'src/app/services/attendance.service';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit {
  attendants: AttendanceModel[];
  dataLoaded = false;
  currentCourse: CourseModel;
  students: StudentModel[];

  constructor(
    private attendanceService: AttendanceService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private courseService: CourseService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getStudents();
    this.activatedRoute.params.subscribe((params) => {
      if (params['courseId']) {
        this.getCourse(parseInt(params['courseId']));
      }
    });
  }

  getAttendants() {
    this.attendanceService.getByCourseId(this.currentCourse.id).subscribe(
      (response) => {
        this.attendants = response.data;
        this.dataLoaded = true;
      },
      (errorResponse) => {
        console.log(errorResponse);

        this.toastrService.error(
          errorResponse.error.message,
          'Failed to get participants'
        );
      }
    );
  }

  getCourse(id: number) {
    this.courseService.getById(id).subscribe((response) => {
      this.currentCourse = response.data;
      this.getAttendants();
    });
  }

  getStudents() {
    this.studentService.getAll().subscribe(
      (response) => {
        this.students = response.data;
      },
      (errorResponse) => {
        this.toastrService.error(
          errorResponse.error.message,
          'Error while getting data'
        );
      }
    );
  }

  getStudentName(id: number) {
    return this.students.filter((s) => s.id == id)[0].studentName;
  }
}
