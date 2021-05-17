import { Pipe, PipeTransform } from '@angular/core';
import { TeacherModel } from '../models/teacherModel';

@Pipe({
  name: 'filterForTeacher',
})
export class FilterForTeacherPipe implements PipeTransform {
  transform(value: TeacherModel[], filterText: string): TeacherModel[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (t) => t.teacherName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
