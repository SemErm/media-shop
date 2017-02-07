import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'section-games',
  templateUrl: './section-games.component.html',
  styleUrls: ['./section-games.component.css']
})
export class SectionGamesComponent {
  private pathImage = 'https://images.igdb.com/igdb/image/upload/t_cover_big/';
  private pathNoImage = '../../../../no-image.png';
  @Input() games;
  @Input() title;

  constructor(private router: Router){}

  goToDetail(game: any) {
    this.router.navigate(['games/detail', game.id]);
  }
}
