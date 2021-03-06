import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GamesService } from "./services/games.service";
import { MoviesService } from "./services/movies.service";
import { MusicsService } from "./services/musics.service";
import { FilterComponent } from "./components/filter/filter.component";
import { FilterPageComponent } from "./components/filter-page/filter-page.component";
import { ItemComponent } from "./components/item/item.component";
import { Auth } from "./services/auth.service";
import { BasketService } from "./services/basket.service";
import { CurrencyPricePipe } from "./pipes/currency.pipe";
import { CapitalLetterPipe } from "./pipes/capital-letter.pipe";

@NgModule({
  declarations: [
    FilterComponent,
    FilterPageComponent,
    ItemComponent,
    CurrencyPricePipe,
    CapitalLetterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FilterComponent,
    FilterPageComponent,
    ItemComponent,
    CurrencyPricePipe,
    FormsModule,
    ReactiveFormsModule,
    CapitalLetterPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        Auth,
        GamesService,
        MoviesService,
        MusicsService,
        BasketService
      ]
    };
  }
}

