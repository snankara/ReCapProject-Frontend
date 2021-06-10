import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemResponseModel } from 'app/models/itemResponseModel';
import { ResponseModel } from 'app/models/responseModel';
import { UserImage } from 'app/models/user-image';

@Injectable({
  providedIn: 'root'
})
export class UserImageService {

  private apiUrl = "https://localhost:44348/api/"

  constructor(private httpClient:HttpClient) { }

  upload(fileToUpload: File, userId:number){
    let newPath = this.apiUrl + "userimages/add";
    const formData: FormData = new FormData();
    formData.append('image',fileToUpload,fileToUpload.name);
    formData.append('userId',userId.toString());
    return this.httpClient.post<ResponseModel>(newPath, formData); 
  }

  update(fileToUpload:File, userId:number){
    let newPath = this.apiUrl + "userimages/update";
    const formData:FormData = new FormData();
    formData.append('image',fileToUpload, fileToUpload.name);
    formData.append('userId', userId.toString());
    return this.httpClient.post<ResponseModel>(newPath, formData);
  }

  getUserImage(userId:number){
    let newPath = this.apiUrl + "userimages/getbyid?userId="+userId;
    return this.httpClient.get<ItemResponseModel<UserImage>>(newPath);
  }

}
