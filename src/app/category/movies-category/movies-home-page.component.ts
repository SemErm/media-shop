import {Component, OnInit} from "@angular/core";
import {MoviesService} from "../../shared/services/movies.service";
import {Router} from "@angular/router";
import * as _ from 'lodash';

@Component({
  moduleId:module.id,
  selector:'movies-home-page',
  templateUrl: 'movies-home-page.component.html'
})

export class MoviesHomePageComponent implements OnInit{
  private genres = [];
  private randomGenres = [];
  private nowPlayingMovies = [];

  constructor(private moviesService: MoviesService) {
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
          newSectionGenre.movies = this.moviesService.generateMovies(res);
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
        this.genres = genres;
        this.setRandomGenres();
      });

    this.moviesService.getNowPlayingMovies()
      .subscribe(movies => this.nowPlayingMovies = this.moviesService.generateMovies(movies));
  }

}
