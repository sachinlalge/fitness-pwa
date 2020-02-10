import { Injectable } from '@angular/core';
import { webApi } from '../../../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GetUserDetailsService {
  baseUrl: any = webApi.baseUrl;
  private headers = new HttpHeaders();
  getUsersDetailsUrl = this.baseUrl + webApi.apiUrl.getUserDetail;

  constructor(public http: HttpClient) {  }

  public getUserDetails(data: any): Promise<any> {
    return this.http.post(this.getUsersDetailsUrl, data, { headers: this.headers })
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
