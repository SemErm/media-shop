import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {MoviesService} from "../shared/services/movies.service";
import * as _ from "lodash";
import {MusicsService} from "../shared/services/musics.service";
import {GamesService} from "../shared/services/games.service";
@Component({
  moduleId: module.id,
  selector: 'category-home-page',
  templateUrl: './category-home-page.component.html'
})

export class CategoryHomePageComponent implements OnInit {
  private newReleasesItems = [];
  private randomGenres = [];
  private category: string;

  constructor(private route: ActivatedRoute,
              private moviesService: MoviesService,
              private musicsService: MusicsService,
              private gamesService: GamesService) {
  }

  setRandomGenresMovies(genres) {
    const numberGenres = 3;
    let tmpGenres = genres;

    for (let i = 0; i < numberGenres; i++) {
      let random = _.random(0, tmpGenres.length - 1);
      let newSectionGenre: any = {};
      newSectionGenre = tmpGenres[random];
      this.moviesService.getMoviesByGenres(newSectionGenre.id)
        .subscribe(res => {
          newSectionGenre.items = res.map(movie => {
            return this.moviesService.generateMovie(movie)
          });
          this.randomGenres.push(newSectionGenre);
          tmpGenres = _.remove(tmpGenres, (item) => {
            return _.last(this.randomGenres) !== item.name;
          });
        });
    }
  }

  setRandomGenresMusics() {
    const numberGenres = 3;
    let tmpGenres = this.musicsService.getGenres();
    for (let i = 0; i < numberGenres; i++) {
      let random = _.random(0, tmpGenres.length - 1);
      let newSectionGenre: any = {};
      newSectionGenre['name'] = tmpGenres[random];
      this.musicsService.getMusicsByGenre(newSectionGenre.name)
        .subscribe(res => {
          newSectionGenre.items = res.map(music => {
            return this.musicsService.generateMusic(music)
          });
          this.randomGenres.push(newSectionGenre);
          tmpGenres = _.remove(tmpGenres, (item) => {
            return _.last(this.randomGenres) !== item.name;
          });
        });
    }
  }

  setRandomGenresGames(genres) {
    const numberGenres = 3;
    let tmpGenres = genres;
    for (let i = 0; i < numberGenres; i++) {
      let random = _.random(0, tmpGenres.length - 1);
      let newSectionGenre: any = {};
      newSectionGenre.name = tmpGenres[random].name;
      newSectionGenre.items = [];
      let randomGames = _.random(0, tmpGenres[random].games.length);
      let randomGameOfGenre = tmpGenres[random].games.slice(randomGames, randomGames + 6);
      for (let game of randomGameOfGenre) {
        this.gamesService.getGame(game)
          .subscribe(game => {
            newSectionGenre.items.push(this.gamesService.generateGame(game));
            tmpGenres = _.remove(tmpGenres, (item) => {
              return _.last(this.randomGenres) !== item.name;
            });
          })
      }
      this.randomGenres.push(newSectionGenre);
    }
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: any) => {
        this.newReleasesItems = [];
        this.randomGenres = [];
        this.category = params.category;
        switch (params.category) {
          case 'movies': {
            this.moviesService.getGenres()
              .subscribe(genres => {
                this.setRandomGenresMovies(genres);
              });

            this.moviesService.getNowPlayingMovies()
              .subscribe(movies => this.newReleasesItems = movies.map(movie => {
                  return this.moviesService.generateMovie(movie)
                })
              );
            break;
          }
          case 'musics': {
            this.musicsService.getNewReleases()
              .subscribe(musics => {
                this.setRandomGenresMusics();
                this.newReleasesItems = musics.map(music => {
                  return this.musicsService.generateMusic(music)
                })
              });
            break;
          }
          case 'games': {
            this.gamesService.getNewGames()
              .subscribe(games => {
                this.newReleasesItems = games.map(game => {
                  return this.gamesService.generateGame(game);
                });
              });

            this.gamesService.getGenres()
              .subscribe(genres => {
                this.setRandomGenresGames(genres);
              });
            break;
          }
          default: {
            return;
          }
        }
      });
  }
}
