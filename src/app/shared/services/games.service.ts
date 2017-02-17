import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/map";
import * as _ from "lodash";
import {Observable} from "rxjs";
import {Product} from "../../product/product";
import {Auth} from "./auth.service";

const api_key = 'mOOXc4tX8Pmsh0FpTzd1KwlWjSHhp1MuPfXjsnCJsAUgGEcL9O';
const api_url = 'https://igdbcom-internet-game-database-v1.p.mashape.com/';
const headers = new Headers({
  "X-Mashape-Key": api_key,
  "Accept": "application/json"
});

@Injectable()
export class GamesService {

  private genres = [];
  private newGames = [];
  private pathNoImage = "assets/no-image.png";
  private pathImage = 'https://images.igdb.com/igdb/image/upload/t_cover_big/';

  constructor(private _http: Http) {
  }

  generateGame(game) {
    let newGames = new Product();
    newGames.id = game.id;
    newGames.type = 'game';
    newGames.name = game.name;
    newGames.poster = game.cover ? (`${this.pathImage}${game.cover.cloudinary_id}.png`) : this.pathNoImage;
    newGames.price = (game.popularity * 5.5 + 5).toFixed(2);
    newGames.homepage = game.url;
    newGames.release_date = game.release_dates ? game.release_dates[0].human : 'No information';
    newGames.genres = game.genres;
    newGames.overview = game.summary || 'This game has not description';
    newGames.game_modes = game.game_modes;
    return newGames;
  }

  getNewGames() {
    if (!this.newGames.length) {
      return this.loadNewGames();
    }
    else {
      return Observable.of(this.newGames);
    }
  }

  loadNewGames() {
    let date = new Date();
    let currentDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);

    let params = new URLSearchParams();
    params.set('fields', '*');
    params.set('limit', '6');
    params.set('filter[release_dates.date][lt]', currentDate);
    params.set('filter[category][eq]', '0');
    params.set('status', '0');
    params.set('order', 'release_dates.date:desc:min');

    let options = new RequestOptions({headers: headers, search: params});

    return this._http.get(`${api_url}games/`, options)
      .map(res => {
        this.newGames = res.json();
        return this.newGames;
      });
  }


  getGenres() {
    if (!this.genres.length) {
      console.log('load genres');
      return this.loadGenres();
    }
    else {
      console.log('no load genres');
      return Observable.of(this.genres);
    }
  }

  loadGenres() {
    let params = new URLSearchParams();
    params.set('fields', 'id,name,games');
    params.set('limit', '20');
    let options = new RequestOptions({headers: headers, search: params});
    return this._http.get(`${api_url}genres/`, options)
      .map(res => {
        this.genres = res.json();
        return this.genres;
      });
  }

  getNameGenres(idsGenres) {
    this.getGenres()
      .subscribe(genres => {
        let result = [];
        for (let id of idsGenres) {
          result.push(_.find(genres, ['id', id]).name);
        }
        console.log(result);
        return result;
      });
  }

  getGame(id: number) {
    let options = new RequestOptions({headers: headers});
    return this._http.get(api_url + 'games/' + id + '?fields=*', options)
      .map(res => res.json()[0]);
  }

  getFilterGame(filter: any) {

    let params = new URLSearchParams();

    for (let val of Object.keys(filter)) {
      params.set(val, filter[val]);
    }
    params.set('limit', '18');
    let options = new RequestOptions({
      headers: headers,
      search: params
    });

    return this._http.get(`${api_url}games/?`, options)
      .map(res => res.json());
  }

}
