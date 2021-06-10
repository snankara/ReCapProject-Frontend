import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CustomerService } from 'app/services/customer.service';
import { LocalStrogeService } from 'app/services/local-stroge.service';
import { Router } from '@angular/router';
import { Customer } from 'app/models/customer';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    private toggleButton: any;
    private sidebarVisible: boolean;
    private state: boolean;
    private customer:Customer;

    constructor(public location: Location, private element : ElementRef, private customerService:CustomerService,
                private localStorageService:LocalStrogeService, private router:Router) {
        this.sidebarVisible = false; 
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.isAuthenticated();
        this.getCustomerLocalStorage();
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

    isHome() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/home' ) {
            return true;
        }
        else {
            return false;
        }
    }

    isDocumentation() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/documentation' ) { 
            return true;
        }
        else {
            return false;
        }
    }

    isAuthenticated(){
        this.localStorageService.getLocalStorage("token") ? this.state=true : this.state= false;
    }

    logOut(){
        console.log("Logout !");
        this.localStorageService.clear() 
        setTimeout(() => {this.router.navigate([""])}, 200)
        setTimeout(() => {window.location.reload()}, 300)

    }

    getCustomerLocalStorage(){
       this.customer = this.localStorageService.getLocalStorage("customer");
    }
}
