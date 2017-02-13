import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ToasterModule} from 'angular2-toaster';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {MainPageComponent} from "./main-page/main-page.component";
import {MoviesCategoryComponent} from "./category/movies-category/movies-category.component";
import {MovieItemComponent} from "./items/movie-item/movie-item.component";
import {MoviesHomePageComponent} from "./category/movies-category/movies-home-page.component";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileMainPageComponent} from "./profile/main-page.component";
import {ProfileToastsComponent} from "./profile/toasts.component";
import {ProfileAddressesComponent} from "./profile/addresses.component";
import {ProfileEditComponent} from "./profile/edit.component";
import {BasketComponent} from "./basket/basket.component";



@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MoviesCategoryComponent,
    MovieItemComponent,
    MoviesHomePageComponent,
    ProfileComponent,
    ProfileMainPageComponent,
    ProfileToastsComponent,
    ProfileAddressesComponent,
    ProfileEditComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    ToasterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
