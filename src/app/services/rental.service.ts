import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44348/api/"

  constructor(private httpClient : HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getrentaldetails"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }

  getRentalByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getrentalbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalByCustomerId(customerId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "rentals/getrentalbycustomerid?customerId=" + customerId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  addRental(rental:Rental) {
    let newPath = this.apiUrl + "rentals/add";
    return this.httpClient.post(newPath, rental).subscribe();
  }
}
