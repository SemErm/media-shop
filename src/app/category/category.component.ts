import {Component, OnInit, EventEmitter, Output} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'category',
  templateUrl: 'category.component.html'
})

export class CategoryComponent implements OnInit {
  private category: string;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params
      .subscribe((params: any) => {
        this.category = params.category;
      });
  }
}
