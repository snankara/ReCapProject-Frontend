import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent},
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'signin',           component: SigninComponent },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash:true,
      anchorScrolling: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
