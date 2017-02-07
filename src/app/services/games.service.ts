import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';
import * as _ from 'lodash';

const api_key = 'mOOXc4tX8Pmsh0FpTzd1KwlWjSHhp1MuPfXjsnCJsAUgGEcL9O';
const api_url = 'https://igdbcom-internet-game-database-v1.p.mashape.com/';
const headers = new Headers({
  "X-Mashape-Key": api_key,
  "Accept": "application/json"
});


@Injectable()
export class GamesService {

  constructor(private _http: Http) {
  }

  getDevelopers(id: string[]) {
    let options = new RequestOptions({headers: headers});
    return this._http.get(api_url + 'companies/' + _.join(id, ',') + '?fields=name', options)
      .map(res => res.json())
      .map(res => {
        let result: string[] = [];
        res.forEach((item) => {
          result.push(item.name);
        });
        return result;
      });
  }

  getNameGenre(id: string[]) {
    let options = new RequestOptions({headers: headers});
    return this._http.get(api_url + 'genres/' + _.join(id, ',') + '?fields=id,name&limit=20', options)
      .map(res => res.json())
      .map(res => {
        let result: string[] = [];
        res.forEach((item) => {
          result.push(item.name);
        });
        return result;
      });
  }

  getGenres() {
    let options = new RequestOptions({headers: headers});
    return this._http.get(api_url + 'genres/' + '?fields=id,name,games&limit=20', options)
      .map(res => res.json());
  }

  getGameModes() {
    let options = new RequestOptions({headers: headers});
    return this._http.get(api_url + 'game_modes/' + '?fields=id,name,games&limit=20', options)
      .map(res => res.json());
  }

  getThemes() {
    let options = new RequestOptions({headers: headers});
    return this._http.get(api_url + 'themes/' + '?fields=id,name,games&limit=20', options)
      .map(res => res.json());
  }

  getNewGames() {
    let fields = 'id,name,cover,url,developers,genres,popularity,release_dates,slug,storyline';
    let date = new Date();
    let currentDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
    let options = new RequestOptions({headers: headers});

    return this._http.get(api_url + 'games/?fields=' + fields + '&limit=6&filter[release_dates.date][lte]=' + currentDate + '&order=release_dates.date:desc:min', options)
      .map(res => res.json());
  }

  getGame(id: number) {
    let options = new RequestOptions({headers: headers});
    return this._http.get(api_url + 'games/' + id + '?fields=*', options)
      .map(res =>res.json()[0]);
  }

}
