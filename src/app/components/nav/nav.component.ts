import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  userType: string;
  teacherId: number | null;
  studentId: number | null;
  currentPage: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private studentService: StudentService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.currentPage = 0;
    this.userType = this.authService.getUserType();
    if (this.userType == '2') {
      this.teacherId = parseInt(localStorage.getItem('teacherId'));
    } else if (this.userType == '3') {
      this.studentId = parseInt(localStorage.getItem('studentId'));
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
    setTimeout(() => location.reload(), 500);
  }

  getNavItemClass(pageNumber: number) {
    if (pageNumber == this.currentPage) {
      return 'nav-link active';
    } else {
      return 'nav-link';
    }
  }

  setCurrentPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
