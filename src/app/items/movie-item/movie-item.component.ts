import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {MoviesService} from '../../shared/services/movies.service';
import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls:['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  private movie: any;
  private pathImage = 'https://image.tmdb.org/t/p/w500/';

  constructor(private moviesService: MoviesService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  generateMovie(movie) {
      return {
        id: movie.id,
        name: movie.title,
        poster: this.pathImage + movie.poster_path,
        vote: movie.vote_average,
        tagline: movie.tagline,
        release_date: movie.release_date,
        budget: movie.budget,
        production_companies: movie.production_companies,
        production_countries: movie.production_countries,
        homepage: movie.homepage,
        genres: movie.genres,
        overview: movie.overview,
        price: (movie.vote_average * 5.5).toFixed(2)
      };
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.moviesService.getMovie(+params['id']))
      .subscribe(movie => {
        this.movie = this.generateMovie(movie);
        console.log(this.movie);
      });
  }

  goBack(){
    this.location.back();
  }
}
