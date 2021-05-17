import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListDataResponseModel } from '../models/listDataResponseModel';
import { ResponseModel } from '../models/responseModel';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL = 'https://localhost:44304/api';

  constructor(private httpClient: HttpClient) {}

  addUser(user: UserModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.API_URL}/users/add`,
      user
    );
  }

  getAll(): Observable<ListDataResponseModel<UserModel>> {
    return this.httpClient.get<ListDataResponseModel<UserModel>>(
      `${this.API_URL}/users/getall`
    );
  }

  deleteUser(user: UserModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.API_URL}/users/delete`,
      user
    );
  }
}
