import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { LocalStrogeService } from './local-stroge.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44348/api/";

  constructor(private httpClient : HttpClient, private localStorageService:LocalStrogeService) { }

  getCustomers(): Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl + "customers/getcustomerdetails"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  updateCustomer(customer:Customer): Observable<ResponseModel>{
    let newPath = this.apiUrl + "customers/update"
    return this.httpClient.put<ResponseModel>(newPath,customer);
  }

  getCustomerById(customerId:number):Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl + "customers/getcustomerdetailsbyid?id=" + customerId;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerByEmail(email:string):Observable<ItemResponseModel<Customer>>{
    let newPath = this.apiUrl + "customers/getcustomerbyemail?email=" + email;
    return this.httpClient.get<ItemResponseModel<Customer>>(newPath);
  }
  getCustomerByUserId(userId:number):Observable<ListResponseModel<Customer>>{ 
    let newPath = this.apiUrl + "customers/getcustomerbyuserid?userId=" + userId;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

}
