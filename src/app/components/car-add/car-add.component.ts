import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'app/models/brand';
import { Color } from 'app/models/color';
import { BrandService } from 'app/services/brand.service';
import { CarService } from 'app/services/car.service';
import { ColorService } from 'app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm : FormGroup;
  brands:Brand[];
  colors:Color[];

  constructor(private formbuilder:FormBuilder, private carService:CarService, private toastrService:ToastrService, private brandService:BrandService, private colorService:ColorService) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }
  createCarAddForm(){
    this.carAddForm = this.formbuilder.group({
      carName : ["", Validators.required],
      brandId : ["", Validators.required],
      colorId : ["", Validators.required],
      dailyPrice : ["", Validators.required],
      modelYear : ["", Validators.required],
      description : ["", Validators.required]
    })
  }

  carAdd(){
    if(this.carAddForm.valid){
    let carModel = Object.assign({}, this.carAddForm.value);
    this.carService.carAdd(carModel).subscribe(response => {
      this.toastrService.success(response.message, "Başarılı !");
    }, responseError => {
      if(responseError.error.Errors.length > 0){
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası !")
          
        }
      }
    })
  }
  else {
    this.toastrService.error("Formunuz Eksik", "Dikkat !")
  }
  }
}
