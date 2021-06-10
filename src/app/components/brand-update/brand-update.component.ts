import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'app/models/brand';
import { BrandService } from 'app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm : FormGroup
  brand : Brand;

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private brandService:BrandService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["brandId"]){
        this.getBrandById(params["brandId"])
        this.createBrandUpdateForm(parseInt(params["brandId"])) 
      }
    })
  }

  getBrandById(brandId:number){
    this.brandService.getBrandById(brandId).subscribe(response => {
      this.brand = response.data;
    })
  }

  createBrandUpdateForm(brandId:number){
    this.brandUpdateForm = this.formBuilder.group({
      brandId : brandId,
      brandName : ["", Validators.required]
    })
  }

  updateBrand(){
    console.log(this.brandUpdateForm)
    if(this.brandUpdateForm.valid){
      let brandUpdateModel = Object.assign({},this.brandUpdateForm.value)
      this.brandService.updateBrand(brandUpdateModel).subscribe(response => {
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
