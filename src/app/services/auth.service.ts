import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/responseModel';
import { SingleDataResponseModel } from '../models/singleDataResponseModel';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = 'https://localhost:44304/api/auth/login';

  constructor(private httpClient: HttpClient) {}

  login(user: LoginModel): Observable<SingleDataResponseModel<UserModel>> {
    return this.httpClient.post<SingleDataResponseModel<UserModel>>(
      this.API_URL,
      user
    );
  }

  getUserType(): string {
    if (localStorage.getItem('userType')) {
      return localStorage.getItem('userType');
    }
    return '0';
  }

  isLoggedIn() {
    if (localStorage.getItem('userType')) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin() {
    if (localStorage.getItem('userType') == '1') {
      return true;
    } else {
      return false;
    }
  }
}
