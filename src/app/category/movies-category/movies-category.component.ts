import {Component, OnInit} from "@angular/core";
import {MoviesService} from "../../shared/services/movies.service";
import * as _ from 'lodash';
import {Router} from "@angular/router";

interface categoryGenre {
  id: number;
  name: string;
  movies: any[];
}

@Component({
  moduleId: module.id,
  selector: 'movies-category',
  templateUrl: 'movies-category.component.html'
})

export class MoviesCategoryComponent{
  private category = 'movies';

}
