import { Injectable } from '@angular/core';
import { webApi } from '../../../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GetAllUsersService {
  baseUrl: any = webApi.baseUrl;
  private headers = new HttpHeaders();
  getallUsersUrl = this.baseUrl + webApi.apiUrl.getallUsers;

  uploadReportsFileUrl = this.baseUrl + webApi.apiUrl.uploadReportsFile;

  constructor(public http: HttpClient) {  }

  public getUsers(): Promise<any> {
    return this.http.post(this.getallUsersUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        return response = response;
      })
      .catch(this.handleError);
  }

  public uploadReportsFile(msrData: any): Promise<any> {

    return this.http.post(this.uploadReportsFileUrl, msrData, { headers: this.headers })
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
