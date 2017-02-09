import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

const api_key = '544ce33d881d9c8b4f234cc65fa42475';
const api_url = 'https://api.themoviedb.org/3';

@Injectable()
export class MoviesService {
  private genres = [];
  private nowPlaying = [];

  constructor(private _http: Http) {
  }

  getNowPlayingMovies() {
    if (!this.nowPlaying.length) {
      console.log('http');
      return this.loadNowPlayingMovies();
    }
    else {
      console.log('service');
      return Observable.of(this.nowPlaying);
    }
  }

  loadNowPlayingMovies() {
    return this._http.get(api_url + '/movie/now_playing?api_key=' + api_key + '&language=en-US&page=1')
      .map(res => {
        this.nowPlaying = res.json().results.slice(0, 6);
        return this.nowPlaying;
      });
  }

  getGenres() {
    console.log(this.genres);
    if (!this.genres.length) {
      return this.loadGenres();
    }
    else {
      return Observable.of(this.genres);
    }
  }

  loadGenres() {
    return this._http.get(api_url + '/genre/movie/list?api_key=' + api_key + '&language=en-US&page=1')
      .map(res => {
        this.genres = res.json().genres;
        return this.genres;
      });
  }

  getMoviesByGenres(id: number) {
    const countMovies = 6;
    return this._http.get(api_url + '/genre/' + id + '/movies?api_key=' + api_key + '&language=en-US&page=1')
      .map(res => res.json().results.slice(0, countMovies));
  }

  getMovie(id: number) {
    return this._http.get(api_url + '/movie/' + id + '?api_key=' + api_key + '&language=en-US')
      .map(res => res.json());
  }
}
