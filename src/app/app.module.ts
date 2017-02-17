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
import {MoviesHomePageComponent} from "./category/movies-category/movies-home-page.component";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileMainPageComponent} from "./profile/main-page.component";
import {ProfileToastsComponent} from "./profile/toasts.component";
import {ProfileAddressesComponent} from "./profile/addresses.component";
import {ProfileEditComponent} from "./profile/edit.component";
import {BasketComponent} from "./basket/basket.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ModalWindowComponent} from "./shared/modal-window.component/modal-window.component";
import {ProductComponent} from "./product/product.component";
import {MusicsCategoryComponent} from "./category/musics-category/musics-category.component";
import {MusicsHomePageComponent} from "./category/musics-category/musics-home-page.component";
import {GamesCategoryComponent} from "./category/games-category/games-category.component";
import {GamesHomePageComponent} from "./category/games-category/games-home-page.component";
import {SearchComponent} from "./search/search.component";
import {CategoryComponent} from "./category/category.component";
import {CategoryHomePageComponent} from "./category/category-home-page.component";



@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MoviesCategoryComponent,
    MoviesHomePageComponent,
    MusicsCategoryComponent,
    MusicsHomePageComponent,
    ProfileComponent,
    ProfileMainPageComponent,
    ProfileToastsComponent,
    ProfileAddressesComponent,
    ProfileEditComponent,
    BasketComponent,
    ModalWindowComponent,
    ProductComponent,
    GamesCategoryComponent,
    GamesHomePageComponent,
    SearchComponent,
    CategoryComponent,
    CategoryHomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    ToasterModule,
    NgbModule.forRoot()
  ],
  entryComponents:[ModalWindowComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
