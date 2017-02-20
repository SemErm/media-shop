import { Injectable } from "@angular/core";
import { Http, URLSearchParams, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs";
import { Product } from "../../product/product";

const api_key = '544ce33d881d9c8b4f234cc65fa42475';
const api_url = 'https://api.themoviedb.org/3';

@Injectable()
export class MoviesService {
  private genres = [];
  private nowPlaying = [];
  private pathImage = 'https://image.tmdb.org/t/p/w500';
  private pathNoImage = "assets/no-image.png";

  constructor(private http: Http) {
  }

  generateMovie(movie) {
    let newMovie = new Product();
    newMovie.id = movie.id;
    newMovie.type = 'movie';
    newMovie.name = movie.title;
    newMovie.poster = movie.poster_path ? (this.pathImage + movie.poster_path) : this.pathNoImage;
    newMovie.price = (movie.vote_average + 5).toFixed(2);
    newMovie.homepage = movie.homepage || 'No information';
    newMovie.vote = movie.vote_average;
    newMovie.tagline = movie.tagline || 'No information';
    newMovie.release_date = movie.release_date;
    newMovie.budget = movie.budget || 'No information';
    newMovie.production_companies = movie.production_companies || ['No information'];
    newMovie.production_countries = movie.production_countries || ['No information'];
    newMovie.genres = movie.genres || ['No information'];
    newMovie.overview = movie.overview || 'No information';
    return newMovie;
  }

  getNowPlayingMovies() {
    if (!this.nowPlaying.length) {
      return this.loadNowPlayingMovies();
    }
    else {
      return Observable.of(this.nowPlaying);
    }
  }

  loadNowPlayingMovies() {
    return this.http.get(`${api_url}/movie/now_playing?api_key=${api_key}&language=en-US&page=1`)
      .map(res => {
        this.nowPlaying = res.json().results.slice(0, 6);
        return this.nowPlaying;
      });
  }

  getGenres() {
    if (!this.genres.length) {
      return this.loadGenres();
    }
    else {
      return Observable.of(this.genres);
    }
  }

  loadGenres() {
    return this.http.get(`${api_url}/genre/movie/list?api_key=${api_key}&language=en-US&page=1`)
      .map(res => {
        this.genres = res.json().genres;
        return this.genres;
      });
  }

  getMoviesByGenres(id: number) {
    const countMovies = 6;
    return this.http.get(`${api_url}/genre/${id}/movies?api_key=${api_key}&language=en-US&page=1`)
      .map(res => res.json().results.slice(0, countMovies));
  }

  getMovie(id: number) {
    return this.http.get(`${api_url}/movie/${id}?api_key=${api_key}&language=en-US`)
      .map(res => res.json());
  }

  gerSearchMovies(query) {
    let params = new URLSearchParams();
    params.set('api_key', api_key);
    params.set('query', query);
    let options = new RequestOptions({
      search: params
    });
    return this.http.get(`${api_url}/search/movie`, options)
      .map(res => res.json().results)
  }

  getMoviesByFilter(filter) {
    let params = new URLSearchParams();
    params.set('api_key', api_key);

    for (let val of Object.keys(filter)) {
      params.set(val, filter[val]);
    }

    let options = new RequestOptions({
      search: params
    });

    return this.http.get(`${api_url}/discover/movie`, options)
      .map(res => res.json().results);

  }
}
