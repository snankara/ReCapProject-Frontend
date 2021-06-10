import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'app/models/car';
import { CarDetail } from 'app/models/carDetail';
import { Customer } from 'app/models/customer';
import { Rental } from 'app/models/rental';
import { User } from 'app/models/user';
import { CarService } from 'app/services/car.service';
import { CustomerService } from 'app/services/customer.service';
import { LocalStrogeService } from 'app/services/local-stroge.service';
import { RentalService } from 'app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers:[DatePipe]
})
export class RentalComponent implements OnInit {

  rentals:Rental[] = [];
  cars:Car[] = [];
  customer:Customer;
  carDetail:CarDetail[] = [];
  user:User

  carId:number;
  userId:number;
  rentDate:Date;
  returnDate:Date;

  minDate:string | any;
  maxDate:string | null
  maxMinDate:string | null;
  findeksScoreState:boolean;
  firstDateSelected:boolean =false;

  constructor(private rentalService:RentalService, private customerService:CustomerService,
              private toastrService:ToastrService, private router:Router, private activatedRoute: ActivatedRoute,
              private carService:CarService,private datePipe:DatePipe, private localStorageService:LocalStrogeService
    ) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.carId = params["carId"]
        this.getCar(params["carId"])
      }
    })
    this.getCustomerByUserId();
  }



  getCustomerByUserId(){
    let customer = this.localStorageService.getLocalStorage("customer");
    this.customerService.getCustomerByUserId(customer.userId).subscribe(response => {
      this.customer = response.data[0]
    })
  }

  getCar(carId:number){
    this.carService.getCarAndImageDetailsByCarId(carId).subscribe(response => {
      this.carDetail = response.data;
    })
  }
  getRentals(){
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data;
    })
  }

  checkRentableCar(){
    this.rentalService.getRentalByCarId(this.carId).subscribe(response => {
      if(response.data == null){
        this.createRental();
        return true;
      }

      let lastItem = response.data[response.data.length-1]
      let returnDate = new Date(lastItem?.returnDate);
      let rentDate = new Date(lastItem?.rentDate);

      if(rentDate > returnDate){
        return this.toastrService.error("Lütfen Girdiğiniz Bilgileri Kontrol Ediniz.")
      }

      this.createRental();
      return true;
    })
  }

  createRental(){
    let createdRental: Rental = {
      carId: this.carDetail[0].carId,
      customerId : this.customer.customerId,
      carName: this.carDetail[0].carName,
      dailyPrice : this.carDetail[0].dailyPrice,
      rentDate : this.rentDate,
      returnDate : this.returnDate
    };
    if(createdRental.customerId == undefined || createdRental.rentDate == undefined){
      this.toastrService.error("Hata")
    }

    else {
      this.router.navigate(['/payment/', JSON.stringify(createdRental)])
      this.toastrService.info("Ödeme Sayfasına Yönlendiriliyorsunuz...")
    }
  }

  getRentMinDate(){
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate
  }

  getReturnMinDate(){
    if(this.rentDate != undefined) {
      let stringToDate = new Date(this.rentDate)
      let newDate = new Date();
      newDate.setDate(stringToDate.getDate() + 1);
      
      return newDate.toISOString().slice(0,10)

    }else {
      return this.rentDate;
    } 
  }

  checkFindeksScore(){
    this.carService.getCarAndImageDetailsByCarId(this.carId).subscribe(response => {
      let customer = this.localStorageService.getLocalStorage("customer");
      let carDetail = response.data

      if (customer.findeksScore < carDetail[0].minFindeksScore) {
         return this.toastrService.error("Findeks Puanınız Yetersiz Gibi Görünüyor.","Dikkat !")
      }
      return this.checkRentableCar(); 
    })
  }

  getReturnMaxDate() {
    this.maxDate = this.datePipe.transform(new Date(new Date().setFullYear(new Date().getFullYear() + 1)),'yyyy-MM-dd');
    return this.maxDate;
  }

  onChangeEvent(event:any){
    this.minDate = event.target.value;
    this.firstDateSelected = true
  }
}
