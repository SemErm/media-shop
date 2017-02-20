import {Pipe, PipeTransform} from "@angular/core";
import {Auth} from "../services/auth.service";

@Pipe({name: 'currencyPrice'})
export class CurrencyPricePipe implements PipeTransform {
  private currency = {
    'dollar': {
      'value': 1,
      'sign': '$'
    },
    'ruble': {
      'value': 57.1507,
      'sign': 'ք'
    },
    'euro': {
      'value': 0.94,
      'sign': '€'
    }
  };

  constructor(private auth: Auth) {
  }

  transform(value: number): string {
    let currentCur = (this.auth.authenticated() && this.auth.userProfile)? this.auth.userProfile.currency : 'dollar';
    return ` ${(value * this.currency[currentCur].value).toFixed(2)} ${this.currency[currentCur].sign}`
  }
}
