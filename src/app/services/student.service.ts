import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListDataResponseModel } from '../models/listDataResponseModel';
import { PayModel } from '../models/payModel';
import { ResponseModel } from '../models/responseModel';
import { SingleDataResponseModel } from '../models/singleDataResponseModel';
import { StudentModel } from '../models/studentModel';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  API_URL = 'https://localhost:44304/api';

  constructor(private httpClient: HttpClient) {}

  addStudent(student: StudentModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.API_URL}/students/add`,
      student
    );
  }

  getById(id: number): Observable<SingleDataResponseModel<StudentModel>> {
    return this.httpClient.get<SingleDataResponseModel<StudentModel>>(
      `${this.API_URL}/students/getbyid?id=${id}`
    );
  }

  getByUserId(
    userId: number
  ): Observable<SingleDataResponseModel<StudentModel>> {
    return this.httpClient.get<SingleDataResponseModel<StudentModel>>(
      `${this.API_URL}/students/getbyuserid?userId=${userId}`
    );
  }

  getAll(): Observable<ListDataResponseModel<StudentModel>> {
    return this.httpClient.get<ListDataResponseModel<StudentModel>>(
      `${this.API_URL}/students/getall`
    );
  }

  deleteStudent(student: StudentModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.API_URL}/students/delete`,
      student
    );
  }

  payFee(paymentInfo: PayModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.API_URL}/students/payfee`,
      paymentInfo
    );
  }
}
