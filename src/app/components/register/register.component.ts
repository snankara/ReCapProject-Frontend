import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { CreditCardService } from 'app/services/credit-card.service';
import { CustomerService } from 'app/services/customer.service';
import { LocalStrogeService } from 'app/services/local-stroge.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup
  constructor(private authService:AuthService, private toastrService:ToastrService,
              private formBuilder:FormBuilder, private userService:UserService, private localStorageService:LocalStrogeService, 
              private customerService:CustomerService, private creditCardService:CreditCardService, private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();

  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName : ["", Validators.required],
      lastName : ["", Validators.required],
      email : ["", Validators.required], 
      password : ["", Validators.required]
    })
  }

  getCustomerCreditCard(cardId:number){
    if (cardId != null) {
      this.creditCardService.getCardById(cardId).subscribe(response => {
        this.localStorageService.setLocalStorage(response.data,"creditCard")
      })
    }
  }

  getUserByEmail(email:string){
    this.userService.getUserByMail(email).subscribe(response => {
      this.localStorageService.setLocalStorage(response.data,"user")
        this.getCustomerByUserId(response.data.id);
    })
  }

  getCustomerByUserId(userId:number){
    this.customerService.getCustomerByUserId(userId).subscribe(response => {
      this.localStorageService.setLocalStorage(response.data[0],"customer")
      this.getCustomerCreditCard(response.data[0].cardId);
    })
  }

  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({},this.registerForm.value)
      this.authService.register(registerModel).subscribe(response => {
        this.toastrService.success(response.message, "Kayıt Başarılı !")
        this.localStorageService.setLocalStorage(response.data.token, "token")
        this.getUserByEmail(registerModel.email);
        setTimeout(() => {this.router.navigate([""])}, 200)
        setTimeout(() => {window.location.reload()}, 500)
        
        
      },responseError => {
        this.toastrService.error(responseError.error, "Dikkat !")
      })

    }
  }
}
