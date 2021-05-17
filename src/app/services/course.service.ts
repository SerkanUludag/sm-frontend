import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { CourseModel } from '../models/courseModel';
import { ListDataResponseModel } from '../models/listDataResponseModel';
import { SingleDataResponseModel } from '../models/singleDataResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  API_URL = 'https://localhost:44304/api';

  constructor(private httpClient: HttpClient) {}

  getById(id: number): Observable<SingleDataResponseModel<CourseModel>> {
    return this.httpClient.get<SingleDataResponseModel<CourseModel>>(
      `${this.API_URL}/courses/getbyid?id=${id}`
    );
  }

  addCourse(course: CourseModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.API_URL}/courses/add`,
      course
    );
  }

  getAll(): Observable<ListDataResponseModel<CourseModel>> {
    return this.httpClient.get<ListDataResponseModel<CourseModel>>(
      `${this.API_URL}/courses/getall`
    );
  }

  deleteCourse(course: CourseModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.API_URL}/courses/delete`,
      course
    );
  }

  getCoursesByTeacher(
    id: number
  ): Observable<ListDataResponseModel<CourseModel>> {
    return this.httpClient.get<ListDataResponseModel<CourseModel>>(
      `${this.API_URL}/courses/getbyteacher?id=${id}`
    );
  }

  getCoursesByStudent(
    id: number
  ): Observable<ListDataResponseModel<CourseModel>> {
    return this.httpClient.get<ListDataResponseModel<CourseModel>>(
      `${this.API_URL}/courses/getbystudent?id=${id}`
    );
  }
}
