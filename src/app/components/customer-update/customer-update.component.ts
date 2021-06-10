import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'app/models/customer';
import { User } from 'app/models/user';
import { CustomerService } from 'app/services/customer.service';
import { LocalStrogeService } from 'app/services/local-stroge.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {

  customer:Customer
  user:User
  userUpdateForm : FormGroup
  constructor(private customerService:CustomerService, private localStorageService:LocalStrogeService, private formBuilder:FormBuilder, 
              private userService:UserService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    // this.getCustomerByEmail();
    this.getUserByEmail();
    this.createUserUpdateForm();
  } 

  getUserByEmail(){
    let user = this.localStorageService.getLocalStorage("user");
    this.userService.getUserByMail(user.email).subscribe(response => {
       this.user = response.data
    })
  }

  //   })
  // }
  // getCustomerByEmail(){
  //   let customer = this.localStorageService.getLocalStorage("customer");
  //   this.customerService.getCustomerByEmail(customer.email).subscribe(response => {
  //     this.customer = response.data
  //   })
  // }
  
  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      Id : this.localStorageService.getLocalStorage("user").id,
      firstName : ["", Validators.required],
      lastName : ["", Validators.required],
      email : ["", Validators.required],
      passwordHash : this.localStorageService.getLocalStorage("user").passwordHash,
      passwordSalt : this.localStorageService.getLocalStorage("user").passwordSalt,
      status : this.localStorageService.getLocalStorage("user").status
    })   
  }

  updateUser(){
    if (this.userUpdateForm.valid) {
      let userUpdateModel = Object.assign({},this.userUpdateForm.value)
      console.log(userUpdateModel)

      this.userService.updateUser(userUpdateModel).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı !")
        this.localStorageService.removeLocalStorage("user")
        this.localStorageService.setLocalStorage(userUpdateModel,"user")
      }, responseError => {
        this.toastrService.error(responseError.error, "Dikkat !")
      })
    }
    else {
      this.toastrService.error("Formunuz Eksik","Dikkat !")
    }
  }

}
