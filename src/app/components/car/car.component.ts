import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'app/models/car';
import { CarDetail } from 'app/models/carDetail';
import { BrandService } from 'app/services/brand.service';
import { CarService } from 'app/services/car.service';
import { ColorService } from 'app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  apiUrl ="https://localhost:44348"
  cars:Car[] = [];
  carDetail:CarDetail[] = [];
  carFilterText="";
  brandFilterText="";
  colorFilterText="";

  constructor(private carService: CarService, private router:Router ,private activatedRoute : ActivatedRoute, private brandService:BrandService, private colorService:ColorService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["brandId"] && params["colorId"]){
        this.getByBrandIdAndColorId(params["brandId"],params["colorId"]); 
      }
      else if(params["colorId"]){
        this.getCarsByColorId(params["colorId"]);
      }
      else {
        this.getCars();
      }      
    });  
  }

  receiveBrandId($event:number){
    $event ? this.getCarsByBrandId($event) : this.getCars();
  }

  receiveColorId($event:number){
    $event ? this.getCarsByColorId($event) : this.getCars();
  }

  getCars(){
    this.carService.getCarAndImageDetails().subscribe(response => {
      this.carDetail = response.data
    })
  } 

  getCarsByBrandId(brandId:number){
    this.carService.getCarAndImageDetailsByBrandId(brandId).subscribe(response => {
      this.carDetail = response.data;
    })
  }

  getCarsByColorId(colorId:number){
    this.carService.getCarAndImageDetailsByColorId(colorId).subscribe(response => {
      this.carDetail = response.data;
    })
  }

  getByBrandIdAndColorId(brandId:number,colorId:number){
    this.carService.getByBrandIdAndColorId(brandId,colorId).subscribe(response => {
      this.cars = response.data;
    })
  }

}
