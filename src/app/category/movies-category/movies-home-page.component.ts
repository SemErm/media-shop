import {Component, OnInit} from "@angular/core";
import {MoviesService} from "../../shared/services/movies.service";
import * as _ from 'lodash';

@Component({
  moduleId:module.id,
  selector:'movies-home-page',
  templateUrl: 'movies-home-page.component.html'
})

export class MoviesHomePageComponent implements OnInit{
  private randomGenres = [];
  private nowPlayingMovies = [];

  constructor(private moviesService: MoviesService) {
  }

  setRandomGenres(genres) {
    const numberGenres = 3;
    let tmpGenres = genres;

    for (let i = 0; i < numberGenres; i++) {
      let random = _.random(0, tmpGenres.length - 1);
      let newSectionGenre: any = {};
      newSectionGenre = tmpGenres[random];
      this.moviesService.getMoviesByGenres(newSectionGenre.id)
        .subscribe(res => {
          newSectionGenre.movies = res.map(movie=>{
            return this.moviesService.generateMovie(movie)
          });
          this.randomGenres.push(newSectionGenre);
          tmpGenres = _.remove(tmpGenres, (item) => {
            return _.last(this.randomGenres) !== item.name;
          });
        });
    }
  }

  ngOnInit() {
    this.moviesService.getGenres()
      .subscribe(genres => {
        this.setRandomGenres(genres);
      });

    this.moviesService.getNowPlayingMovies()
      .subscribe(movies => this.nowPlayingMovies = movies.map(movie=>{
        return this.moviesService.generateMovie(movie)
      })
    );
  }

}
