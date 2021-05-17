import { Pipe, PipeTransform } from '@angular/core';
import { CourseModel } from '../models/courseModel';

@Pipe({
  name: 'filterForCourse',
})
export class FilterForCoursePipe implements PipeTransform {
  transform(value: CourseModel[], filterText: string): CourseModel[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (c) => c.courseName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
