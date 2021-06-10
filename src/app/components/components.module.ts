import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms'; 
import { ReactiveFormsModule} from '@angular/forms';

import { ComponentsComponent } from './components.component';
import { NgbdModalComponent } from './modal/modal.component';
import { NgbdModalContent } from './modal/modal.component';

import { BrandComponent } from './brand/brand.component';
import { ColorComponent } from './color/color.component';
import { CustomerComponent } from './customer/customer.component';
import { CarComponent } from './car/car.component';
import { RentalComponent } from './rental/rental.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarFilterComponent } from './car-filter/car-filter.component';
import { PaymentComponent } from './payment/payment.component';
import { CarAddComponent } from './car-add/car-add.component';
import { BrandAddComponent } from './brand-add/brand-add.component';
import { ColorAddComponent } from './color-add/color-add.component';
import { CarUpdateComponent } from './car-update/car-update.component';
import { BrandUpdateComponent } from './brand-update/brand-update.component';
import { ColorUpdateComponent } from './color-update/color-update.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';
import {SignupComponent} from "./signup/signup.component";
import { SigninComponent } from './signin/signin.component';


@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module
    ],
    declarations: [
        ComponentsComponent,
        BrandComponent,
        ColorComponent,
        CustomerComponent,
        CarComponent,
        RentalComponent,
        CarDetailComponent,
        CarFilterComponent,
        PaymentComponent,
        CarAddComponent,
        BrandAddComponent,
        ColorAddComponent,
        CarUpdateComponent,
        BrandUpdateComponent,
        ColorUpdateComponent,
        LoginComponent,
        RegisterComponent,
        CustomerUpdateComponent,
        NgbdModalComponent,
        SignupComponent,
        NgbdModalContent,
        SigninComponent,
        ProfileComponent
    ],
    entryComponents: [NgbdModalContent],
    exports:[ ComponentsComponent ]
})
export class ComponentsModule { }
