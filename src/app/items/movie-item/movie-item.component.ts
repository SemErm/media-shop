import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {MoviesService} from '../../shared/services/movies.service';
import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'movie-item',
  templateUrl: './movie-item.component.html'
})
export class MovieItemComponent implements OnInit {
  private movie: any;
  private pathImage = 'https://image.tmdb.org/t/p/w500/';
  private pathNoImage = '../../../../no-image.png';

  constructor(private moviesService: MoviesService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.moviesService.getMovie(+params['id']))
      .subscribe(movie => {
        this.movie = movie;
        console.log(this.movie);
      });
  }

  goBack(){
    this.location.back();
  }
}