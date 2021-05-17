import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css'],
})
export class CourseAddComponent implements OnInit {
  courseAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.courseAddForm = this.formBuilder.group({
      courseName: ['', Validators.required],
      courseFee: ['', Validators.required],
      duration: ['', Validators.required],
      teacherId: ['', Validators.required],
    });
  }

  add() {
    if (this.courseAddForm.valid) {
      let courseModel = Object.assign({}, this.courseAddForm.value);

      this.courseService.addCourse(courseModel).subscribe(
        (response) => {
          this.toastrService.info(response.message, 'Success');
          this.router.navigate(['/home']);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.message, 'Failed');
          console.log(errorResponse);
        }
      );
    }
  }
}
