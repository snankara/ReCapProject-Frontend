import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CarDetail } from 'app/models/carDetail';
import { Customer } from 'app/models/customer';
import { Rental } from 'app/models/rental';
import { UserImage } from 'app/models/user-image';
import { CarService } from 'app/services/car.service';
import { CustomerService } from 'app/services/customer.service';
import { LocalStrogeService } from 'app/services/local-stroge.service';
import { RentalService } from 'app/services/rental.service';
import { UserImageService } from 'app/services/user-image.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    private apiUrl ="https://localhost:44348"
    private customer:Customer;
    private rentals:Rental[];
    private userImage:UserImage;
    private fileToUpload : File = null;
    private imageSrc:String;


    constructor(private localStorageService:LocalStrogeService, 
                private customerService:CustomerService,
                private rentalService:RentalService,
                private userImageService:UserImageService) { } 

    ngOnInit() {
        this.getCustomerLocalStorage();
        this.getRentalByCustomerId(this.customer.customerId);
        this.getUserImage();
    }

    getUserImage(){
        var currentUser = this.localStorageService.getLocalStorage("user")
        this.userImageService.getUserImage(currentUser.id).subscribe(response => {
            if (response.data) {
            this.userImage = response.data;
            this.imageSrc = this.apiUrl+this.userImage.imagePath;
            return;
            }
            this.imageSrc = "../../assets/img/user-profile-default.png"
        })
    }

    handleFileInput(file : FileList){
        this.fileToUpload = file.item(0);
        var reader = new FileReader();

        reader.onload = (event:any) => {
            this.imageSrc = event.target.result;
        }

        reader.readAsDataURL(this.fileToUpload);
    }

    upload(Image){
        if (this.fileToUpload) {
            var currentUser = this.localStorageService.getLocalStorage("user")
            this.userImageService.upload(this.fileToUpload,currentUser.id).subscribe(response => {
                console.log(response.message);
                Image.value = null;
                setTimeout(() => {window.location.reload()}, 300)
                return;
            })
        } 
        else{
            console.log("Resim Seçilmedi")
        }

    }

    update(Image){
        if (this.fileToUpload) {
            var currentUser = this.localStorageService.getLocalStorage("user");
            this.userImageService.update(this.fileToUpload, currentUser.id).subscribe(response => {
                console.log(response.message);
                Image.value = null;
                setTimeout(() => {window.location.reload()}, 300)
                return;
            })
        }
        else{
            console.log("Resim Seçilmedi")
        }

    }

    getCustomerLocalStorage(){
        this.customer = this.localStorageService.getLocalStorage("customer");
    }


    getRentalByCustomerId(customerId:number){
        this.rentalService.getRentalByCustomerId(customerId).subscribe(response => {
            this.rentals = response.data;
        })
    }

}
