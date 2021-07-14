import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMsg } from '../shared/errorMsg';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppprizesService } from '../services/appprizes.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss'],
})
export class ThankyouComponent implements OnInit, AfterViewInit {
  registerForm: FormGroup;
  errorMsg = new ErrorMsg();
  firstnameStyle: string;
  lastnameStyle: string;
  emailStyle: string;
  mobileStyle: string;
  addressStyle: string;

  @ViewChild('serverErrorCode', { static: false })
  serverErrorCode: TemplateRef<any>;
  modalRef: BsModalRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public appprizesService: AppprizesService,
    private modalService: BsModalService
  ) {}

  ngAfterViewInit() {}
  ngOnInit() {
    console.log('Page Thankyou');
  }
  openModal(template: TemplateRef<any>, size = 'lg') {
    let modalCss = { class: 'modal-dialog-centered modal-' + size };
    this.modalRef = this.modalService.show(template, modalCss);
  }
  onFinish() {
    this.appprizesService.pubid = "";
    this.router.navigate(["/home"], { relativeTo: this.route });
  }
  newCodigo() {
    this.router.navigate(["/codecupon"], { relativeTo: this.route });
  }
}
