import { Component, OnInit } from '@angular/core';
import { Brand } from 'app/models/brand';
import { Color } from 'app/models/color';
import { BrandService } from 'app/services/brand.service';
import { ColorService } from 'app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {
  brands:Brand [] = [];
  colors:Color [] = [];
  currentBrandId:Number;
  currentColorId:Number; 

  constructor(private brandService:BrandService, private colorService:ColorService) { }

  ngOnInit(): void {
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
      this.colors = response.data
    })
  }

  currentBrand(currentBrandId:Number){
    // this.currentBrandId == currentBrandId? true : false;
    this.currentBrandId == currentBrandId;
  }


  currentColor(currentColorId:Number){
    this.currentColorId == currentColorId? true : false;
  }

}
