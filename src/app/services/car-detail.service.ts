import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl = "https://localhost:44348";
  constructor(private httpClient:HttpClient) { } 

  getCarDetails(carId:number):Observable<ItemResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "/api/cars/getcardetailsandimages?carId=" +carId
    return this.httpClient.get<ItemResponseModel<CarDetail>>(newPath) 
  }

}
