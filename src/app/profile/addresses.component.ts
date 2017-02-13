import {Component, OnInit} from "@angular/core";
import {Auth} from "../shared/services/auth.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalWindowComponent} from "../shared/modal-window.component/modal-window.component";

@Component({
  moduleId: module.id,
  selector: 'profile-addresses',
  templateUrl: './addresses.component.html'
})

export class ProfileAddressesComponent implements OnInit {
  private addressesUser = [];

  constructor(private auth: Auth,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.addressesUser = this.auth.userProfile.addresses;
  }

  open() {
    this.modalService.open(ModalWindowComponent);
  }

}
