import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Brand } from 'app/models/brand';
import { BrandService } from 'app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[]=[];
  selectedIndex:number;
  @Output() brandId: EventEmitter<number> = new EventEmitter();
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
     this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data; 
    });
  } 

  sendBrandId(brandId?:number){
    this.brandId.emit(brandId)
  }

  selectedItemIndex(index?:number){  
    this.selectedIndex = index;
  }
}
