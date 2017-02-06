import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MoviesService} from '../../../services/movies.service';
import {genres} from '../movies.component';


@Component({
  moduleId: module.id,
  selector: 'new-movies',
  templateUrl: './new-movies.component.html',
  styleUrls: ['./new-movies.component.css'],
  providers: [MoviesService]
})
export class NewMoviesComponent implements OnInit {
  private movies: genres[];
  private pathImage = 'https://image.tmdb.org/t/p/w500/';
  private pathNoImage = '../../../../no-image.png';

  constructor(private moviesService: MoviesService,
              private router: Router) {
  }

  ngOnInit() {

    this.moviesService.getPopularMovies()
      .subscribe(moviesArray => {
        this.movies = moviesArray;
      });
  }

  goToDetail(movie: genres) {
    this.router.navigate(['movies/detail', movie.id]);
  }

}
