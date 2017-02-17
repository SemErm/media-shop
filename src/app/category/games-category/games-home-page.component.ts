import {Component, OnInit} from "@angular/core";
import {GamesService} from "../../shared/services/games.service";
import * as _ from "lodash";

@Component({
  moduleId: module.id,
  selector: 'games-home-page',
  templateUrl: './games-home-page.component.html'
})

export class GamesHomePageComponent implements OnInit {
  private randomGenres = [];
  private resentlyGames = [];

  constructor(private gamesService: GamesService) {

  }

  setRandomGenres(genres) {
    const numberGenres = 3;
    let tmpGenres = genres;
    for (let i = 0; i < numberGenres; i++) {
      let random = _.random(0, tmpGenres.length - 1);
      let newSectionGenre: any = {};
      newSectionGenre.name = tmpGenres[random].name;
      newSectionGenre.games = [];
      let randomGames = _.random(0, tmpGenres[random].games.length);
      let randomGameOfGenre = tmpGenres[random].games.slice(randomGames, randomGames + 6);
      for (let game of randomGameOfGenre) {
        this.gamesService.getGame(game)
          .subscribe(game => {
            newSectionGenre.games.push(this.gamesService.generateGame(game));
          })
      }
      this.randomGenres.push(newSectionGenre);
      /*this.moviesService.getMoviesByGenres(newSectionGenre.id)
        .subscribe(res => {
          newSectionGenre.movies = res.map(movie => {
            return this.moviesService.generateMovie(movie)
          });
          this.randomGenres.push(newSectionGenre);
          tmpGenres = _.remove(tmpGenres, (item) => {
            return _.last(this.randomGenres) !== item.name;
          });
        });*/
    }
  }

  ngOnInit() {
    this.gamesService.getNewGames()
      .subscribe(games => {
        this.resentlyGames = games.map(game => {
          return this.gamesService.generateGame(game);
        });
      });
    this.gamesService.getGenres()
      .subscribe(genres => {
        this.setRandomGenres(genres);
      })
  }
}
