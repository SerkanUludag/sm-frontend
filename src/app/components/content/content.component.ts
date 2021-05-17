import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContentModel } from 'src/app/models/contentModel';
import { CourseModel } from 'src/app/models/courseModel';
import { ContentService } from 'src/app/services/content.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  teacherCourses: CourseModel[];
  content: string;
  contentDate: string;
  dataLoaded = false;
  currentCourseId: number;
  currentCourseContents: ContentModel[];
  currentCourse: CourseModel;
  isTeacher: boolean;

  constructor(
    private contentService: ContentService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('userType') == '2') {
      this.isTeacher = true;
    } else {
      this.isTeacher = false;
    }
    this.activatedRoute.params.subscribe((params) => {
      this.currentCourseId = parseInt(params['courseId']);
      this.getCurrentCourse(this.currentCourseId);
      this.getCurrentCourseContents(this.currentCourseId);
    });
  }

  getCurrentCourse(id: number) {
    this.courseService.getById(id).subscribe(
      (response) => {
        this.currentCourse = response.data;
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.message, 'Error');
      }
    );
  }

  getCurrentCourseContents(id: number) {
    this.contentService.getByCourseId(id).subscribe(
      (response) => {
        this.currentCourseContents = response.data;
        this.dataLoaded = true;
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.message, 'Error');
      }
    );
  }

  add() {
    let contentModel = new ContentModel();
    contentModel.content = this.content;
    console.log(this.currentCourseId);
    contentModel.courseId = this.currentCourseId;
    contentModel.date = new Date(this.contentDate);

    this.contentService.addContent(contentModel).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Success');
        this.ngOnInit();
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.message, 'Error');
      }
    );
  }

  setCourseId() {
    localStorage.setItem('courseId', this.currentCourse.id.toString());
  }
}
