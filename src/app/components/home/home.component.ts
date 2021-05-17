import { Component, OnInit } from '@angular/core';

import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userType: number;
  dataLoaded: boolean = false;
  name: string;
  teacherId: number;
  studentId: number;

  constructor(
    private teacherService: TeacherService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.userType = parseInt(localStorage.getItem('userType'));
    if (this.userType == 2) {
      this.teacherId = parseInt(localStorage.getItem('teacherId'));
    } else if (this.userType == 3) {
      this.studentId = parseInt(localStorage.getItem('studentId'));
    }
    this.getUserName();
  }

  getUserName() {
    if (this.userType == 2) {
      this.teacherService.getById(this.teacherId).subscribe((response) => {
        this.name = response.data.teacherName;
        this.dataLoaded = true;
      });
    } else if (this.userType == 3) {
      this.studentService.getById(this.studentId).subscribe((response) => {
        this.name = response.data.studentName;
        this.dataLoaded = true;
      });
    }
  }
}
