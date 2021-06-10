import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStrogeService {

  constructor() { }

  setLocalStorage<T = object,TKeyValue = string>(entity:T, keyValue:TKeyValue){
    localStorage.setItem(keyValue.toString(),JSON.stringify(entity))
  }

  getLocalStorage<TKeyValue>(keyValue:TKeyValue) {
    var entity = JSON.parse(localStorage.getItem(keyValue.toString()));
    return entity;
  }

  removeLocalStorage<TKeyValue = string>(keyValue:TKeyValue) {
    localStorage.removeItem(keyValue.toString())
  }

  clear(){
    localStorage.clear();
  }
}
