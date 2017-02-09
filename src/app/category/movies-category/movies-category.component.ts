import {Component, OnInit} from "@angular/core";
import {MoviesService} from "../../shared/services/movies.service";
import * as _ from 'lodash';
import {Router} from "@angular/router";

interface categoryGenre {
  id: number;
  name: string;
  movies: any[];
}

@Component({
  moduleId: module.id,
  selector: 'movies-category',
  templateUrl: 'movies-category.component.html'
})

export class MoviesCategoryComponent implements OnInit {
  private genres = [];
  private randomGenres: categoryGenre[] = [];
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
          console.log(this.randomGenres);
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
        name: movie.title,
        poster: this.pathImage + movie.poster_path,
        price: (movie.vote_average * 5.5).toFixed(2)
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
