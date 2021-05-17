import { Pipe, PipeTransform } from '@angular/core';
import { StudentModel } from '../models/studentModel';

@Pipe({
  name: 'filterForStudent',
})
export class FilterForStudentPipe implements PipeTransform {
  transform(value: StudentModel[], filterText: string): StudentModel[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (s) => s.studentName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
