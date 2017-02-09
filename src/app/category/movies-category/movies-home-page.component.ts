import {Component} from "@angular/core";
import {MoviesService} from "../../shared/services/movies.service";
import {Router} from "@angular/router";
import * as _ from 'lodash';

@Component({
  moduleId:module.id,
  selector:'movies-home-page',
  templateUrl: 'movies-home-page.component.html'
})

export class MoviesHomePageComponent{
  private genres = [];
  private randomGenres = [];
  private nowPlayingMovies = [];
  private pathImage = 'https://image.tmdb.org/t/p/w500/';
  constructor(private moviesService: MoviesService,
              private router: Router) {
  }

  setRandomGenres() {
    const numberGenres = 3;
    let tmpGenres = this.genres;

    for (let i = 0; i < numberGenres; i++) {
      let random = _.random(0, tmpGenres.length - 1);
      let newSectionGenre: any = {};
      newSectionGenre = tmpGenres[random];
      this.moviesService.getMoviesByGenres(newSectionGenre.id)
        .subscribe(res => {
          newSectionGenre.movies = this.generateMovies(res);
          this.randomGenres.push(newSectionGenre);
          tmpGenres = _.remove(tmpGenres, (item) => {
            return _.last(this.randomGenres) !== item.name;
          });
        });
    }
  }

  generateMovies(movies) {
    return movies.map(movie => {
      return {
        id: movie.id,
        type: 'movie',
        name: movie.title,
        poster: this.pathImage + movie.poster_path,
        price: (movie.vote_average * 5.5 + 5).toFixed(2)
      }
    });
  }

  ngOnInit() {
    this.moviesService.getGenres()
      .subscribe(genres => {
        this.genres = genres;
        this.setRandomGenres();
      });

    this.moviesService.getNowPlayingMovies()
      .subscribe(movies => this.nowPlayingMovies = this.generateMovies(movies));
  }

  goToDetail(movie){
    this.router.navigate(['movies', movie.id]);
  }
}
