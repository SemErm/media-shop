import {Component, OnInit} from "@angular/core";
import {MusicsService} from "../../shared/services/musics.service";
import * as _ from "lodash";
@Component({
  moduleId: module.id,
  selector: 'musics-home-page',
  templateUrl: './musics-home-page.component.html'
})

export class MusicsHomePageComponent implements OnInit {
  private newReleasesMusics = [];
  private randomGenres = [];

  constructor(private musicsService: MusicsService) {
  }

  setRandomGenres() {
    const numberGenres = 3;
    let tmpGenres = this.musicsService.genres;
    for (let i = 0; i < numberGenres; i++) {
      let random = _.random(0, tmpGenres.length - 1);
      let newSectionGenre: any = {};
      newSectionGenre['name'] = tmpGenres[random];
      this.musicsService.getMusicsByGenre(newSectionGenre.name)
        .subscribe(res => {
          newSectionGenre.musics = res.map(music => {
            return this.musicsService.generateMusic(music)
          });
          this.randomGenres.push(newSectionGenre);
          tmpGenres = _.remove(tmpGenres, (item) => {
            return _.last(this.randomGenres) !== item.name;
          });
        });
    }
  }

  ngOnInit() {
    this.musicsService.getNewReleases()
      .subscribe(musics => {
        this.setRandomGenres();
        this.newReleasesMusics = musics.map(music => {
          return this.musicsService.generateMusic(music)
        })
      });
  }

}
