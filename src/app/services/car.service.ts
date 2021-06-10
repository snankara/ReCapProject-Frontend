import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44348/api/";

  constructor(private httpClient : HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbyid?id="+ carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  } 
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbrandid?id=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByColorId(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbycolorid?id=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath); 
  } 
  getByBrandIdAndColorId(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbybrandidandcolorid?brandId=" + brandId + "&" + "colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath); 
  } 

  getCarAndImageDetails():Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcarandimagedetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  getCarAndImageDetailsByCarId(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcarandimagedetailsbycarid?carId=" + carId 
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath) 
  }

  getCarAndImageDetailsByBrandId(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcarandimagedetailsbybrandid?brandId=" + brandId 
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  getCarAndImageDetailsByColorId(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "cars/getcarandimagedetailsbycolorid?colorId=" + colorId 
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  carAdd(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/add";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }
  carUpdate(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + "cars/update";
    return this.httpClient.put<ResponseModel>(newPath,car);
  }

  carImagesUpload(fileToUpload: File, carId:number){
    let newPath = this.apiUrl + "carimages/add";
    const formData: FormData = new FormData();
    formData.append('image',fileToUpload,fileToUpload.name);
    formData.append('carId',carId.toString());
    return this.httpClient.post<ResponseModel>(newPath, formData); 
  }

}
