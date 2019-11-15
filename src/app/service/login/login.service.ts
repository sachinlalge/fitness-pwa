import { Injectable } from '@angular/core';
import { webApi } from '../../../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: any = webApi.baseUrl;
  private headers = new HttpHeaders();
  loginUrl = this.baseUrl + webApi.apiUrl.loginAdmin;

  constructor(public http: HttpClient) { }
  
  public loginUser(loginData: any): Promise<any> {
    return this.http.post(this.loginUrl, loginData, { headers: this.headers })
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
