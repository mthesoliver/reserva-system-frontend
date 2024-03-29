import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'any'
})
export class ResourceService {

  resourceUrl = environment.resource_url;

  constructor(private httpClient: HttpClient) { }

  public user() :Observable<any>{
    return this.httpClient.get<any>(this.resourceUrl + 'user');
  }

  public admin() :Observable<any>{
    return this.httpClient.get<any>(this.resourceUrl + 'admin');
  }
}
