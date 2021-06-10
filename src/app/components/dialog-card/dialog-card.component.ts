import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-card',
  templateUrl: './dialog-card.component.html',
  styleUrls: ['./dialog-card.component.css']
})
export class DialogCardComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogCardComponent>) { }

  ngOnInit(): void {
  }

  save(){
    this.dialogRef.close(true)
  }

  close(){
    this.dialogRef.close(false)
  }

}
