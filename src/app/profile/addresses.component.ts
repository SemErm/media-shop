import { Component, OnInit } from "@angular/core";
import { Auth } from "../shared/services/auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalWindowComponent } from "../shared/components/modal-window.component/modal-window.component";

@Component({
  moduleId: module.id,
  selector: 'profile-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})

export class ProfileAddressesComponent implements OnInit {
  private addressesUser = [];

  constructor(private auth: Auth,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.auth.auth
      .subscribe(() => {
        this.addressesUser = this.auth.userProfile.addresses;
      });
    if (this.auth.userProfile) this.addressesUser = this.auth.userProfile.addresses;
  }

  open() {
    this.modalService.open(ModalWindowComponent);
  }

  removeAddress(item) {
    this.auth.removeAddress(item);
    this.addressesUser = this.auth.userProfile.addresses;
  }

}
