import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient
    ) { }

    private usersUrl = 'api/users';

    public getUsers(): Observable<Array<any>>{
      return this.httpClient.get<any[]>(this.usersUrl)
     }

 
     public i: number;
     public checkInfo: boolean;
    }
