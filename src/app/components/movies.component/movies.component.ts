import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {Router} from '@angular/router';
import * as _ from "lodash";

export interface genres {
  id: number;
  name: string;
  movies?: any;
}

@Component({
  moduleId: module.id,
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MoviesService]
})

export class MoviesComponent implements OnInit {
  private genres: genres[];
  private randomGenres: genres[] = [];
  private pathImage = 'https://image.tmdb.org/t/p/w500/';
  private pathNoImage = '../../../../no-image.png';

  constructor(private moviesService: MoviesService,
              private router: Router) {
  }

  setRandomGenres() {
    const NUMBER_GENRES = 3;
    let tmpGenres = this.genres;

    for (let i = 0; i < NUMBER_GENRES; i++) {
      let random = _.random(0, tmpGenres.length - 1);
      let newSectionGenre: any = {};
      newSectionGenre = tmpGenres[random];
      this.moviesService.getMoviesByGenres(newSectionGenre.id)
        .subscribe(res => newSectionGenre.movies = res);
      this.randomGenres.push(newSectionGenre);

      tmpGenres = _.remove(tmpGenres, (item) => {
        return _.last(this.randomGenres) !== item.name;
      });
    }
  }

  ngOnInit() {
    this.moviesService.getGenres()
      .subscribe(genres => {
        this.genres = genres;
        this.setRandomGenres();
      });
  }


  goToDetail(movie: genres) {
    this.router.navigate(['movies/detail', movie.id]);
  }
}
