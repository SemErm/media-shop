import {Component, OnInit} from '@angular/core';
import {GamesService} from "../../services/games.service";


@Component({
  moduleId: module.id,
  selector: 'mainPage',
  templateUrl: './main-page.component.html',
  providers: [GamesService]
})
export class MainPageComponent implements OnInit {
  private resentlyGames: Array<any>;

  constructor(private gamesService: GamesService) {
  }

  ngOnInit() {
    this.gamesService.getNewGames()
      .subscribe(games => this.resentlyGames = games);
  }
}
