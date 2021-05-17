import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { StudentComponent } from './components/student/student.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { CourseComponent } from './components/course/course.component';
import { UserComponent } from './components/user/user.component';
import { ToastrModule } from 'ngx-toastr';
import { TeacherAddComponent } from './components/teacher-add/teacher-add.component';
import { CourseAddComponent } from './components/course-add/course-add.component';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { FilterForTeacherPipe } from './pipes/filter-for-teacher.pipe';
import { FilterForStudentPipe } from './pipes/filter-for-student.pipe';
import { FilterForCoursePipe } from './pipes/filter-for-course.pipe';
import { FilterForUserPipe } from './pipes/filter-for-user.pipe';
import { ContentComponent } from './components/content/content.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { ContentViewComponent } from './components/content-view/content-view.component';
import { FeeComponent } from './components/fee/fee.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    StudentComponent,
    TeacherComponent,
    CourseComponent,
    UserComponent,
    TeacherAddComponent,
    CourseAddComponent,
    StudentAddComponent,
    UserAddComponent,
    FilterForTeacherPipe,
    FilterForStudentPipe,
    FilterForCoursePipe,
    FilterForUserPipe,
    ContentComponent,
    AttendanceComponent,
    ContentViewComponent,
    FeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
