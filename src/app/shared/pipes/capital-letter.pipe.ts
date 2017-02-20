import {Pipe, PipeTransform} from "@angular/core";
import * as _ from 'lodash';

@Pipe({name: 'capitalLetter'})
export class CapitalLetterPipe implements PipeTransform {

  transform(value: number): string {
    return _.upperFirst(value);
  }
}
