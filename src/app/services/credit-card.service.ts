import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl="https://localhost:44348/api/"

  constructor(private httpClient:HttpClient) { }

  verifyCard(creditCard:CreditCard):Observable<boolean>{
    let newPath = this.apiUrl + "creditcards/verifycard";
    return this.httpClient.post<boolean>(newPath,creditCard);
  }

  getByCardNumber(cardNumber:string):Observable<ItemResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "creditcards/getbycardnumber?cardNumber=" + cardNumber;
    return this.httpClient.get<ItemResponseModel<CreditCard>>(newPath);
  }
 
  updateCard(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl + "creditcards/update";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }

  getCardById(cardId:number):Observable<ItemResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "creditcards/getbyid?id="+cardId;
    return this.httpClient.get<ItemResponseModel<CreditCard>>(newPath);
  }
}
