import {Component, OnInit} from '@angular/core';
import {MusicsService} from '../../services/musics.service';

@Component({
  selector: 'musics',
  templateUrl: 'musics.component.html',
  styleUrls: ['./musics.component.css'],
  providers: [MusicsService]
})
export class MusicsComponent implements OnInit {
  private musics: any[];

  constructor(private musicsService: MusicsService) {
  }

  ngOnInit() {
    this.musicsService.getPopularMusics()
      .subscribe(musicsArray => {
        console.log(musicsArray);
        });
  }

}
