import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditCard } from 'app/models/creditCard';
import { Customer } from 'app/models/customer';
import { User } from 'app/models/user';
import { AuthService } from 'app/services/auth.service';
import { CreditCardService } from 'app/services/credit-card.service';
import { CustomerService } from 'app/services/customer.service';
import { LocalStrogeService } from 'app/services/local-stroge.service';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
}) 
export class SigninComponent implements OnInit {

  private loginForm : FormGroup
  private customer:Customer
  private user:User
  private creditCard:CreditCard

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, 
    private authService:AuthService, private router:Router, private customerService:CustomerService, 
    private localStorageService:LocalStrogeService, private userService:UserService, private creditCardService:CreditCardService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email : ["", Validators.required], 
      password : ["", Validators.required]
    })
  }

  getCustomerByUserId(userId:number){
    this.customerService.getCustomerByUserId(userId).subscribe(response => {
      this.customer = response.data[0]
      this.localStorageService.setLocalStorage(this.customer,"customer")
      let result = this.localStorageService.getLocalStorage("customer")
      this.getCustomerCreditCard(result.cardId);

    })
  }

  getUserByEmail(email:string){
    this.userService.getUserByMail(email).subscribe(response => {
      this.user = response.data
      this.localStorageService.setLocalStorage(this.user,"user")
      let result = this.localStorageService.getLocalStorage("user")
      this.getCustomerByUserId(result.id);
    })
  }

  getCustomerCreditCard(cardId:number){
    if (cardId != null) {
      this.creditCardService.getCardById(cardId).subscribe(response => {
        this.localStorageService.setLocalStorage(response.data,"creditCard")
      })
    }
  }
  
  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response => {
        this.toastrService.info(response.message, "Başarılı !");
        this.getUserByEmail(loginModel.email)
        // console.log(response.data.token)
        this.localStorageService.setLocalStorage(response.data.token,"token")        

        setTimeout(() => {this.router.navigate([""])}, 200)
        setTimeout(() => {window.location.reload()}, 500)

      },responseError => {
        this.toastrService.error(responseError.error, "Dikkat !") 
      })

    }
  }
}
