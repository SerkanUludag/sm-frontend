import { HttpClient } from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentModel } from '../models/contentModel';
import { CourseModel } from '../models/courseModel';
import { ListDataResponseModel } from '../models/listDataResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleDataResponseModel } from '../models/singleDataResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  API_URL = 'https://localhost:44304/api';

  constructor(private httpClient: HttpClient) {}

  getById(id: number): Observable<SingleDataResponseModel<ContentModel>> {
    return this.httpClient.get<SingleDataResponseModel<ContentModel>>(
      `${this.API_URL}/contexts/getbyid?id=${id}`
    );
  }

  addContent(content: ContentModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.API_URL}/contexts/add`,
      content
    );
  }

  getByCourseId(id: number): Observable<ListDataResponseModel<ContentModel>> {
    return this.httpClient.get<ListDataResponseModel<ContentModel>>(
      `${this.API_URL}/contexts/getbycourse?id=${id}`
    );
  }
}
