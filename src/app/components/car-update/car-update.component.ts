import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'app/models/brand';
import { CarDetail } from 'app/models/carDetail';
import { Color } from 'app/models/color';
import { BrandService } from 'app/services/brand.service';
import { CarService } from 'app/services/car.service';
import { ColorService } from 'app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm : FormGroup
  carDetail:CarDetail[] = [];
  brands:Brand[];
  colors:Color[];

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private carService:CarService, private activatedRoute : ActivatedRoute,
              private brandService:BrandService, private colorService: ColorService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"] && params["carName"]){  
        this.getCarAndImageDetailsByCarId(params["carId"]);
        this.createCarUpdateForm(params["carName"]);

      }
    })
    
    this.getBrands();
    this.getColors();
  }

  createCarUpdateForm(carName:string){
    this.carUpdateForm = this.formBuilder.group({
      carId : ["", Validators.required],
      carName : carName,
      brandId : ["", Validators.required],
      colorId : ["", Validators.required],
      modelYear : ["", Validators.required],
      dailyPrice : ["", Validators.required],
      description : ["", Validators.required]

    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }
  getCarAndImageDetailsByCarId(carId:number){
    this.carService.getCarAndImageDetailsByCarId(carId).subscribe(response => {
      this.carDetail = response.data;
    })
  }

  updateCar(){
    console.log(this.carUpdateForm)
    if(this.carUpdateForm.valid){
      let carUpdateModel = Object.assign({},this.carUpdateForm.value)
      this.carService.carUpdate(carUpdateModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı !")
      },responseError => {
        if(responseError.error.Errors.length > 0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası !")
            
          }
        }
      })
    }
    else {
      this.toastrService.error("Formunuz Eksik","Dikkat !")
    }
  }

}
