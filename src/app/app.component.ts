import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AppprizesService } from './services/appprizes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Fiestas Patrias';

  @ViewChild('serverErrorCode', { static: false })
  serverErrorCode: TemplateRef<any>;
  modalRef: BsModalRef;

  constructor(
    public appprizesService: AppprizesService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.loadCampaignSetting();
  }
  openModal(template: TemplateRef<any>, size = "lg") {
    let modalCss = { class: "modal-dialog-centered modal-" + size };
    this.modalRef = this.modalService.show(template, modalCss);
  }
  loadCampaignSetting() {
    this.appprizesService.loadCampaignSetting(1).subscribe(
      (response) => {
        console.log(response);
        if (response.status) {
          this.appprizesService.minimunAmount = response.data.minimun_amount;
        } else {
          this.openModal(this.serverErrorCode, 'sm');
        }
      },
      (error) => {
        console.error(error);
        // this.openModal(this.serverErrorCode);
      }
    );
  }
}
