import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Color } from 'app/models/color';
import { ColorService } from 'app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[] = [];
  selectedIndex:number;
  @Output() colorId: EventEmitter<number> = new EventEmitter();
  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }
 
  sendColorId(colorId?:number){
    this.colorId.emit(colorId)
  }

  getColors(){
    this.colorService.getColors().subscribe(response =>{
     this.colors = response.data;   
    })
  }

  selectedItem(index?:number){
    this.selectedIndex = index;
  }
}
