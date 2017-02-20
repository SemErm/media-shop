import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainPageComponent } from "./main-page/main-page.component";
import { ProductComponent } from "./product/product.component";
import { FilterPageComponent } from "./shared/components/filter-page/filter-page.component";
import { ProfileMainPageComponent } from "./profile/main-page.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileToastsComponent } from "./profile/toasts.component";
import { ProfileAddressesComponent } from "./profile/addresses.component";
import { ProfileEditComponent } from "./profile/edit.component";
import { BasketComponent } from "./basket/basket.component";
import { SearchComponent } from "./search/search.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { CategoryComponent } from "./category/category.component";
import { CategoryHomePageComponent } from "./category/category-home-page.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},

  {
    path: 'category/:category', component: CategoryComponent, children: [
    {path: '', component: CategoryHomePageComponent},
    {path: 'filter', component: FilterPageComponent}
  ]
  },
  {path: 'product', component: ProductComponent},
  {
    path: 'profile', component: ProfileMainPageComponent, children: [
    {path: '', redirectTo: 'personal', pathMatch: 'full'},
    {path: 'personal', component: ProfileComponent},
    {path: 'toasts', component: ProfileToastsComponent},
    {path: 'addresses', component: ProfileAddressesComponent},
    {path: 'edit', component: ProfileEditComponent}
  ]
  },
  {path: 'basket', component: BasketComponent},
  {path: 'search', component: SearchComponent},
  {path: 'checkout', component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
