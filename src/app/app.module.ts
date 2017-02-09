import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {MainPageComponent} from "./main-page/main-page.component";
import {MoviesCategoryComponent} from "./category/movies-category/movies-category.component";
import {MovieItemComponent} from "./items/movie-item/movie-item.component";
import {FilterComponent} from "./shared/filter/filter.component";


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MoviesCategoryComponent,
    MovieItemComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
