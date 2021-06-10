import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'app/models/color';
import { ColorService } from 'app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm : FormGroup
  color : Color;

  constructor(private formBuilder:FormBuilder, private colorService:ColorService, private toastrService:ToastrService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["colorId"]){
        this.getColorById(params["colorId"]);
        this.createColorUpdateForm(parseInt(params["colorId"]));
      }
    })
  }

  getColorById(colorId:number){
    this.colorService.getColorById(colorId).subscribe(response => {
      this.color = response.data;
    })
  }

  createColorUpdateForm(colorId:number){
    this.colorUpdateForm = this.formBuilder.group({
      colorId : colorId,
      colorName : ["", Validators.required]
    })
  }

  updateColor(){
    console.log(this.colorUpdateForm)
    if(this.colorUpdateForm.valid){
      let colorUpdateModel = Object.assign({},this.colorUpdateForm.value)
      this.colorService.updateColor(colorUpdateModel).subscribe(response => {
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
