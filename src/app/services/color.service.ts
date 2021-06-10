import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44348/api/";
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl + "colors/getall";
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }
  
  addColor(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/add";
    return this.httpClient.post<ResponseModel>(newPath, color);
  }

  getColorById(colorId:number):Observable<ItemResponseModel<Color>>{
    let newPath = this.apiUrl + "colors/getbyid?id=" + colorId;
    return this.httpClient.get<ItemResponseModel<Color>>(newPath)
  }

  updateColor(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/update";
    return this.httpClient.post<ResponseModel>(newPath, color);
  }

}
