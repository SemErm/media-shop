import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ToasterModule} from "angular2-toaster";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {SharedModule} from "./shared/shared.module";
import {MainPageComponent} from "./main-page/main-page.component";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileMainPageComponent} from "./profile/main-page.component";
import {ProfileToastsComponent} from "./profile/toasts.component";
import {ProfileAddressesComponent} from "./profile/addresses.component";
import {ProfileEditComponent} from "./profile/edit.component";
import {BasketComponent} from "./basket/basket.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ModalWindowComponent} from "./shared/components/modal-window.component/modal-window.component";
import {ProductComponent} from "./product/product.component";
import {SearchComponent} from "./search/search.component";
import {CategoryComponent} from "./category/category.component";
import {CategoryHomePageComponent} from "./category/category-home-page.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {ConfirmationComponent} from "./checkout/confirmation.component";


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ProfileComponent,
    ProfileMainPageComponent,
    ProfileToastsComponent,
    ProfileAddressesComponent,
    ProfileEditComponent,
    BasketComponent,
    ModalWindowComponent,
    ProductComponent,
    SearchComponent,
    CategoryComponent,
    CategoryHomePageComponent,
    CheckoutComponent,
    ConfirmationComponent
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
  entryComponents: [
    ModalWindowComponent,
    ConfirmationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
