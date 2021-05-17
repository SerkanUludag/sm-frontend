import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListDataResponseModel } from '../models/listDataResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleDataResponseModel } from '../models/singleDataResponseModel';
import { TeacherModel } from '../models/teacherModel';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  API_URL = 'https://localhost:44304/api';

  constructor(private httpClient: HttpClient) {}

  addTeacher(teacher: TeacherModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.API_URL}/teachers/add`,
      teacher
    );
  }

  getById(id: number): Observable<SingleDataResponseModel<TeacherModel>> {
    return this.httpClient.get<SingleDataResponseModel<TeacherModel>>(
      `${this.API_URL}/teachers/getbyid?id=${id}`
    );
  }

  getAll(): Observable<ListDataResponseModel<TeacherModel>> {
    return this.httpClient.get<ListDataResponseModel<TeacherModel>>(
      `${this.API_URL}/teachers/getall`
    );
  }

  getByUserId(
    userId: number
  ): Observable<SingleDataResponseModel<TeacherModel>> {
    return this.httpClient.get<SingleDataResponseModel<TeacherModel>>(
      `${this.API_URL}/teachers/getbyuserid?userId=${userId}`
    );
  }

  deleteTeacher(teacher: TeacherModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.API_URL}/teachers/delete`,
      teacher
    );
  }
}
