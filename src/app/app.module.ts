import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';



import { CarFilterPipe } from './pipes/car-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { ComponentsModule } from './components/components.module';

import {ToastrModule} from "ngx-toastr";
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarFilterPipe,
    BrandFilterPipe,
    ColorFilterPipe,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    RouterModule,
    ComponentsModule,

    AppRoutingModule,
    ToastrModule.forRoot({positionClass:"toast-top-right"})

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { } 
