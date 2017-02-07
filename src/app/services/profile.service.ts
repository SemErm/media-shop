import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

  constructor(private _http: Http) {
  }

  getCurruntRate(){
    return this._http.get('https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDRUB%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
      .map(res=>res.json())
      .map(res=> res.query.results.rate.Rate);
  }
}
