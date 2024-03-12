import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'any'
})
export class UsersService {
  baseDados: any;

  constructor(private http: HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get<any[]>(environment.base_url+'users');
  }

}
