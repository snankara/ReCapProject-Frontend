import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "https://localhost:44348/api/";

  constructor(private httpClient: HttpClient) { } 
  pay(rental:Rental, amount:number):Observable<ResponseModel>{
    let path = this.apiUrl + "rentals/paymentadd";
    return this.httpClient.post<ResponseModel>(path,{payment:{amount:amount},rental:rental}); 
  }
}
