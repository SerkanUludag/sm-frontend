import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../models/userModel';

@Pipe({
  name: 'filterForUser',
})
export class FilterForUserPipe implements PipeTransform {
  transform(value: UserModel[], filterText: string): UserModel[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (u) => u.username.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
