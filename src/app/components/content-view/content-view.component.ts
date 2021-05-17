import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContentModel } from 'src/app/models/contentModel';
import { CourseModel } from 'src/app/models/courseModel';
import { ContentService } from 'src/app/services/content.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.css'],
})
export class ContentViewComponent implements OnInit {
  content: ContentModel;
  course: CourseModel;
  dataLoaded: boolean = false;

  constructor(
    private contentService: ContentService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.getCourse(parseInt(localStorage.getItem('courseId')));
    this.activatedRoute.params.subscribe((params) => {
      this.getContent(params['contentId']);
    });
  }

  getContent(id: number) {
    this.contentService.getById(id).subscribe(
      (response) => {
        this.content = response.data;
        this.dataLoaded = true;
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.message, 'Error');
      }
    );
  }

  getCourse(id: number) {
    this.courseService.getById(id).subscribe(
      (response) => {
        this.course = response.data;
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.message);
      }
    );
  }
}
