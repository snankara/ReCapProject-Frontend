import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = 'https://localhost:44348/api/';

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + "brands/getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
    
  }
  getBrandById(brandId:number):Observable<ItemResponseModel<Brand>>{
    let newPath = this.apiUrl + "brands/getbyid?id=" + brandId;
    return this.httpClient.get<ItemResponseModel<Brand>>(newPath);
    
  }

  addBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/add";
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/update";
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }
}
