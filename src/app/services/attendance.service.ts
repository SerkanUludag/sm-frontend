import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttendanceModel } from '../models/attendanceModel';
import { ListDataResponseModel } from '../models/listDataResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  API_URL = 'https://localhost:44304/api';

  constructor(private httpClient: HttpClient) {}

  getByCourseId(
    id: number
  ): Observable<ListDataResponseModel<AttendanceModel>> {
    return this.httpClient.get<ListDataResponseModel<AttendanceModel>>(
      `${this.API_URL}/attendances/getbycourse?id=${id}`
    );
  }

  enroll(attendance: AttendanceModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.API_URL}/attendances/add`,
      attendance
    );
  }
}
