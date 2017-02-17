import {Injectable} from "@angular/core";
import {Http, RequestOptions, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs";
import {Product} from "../../product/product";
import {Auth} from "./auth.service";

@Injectable()
export class MusicsService {
  private api_url = 'https://api.spotify.com/v1/';
  private newReleases = [];
  private pathNoImage = "assets/no-image.png";
  private genresMusic = [
    'alternative metal',
    'hard rock',
    'metal',
    'rock',
    'speed metal',
    'thrash metal',
    'album rock',
    'blues-rock',
    'classic rock',
    'mellow gold',
    'metal',
    'rock',
    'soft rock',
    'britpop',
    'indie rock',
    'permanent wave',
    'pop rock',
    'electronic',
    'madchester',
    'neo mellow',
    'neo-psychedelic',
    'new wave',
    'synthpop',
    'dance rock',
    'uk post-punk',
    'abstracto',
    'aussietronica',
    'deep discofox',
    'destroy techno',
    'footwork',
    'freak folk'
  ];

  getGenres() {
    return Array.from(this.genresMusic);
  }

  constructor(private http: Http) {
  }

  generateMusic(item) {
    let newMusic = new Product();
    newMusic.id = item.id;
    newMusic.type = item.type;
    newMusic.name = item.name;
    newMusic.homepage = item.external_urls.spotify;
    newMusic.poster = item.images[1] ? item.images[1].url : this.pathNoImage;
    newMusic.price = (5.55).toFixed(2);
    if (item.genres) newMusic.genres = item.genres;
    if (item.label) newMusic.label = item.label;
    if (item.release_date) newMusic.release_date = item.release_date;
    if (item.artists) newMusic.artists = item.artists.map(artist => artist.name);
    if (item.popularity) newMusic.vote = item.popularity;
    return newMusic;
  }

  getNewReleases() {
    if (!this.newReleases.length) {
      return this.loadNewReleases();
    } else {
      return Observable.of(this.newReleases);
    }
  }

  loadNewReleases() {
    let params = new URLSearchParams();
    params.set('q', 'tag:new');
    params.set('type', 'album,artist');
    params.set('limit', '6');
    let option = new RequestOptions({search: params});
    return this.http.get(`${this.api_url}search`, option)
      .map(res => {
        this.newReleases = res.json().albums.items;
        return this.newReleases;
      });
  }

  getAlbum(id: number) {
    return this.http.get(`${this.api_url}albums/${id}`)
      .map(res => res.json());
  }

  getArtist(id: number) {
    return this.http.get(`${this.api_url}artists/${id}`)
      .map(res => res.json());
  }

  getTopTracks(id: number) {
    return this.http.get(`${this.api_url}artists/${id}/top-tracks?country=US`)
      .map(res => res.json().tracks)
  }

  getMusicsByGenre(genre) {
    let params = new URLSearchParams();
    params.set('q', `genre:"${genre}"`);
    params.set('type', 'artist');
    params.set('limit', '6');
    let option = new RequestOptions({search: params});
    return this.http.get(`${this.api_url}search`, option)
      .map(res => res.json().artists.items);
  }

  getFilterMusic(filter) {
    let params = new URLSearchParams();
    params.set('q', `${filter}`);
    params.set('type', 'album,artist');
    params.set('limit', '18');
    let option = new RequestOptions({search: params});
    return this.http.get(`${this.api_url}search`, option)
      .map(res => res.json().artists.items);
  }

}
