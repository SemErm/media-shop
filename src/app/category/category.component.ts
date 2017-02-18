import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  moduleId: module.id,
  selector: 'category',
  templateUrl: 'category.component.html'
})

export class CategoryComponent implements OnInit {
  private category: string;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe((params: any) => {
        this.category = params.id;
      });
  }
}
