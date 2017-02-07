import {Component, OnInit} from '@angular/core';
import {MusicsService} from '../../services/musics.service';

@Component({
  selector: 'musics',
  templateUrl: 'musics.component.html',
  styleUrls: ['./musics.component.css'],
  providers: [MusicsService]
})
export class MusicsComponent implements OnInit {
  private musics: Array<any>;

  constructor(private musicsService: MusicsService) {
  }

  ngOnInit() {
    this.musicsService.getNewReleases()
      .subscribe(musicsArray => {
        console.log(musicsArray);
        });
  }

}
