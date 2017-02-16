import {Injectable} from "@angular/core";
import {Http, RequestOptions, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs";
import {Product} from "../../product/product";
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

  get genres() {
    return Array.from(this.genresMusic);
  }

  constructor(private http: Http) {
  }

  generateMusic(music) {
    let newMusic = new Product();
    newMusic.id = music.id;
    newMusic.type = 'music';
    newMusic.name = music.name;
    newMusic.homepage = music.external_urls.spotify;
    newMusic.poster = music.images[1] ? music.images[0].url : this.pathNoImage;
    newMusic.price = (5.55).toFixed(2);
    if (music.genres) newMusic.genres = music.genres;
    if (music.label) newMusic.label = music.label;
    if (music.release_date) newMusic.release_date = music.release_date;
    if (music.artists) newMusic.artists = music.artists.map(artist => artist.name);
    if (music.popularity) newMusic.vote = music.popularity;
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
    params.set('type', 'album');
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

  getMusicsByGenre(genre) {
    let params = new URLSearchParams();
    params.set('q', `genre:"${genre}"`);
    params.set('type', 'artist');
    params.set('limit', '6');
    let option = new RequestOptions({search: params});
    return this.http.get(`${this.api_url}search`, option)
      .map(res => res.json().artists.items);
  }

}
