

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../environments/environment"
import { Observable } from 'rxjs';

export class PortalAPI {
  public static BASE_URL = environment.API_BASE_URL;
}


@Injectable({
  providedIn: 'root'
})
export class HrjobService {
  getAllDistrictList(arg0: {}) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  saveHrDetails(data: any): Observable<any> {
    return this.http.post(PortalAPI.BASE_URL + "/api/applicant", data);
  }
  getAllStateName(data: any): Observable<any> {
    return this.http.get(PortalAPI.BASE_URL + "/api/getallstatename");
  }
  getDistrictsByStateId(data: any): Observable<any> {
    return this.http.post(PortalAPI.BASE_URL + "/api/getalldistrictname", data);
  }
  fileUploads(data: any): Observable<any> {
    return this.http.post(PortalAPI.BASE_URL + "/api/uploadfile", data);
  }
  getPositionList(data: any): Observable<any> {
    return this.http.get(PortalAPI.BASE_URL + "/api/postionpost");
  }

  /*-------------- get list of ngo-record for ngo dashboard  ------------- */

  getListOfRecords():Observable<any>{
    return this.http.get<any>("https://ndma_hr.kreatetechnologies.com/ndmahr-api/api/ngo");
  }
}

