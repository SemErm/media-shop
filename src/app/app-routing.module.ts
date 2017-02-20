import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./main-page/main-page.component";
import {MoviesCategoryComponent} from "./category/movies-category/movies-category.component";
import {ProductComponent} from "./product/product.component";
import {FilterPageComponent} from "./shared/components/filter-page/filter-page.component";
import {MoviesHomePageComponent} from "./category/movies-category/movies-home-page.component";
import {ProfileMainPageComponent} from "./profile/main-page.component";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileToastsComponent} from "./profile/toasts.component";
import {ProfileAddressesComponent} from "./profile/addresses.component";
import {ProfileEditComponent} from "./profile/edit.component";
import {BasketComponent} from "./basket/basket.component";
import {MusicsCategoryComponent} from "./category/musics-category/musics-category.component";
import {MusicsHomePageComponent} from "./category/musics-category/musics-home-page.component";
import {GamesCategoryComponent} from "./category/games-category/games-category.component";
import {GamesHomePageComponent} from "./category/games-category/games-home-page.component";
import {SearchComponent} from "./search/search.component";
import {CheckoutComponent} from "./checkout/checkout.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {
    path: 'movies', component: MoviesCategoryComponent, children: [
    {path: '', component: MoviesHomePageComponent},
    {path: 'filter', component: FilterPageComponent}
  ]
  },
  {
    path: 'musics', component: MusicsCategoryComponent, children: [
    {path: '', component: MusicsHomePageComponent},
    {path: 'filter', component: FilterPageComponent}
  ]
  },
  {path: 'games',component: GamesCategoryComponent, children:[
    {path: '', component: GamesHomePageComponent},
    {path: 'filter', component: FilterPageComponent}
  ]},
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
  {path: 'search', component :SearchComponent},
  {path: 'checkout',component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
