import {Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Auth} from "../../services/auth.service";

@Component({
  moduleId: module.id,
  selector: 'modal-window',
  templateUrl: 'modal-window.component.html'
})
export class ModalWindowComponent {
  private address = {};

  constructor(public activeModal: NgbActiveModal,
              private auth: Auth) {
  }

  addAddress() {
    this.auth.addAdreess(this.address);
    this.activeModal.dismiss('Close click');
  }
}
