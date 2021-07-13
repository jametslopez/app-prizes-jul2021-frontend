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
  selector: 'app-codecupon',
  templateUrl: './codecupon.component.html',
  styleUrls: ['./codecupon.component.scss'],
})
export class CodecuponComponent implements OnInit, AfterViewInit {
  codecuponForm: FormGroup;
  errorMsg = new ErrorMsg();
  codeStyle: string;
  messageCodeInvalidOrUsed: string;

  @ViewChild('serverErrorCode', { static: false })
  serverErrorCode: TemplateRef<any>;
  @ViewChild('templateCodeInvalidOrUsed', { static: false })
  templateCodeInvalidOrUsed: TemplateRef<any>;

  modalRef: BsModalRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public appprizesService: AppprizesService,
    private modalService: BsModalService
  ) {}

  ngAfterViewInit() {}
  ngOnInit() {
    console.log('Page Register');
    this.initForm();
  }
  openModal(template: TemplateRef<any>, size = 'lg') {
    let modalCss = { class: 'modal-dialog-centered modal-' + size };
    this.modalRef = this.modalService.show(template, modalCss);
  }
  private initForm() {
    this.codecuponForm = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.maxLength(4),
        Validators.minLength(4),
      ]),
    });
  }
  onSubmit() {
    let gotoSubmit = true;
    this.errorMsg.message = '';

    if (this.codecuponForm.controls.code.status === 'INVALID') {
      gotoSubmit = false;
      this.errorMsg.valid = false;
      this.errorMsg.message += '\nPor favor, ingrese su código';
      this.errorMsg.type = 'code';
      this.codeStyle = 'error-msg';
    } else {
      this.codeStyle = 'success-msg';
    }

    if (gotoSubmit) {
      console.log('gotoSubmit', gotoSubmit);

      this.appprizesService
        .searchCodecupon(this.codecuponForm.controls.code.value)
        .subscribe(
          (response) => {
            console.log(response);
            // Code to use
            if (response.response) {
              this.appprizesService
                .enterCodecupon(this.codecuponForm.controls.code.value)
                .subscribe(
                  (response) => {
                    console.log(response);
                    // winner
                    if (response.response) {
                      this.router.navigate(['/winner'], {
                        relativeTo: this.route,
                      });
                    }
                    // thankyou
                    else {
                      this.router.navigate(['/thankyou'], {
                        relativeTo: this.route,
                      });
                    }
                  },
                  (error) => {
                    console.error(error);
                    this.openModal(this.serverErrorCode, 'sm');
                  }
                );
            }
            // Code invalid or used
            else {
              this.messageCodeInvalidOrUsed = response.message;
              this.openModal(this.templateCodeInvalidOrUsed, 'sm');
            }
          },
          (error) => {
            console.error(error);
            this.openModal(this.serverErrorCode, 'sm');
          }
        );
    }
  }
}
