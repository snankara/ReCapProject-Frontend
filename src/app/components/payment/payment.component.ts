import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'app/models/carDetail';
import { CreditCard } from 'app/models/creditCard';
import { Customer } from 'app/models/customer';
import { Rental } from 'app/models/rental';
import { CarService } from 'app/services/car.service';
import { CreditCardService } from 'app/services/credit-card.service';
import { CustomerService } from 'app/services/customer.service';
import { RentalService } from 'app/services/rental.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DialogCardComponent } from '../dialog-card/dialog-card.component';
import { LocalStrogeService } from 'app/services/local-stroge.service';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  cardNumber:string;
  nameOnTheCard:string;
  cardExpirationDate:string;
  cardCvv:string; 
  moneyInTheCard:number;

  customer:Customer;
  creditCard:CreditCard; 
  rental:Rental;
  carDetail:CarDetail[];
  paymentAmount: number = 0;
  cardExist:boolean;
  getCustomerId:number;

  creditCardForm:FormGroup
  
  constructor(private activatedRoute:ActivatedRoute, private rentalService:RentalService, private customerService:CustomerService,
              private creditCardService:CreditCardService, private router:Router, private toastrService:ToastrService, private carService:CarService,
              private dialog:MatDialog, private localStorageService:LocalStrogeService, private formBuilder:FormBuilder
    ) { }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe(params => {
      if(params['rental']){
        this.rental = JSON.parse(params['rental']);
        this.getCustomerByUserId();
        this.getCarDetails();
        this.createCreditCardForm();
        this.getLocalCreditCard();
      }
    }) 
  }

  createCreditCardForm(){
    this.creditCardForm = this.formBuilder.group({
      nameOnTheCard : ["",Validators.required],
      cardNumber : ["",Validators.required],
      cardExpirationDate : ["",Validators.required],
      cardCvv : ["",Validators.required]
    })
  }
  getCarDetails(){
    this.carService.getCarAndImageDetailsByCarId(this.rental.carId).subscribe(response => {
      this.carDetail = response.data;
      this.calculatePayment();
    })
  }

  getCustomerByUserId(){
    let customer = this.localStorageService.getLocalStorage("customer")
    this.customerService.getCustomerByUserId(customer.userId).subscribe(response => {
      this.customer = response.data[0]
    })
  }

  getLocalCreditCard(){
    if (this.creditCard = this.localStorageService.getLocalStorage("creditCard")) {
      this.creditCard = this.localStorageService.getLocalStorage("creditCard")
    }
  }

  calculatePayment(){
    var returnDate = new Date(this.rental.returnDate.toString());
    var rentDate = new Date(this.rental.rentDate.toString());
    var difference = returnDate.getTime() - rentDate.getTime();
    
    var rentDays = Math.ceil(difference/(1000 * 3600 * 24));

    this.paymentAmount = rentDays * this.carDetail[0].dailyPrice;

    if(this.paymentAmount <= 0){
      this.toastrService.error("Hatalı İşlem !")
    }
  }

  async bankcreditCardCheck(creditCard:CreditCard){
    this.cardExist = await this.isCardExist(creditCard)
    if(this.cardExist){ 
      this.creditCard = await this.getByCardNumber(this.cardNumber);
      return this.creditCard;
    }
    this.toastrService.error("Kart Bilgilerinizi Kontrol Ediniz !","Dikkat !")
    return null
  }

  paymentCheck(moneyInTheCard:number, paymentAmount:number){
    if(moneyInTheCard as number >= paymentAmount){
      this.creditCard.moneyInTheCard = moneyInTheCard as number - paymentAmount;
  }
    else {
    this.toastrService.error("Yetersiz Bakiye");
  }
}

 cardDialog(){
   let result = this.localStorageService.getLocalStorage("customer");
  if (result.cardId === null) {

  this.openDialog().afterClosed().subscribe(response =>{
      if (response) {
        let customer : Customer ={
          customerId : result.customerId,
          userId : result.userId,
          cardId :this.creditCard.cardId,
          companyName : result.companyName,
          findeksScore : result.findeksScore
        }
        this.customerService.updateCustomer(customer).subscribe(response => {
          this.toastrService.info("Kartınız Kaydedildi.","Bilgi")
        })
      }
    })
  }
}

  async rentIt(){
  let verifyCreditCard:CreditCard = {
    cardNumber : this.cardNumber,
    nameOnTheCard : this.nameOnTheCard,
    cardExpirationDate : this.cardExpirationDate,
    cardCvv : this.cardCvv
  }
    
   let result = await this.bankcreditCardCheck(verifyCreditCard);
   if (result != null) {
    this.paymentCheck(result.moneyInTheCard,this.paymentAmount)
    if(this.updateCard(this.creditCard)){
      this.rentalService.addRental(this.rental); 
      this.toastrService.success("İşlem Başarılı!");
      this.cardDialog();
      this.router.navigate(['/brands/'])
      this.toastrService.info("Anasayfaya Yönlendiriliyorunuz...")  
    }
    else {
      this.toastrService.error("Sistem Hatası !");
    }
   }
}

  async isCardExist(creditCard:CreditCard){
    return (await this.creditCardService.verifyCard(creditCard).toPromise());
  }

  async getByCardNumber(cardNumber:string){
    return (await this.creditCardService.getByCardNumber(cardNumber).toPromise()).data;
  }

  async updateCard(creditCard:CreditCard){
    return (await this.creditCardService.updateCard(creditCard).toPromise()).success;
  }

  openDialog(){
    let dialogRef = this.dialog.open(DialogCardComponent, {
      width:'350px',
      position:{top:'0%', right:'20%'}
    })
    return dialogRef
  }
}
