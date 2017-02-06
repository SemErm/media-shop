import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {MoviesService} from '../../../services/movies.service';
import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.css'],
  providers: [MoviesService]
})
export class DetailMovieComponent implements OnInit {
  private movie: Object;
  private pathImage = 'https://image.tmdb.org/t/p/w500/';

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
