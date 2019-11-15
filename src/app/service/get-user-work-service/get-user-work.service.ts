import { Injectable } from '@angular/core';
import { webApi } from '../../../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GetUserWorkService {
  baseUrl: any = webApi.baseUrl;
  private headers = new HttpHeaders();
  getworkUserUrl = this.baseUrl + webApi.apiUrl.getworkoutsUsers;

  constructor(public http: HttpClient) {  }

  public getWorkUsers(data: any): Promise<any> {
    return this.http.post(this.getworkUserUrl, data, { headers: this.headers })
      .toPromise()
      .then(response => {
        return response = response;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }
}