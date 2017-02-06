import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
const api_key = '544ce33d881d9c8b4f234cc65fa42475';
const api_url = 'https://api.themoviedb.org/3';

@Injectable()
export class MusicsService {

  constructor(private _http: Http) {
  }

  getPopularMusics() {
    const countMovies = 6;
    return this._http.get(api_url + '/movie/now_playing?api_key=' + api_key + '&language=en-US&page=1')
      .map(res => res.json().results.slice(0, countMovies));
  }

}
