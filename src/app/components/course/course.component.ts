import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AttendanceModel } from 'src/app/models/attendanceModel';
import { CourseModel } from 'src/app/models/courseModel';
import { AttendanceService } from 'src/app/services/attendance.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  courses: CourseModel[];
  filterText: string = '';
  teacherId: number | null;
  studentId: number | null;
  dataLoaded = false;
  showCoursesForStudent: boolean;

  constructor(
    private courseService: CourseService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private attendanceService: AttendanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['teacherId']) {
        this.teacherId = parseInt(params['teacherId']);
        this.getCoursesByTeacher(this.teacherId);
      } else if (params['studentId']) {
        this.studentId = parseInt(params['studentId']);
        this.getCoursesByStudent(this.studentId);
      } else {
        if (localStorage.getItem('studentId')) {
          this.showCoursesForStudent = true;
        } else {
          this.showCoursesForStudent = false;
        }
        this.teacherId = null;
        this.studentId = null;
        this.getCourses();
      }
    });
  }

  getCourses() {
    this.courseService.getAll().subscribe(
      (response) => {
        this.courses = response.data;
        this.dataLoaded = true;
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.message);
      }
    );
  }

  getCoursesByTeacher(id: number) {
    this.courseService.getCoursesByTeacher(id).subscribe(
      (response) => {
        this.courses = response.data;

        this.dataLoaded = true;
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  getCoursesByStudent(id: number) {
    this.courseService.getCoursesByStudent(id).subscribe(
      (response) => {
        this.courses = response.data;

        this.dataLoaded = true;
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  delete(course: CourseModel) {
    this.courseService.deleteCourse(course).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Success');
        this.ngOnInit();
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.message);
      }
    );
  }

  enroll(courseId: number) {
    let attendanceModel = new AttendanceModel();
    attendanceModel.courseId = courseId;
    attendanceModel.studentId = parseInt(localStorage.getItem('studentId'));
    this.attendanceService.enroll(attendanceModel).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Enrolled');
        this.router.navigate(['/home']);
      },
      (errorResponse) => {
        this.toastrService.error(
          errorResponse.error.message,
          'Failed to enroll'
        );
      }
    );
  }
}
