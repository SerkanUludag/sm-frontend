import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { ContentViewComponent } from './components/content-view/content-view.component';
import { ContentComponent } from './components/content/content.component';
import { CourseAddComponent } from './components/course-add/course-add.component';
import { CourseComponent } from './components/course/course.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FeeComponent } from './components/fee/fee.component';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentComponent } from './components/student/student.component';
import { TeacherAddComponent } from './components/teacher-add/teacher-add.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserComponent } from './components/user/user.component';
import { LoginGuard } from './guards/login.guard';
import { NotLoggedGuard } from './guards/not-logged.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: [NotLoggedGuard],
  },
  { path: 'students', component: StudentComponent, canActivate: [LoginGuard] },
  {
    path: 'add-student',
    component: StudentAddComponent,
    canActivate: [AdminGuard],
  },
  { path: 'teachers', component: TeacherComponent, canActivate: [LoginGuard] },
  {
    path: 'add-teacher',
    component: TeacherAddComponent,
    canActivate: [AdminGuard],
  },
  { path: 'courses', component: CourseComponent, canActivate: [LoginGuard] },
  { path: 'courses/teachers/:teacherId', component: CourseComponent },
  {
    path: 'add-course',
    component: CourseAddComponent,
    canActivate: [AdminGuard],
  },
  { path: 'users', component: UserComponent, canActivate: [AdminGuard] },
  { path: 'add-user', component: UserAddComponent, canActivate: [AdminGuard] },
  { path: 'fees', component: FeeComponent, canActivate: [AdminGuard] },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'contents', component: ContentComponent, canActivate: [LoginGuard] },
  {
    path: 'contents/:courseId',
    component: ContentComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'courses/attendance/:courseId',
    component: AttendanceComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'courses/students/:studentId',
    component: CourseComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'contents/view/:contentId',
    component: ContentViewComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
