import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

const api_key = 'Bearer BQD3Ty6f28uKiewdms9SUIw9wx0ilAQ0NLRb_gnIX_VwHsu5lJ';
const api_url = 'https://api.spotify.com/v1';
const headers = new Headers({
  "Authorization": api_key
});
@Injectable()
export class MusicsService {

  constructor(private _http: Http) {
  }

  connect(){
    return this._http.get('https://accounts.spotify.com/authorize?client_id=2d40549cb60241aaa79db1c03c2c4c8c&response_type=code&redirect_uri=http://localhost:4200')
      .map(res=>res.json());
  }
  getNewReleases() {
    const countMusics = 6;
    let option = new RequestOptions({headers: headers});
    return this._http.get(api_url + '/search?type=album')
      .map(res => res.json());
  }

  getAlbum(id: number){
    return this._http.get(api_url+'/albums/'+id)
      .map(res=>res.json());
  }

}
