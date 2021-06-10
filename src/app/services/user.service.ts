import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44348/api/users/"

  constructor(private httpClient:HttpClient) { }

  getUserByMail(email:string){
    return this.httpClient.get<ItemResponseModel<User>>(this.apiUrl + "getbymail?email=" + email)
  }

  updateUser(user:User):Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(this.apiUrl + "update",user)
  }
}
