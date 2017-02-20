import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'confirmation',
  templateUrl: './confirmation.component.html'
})

export class ConfirmationComponent implements OnInit {
  @Input() order;
  private dateOrder;
  private options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

  constructor(public activeModal: NgbActiveModal,
              private router: Router) {
  }

  ngOnInit() {
    let date = new Date();
    let currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.dateOrder = new Date(currentDate.setDate(currentDate.getDate() + 14));
  }

  onClose() {
    this.activeModal.close('Close click');
    this.router.navigate(['/'])
  }
}
