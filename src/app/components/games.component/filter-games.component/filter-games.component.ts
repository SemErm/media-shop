import {Component, OnInit} from '@angular/core';
import {GamesService} from "../../../services/games.service";
import {Router} from '@angular/router';

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

  private selectedGenre: any = 0;
  private selectedGameMode: any = 0;
  private selectedTheme: any = 0;
  private search: string = '';

  constructor(private gameService: GamesService,
              private router: Router) {
  }

  ngOnInit() {
    this.gameService.getGenres()
      .subscribe(genres => {
        this.genres = genres;
      });

    this.gameService.getGameModes()
      .subscribe(gameModes => {
        this.gameModes = gameModes;
      });

    this.gameService.getThemes()
      .subscribe(themes => {
        this.themes = themes;
      });
  }

  onSelectGenre(genre: any) {
    this.selectedGenre = genre;
  }

  onSelectGameMode(gameMode: any) {
    this.selectedGameMode = gameMode;
  }

  onSelectTheme(theme: any) {
    this.selectedTheme = theme;
  }

  goToFilter() {
    this.router.navigate(['games/filter'], {
      queryParams: {
        search: this.search, genre: this.selectedGenre, game_mode: this.selectedGameMode,
        theme: this.selectedTheme
      }
    });
  }

}
