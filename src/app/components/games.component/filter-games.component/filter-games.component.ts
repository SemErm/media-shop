import {Component, OnInit} from '@angular/core';
import {GamesService} from "../../../services/games.service";
import {genres} from "../../movies.component/movies.component";

@Component({
  moduleId: module.id,
  selector: 'filter-games',
  templateUrl: './filter-games.component.html',
  styleUrls: ['./filter-games.component.css'],
  providers: [GamesService]
})

export class FilterGamesComponent implements OnInit {
  private genres: Array<any>;
  private gameModes: Array<any>;
  private themes: Array<any>;

  constructor(private gameService: GamesService) {
  }

  ngOnInit() {
    this.gameService.getGenres()
      .subscribe(genres => this.genres = genres);

    this.gameService.getGameModes()
      .subscribe(gameModes => this.gameModes = gameModes);

    this.gameService.getThemes()
      .subscribe(themes => this.themes  = themes);
  }
}
