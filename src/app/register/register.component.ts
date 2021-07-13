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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, AfterViewInit {
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
    console.log('Page Register');
    this.initForm();
  }
  openModal(template: TemplateRef<any>, size = 'lg') {
    let modalCss = { class: 'modal-dialog-centered modal-' + size };
    this.modalRef = this.modalService.show(template, modalCss);
  }
  private initForm() {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          "^[a-zA-Z0-9_\\-.!#$%&*+-/=?^_{|}~']+@[a-zA-Z0-9\\-]+\\.[a-zA-Z0-9\\-.]+$"
        ),
        Validators.maxLength(250),
      ]),
      mobile: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    let gotoSubmit = true;
    this.errorMsg.message = '';

    if (this.registerForm.controls.firstname.status === 'INVALID') {
      gotoSubmit = false;
      this.errorMsg.valid = false;
      this.errorMsg.message += '\nPor favor, ingrese su nombre';
      this.errorMsg.type = 'firstname';
      this.firstnameStyle = 'error-msg';
    } else {
      this.firstnameStyle = 'success-msg';
    }
    if (this.registerForm.controls.lastname.status === 'INVALID') {
      gotoSubmit = false;
      this.errorMsg.valid = false;
      this.errorMsg.message += '\nPor favor, ingrese su apellido.';
      this.errorMsg.type = 'lastname';
      this.lastnameStyle = 'error-msg';
    } else {
      this.lastnameStyle = 'success-msg';
    }
    if (this.registerForm.controls.email.status === 'INVALID') {
      gotoSubmit = false;
      this.errorMsg.valid = false;
      this.errorMsg.message += '\nPor favor, ingrese su email.';
      this.errorMsg.type = 'email';
      this.emailStyle = 'error-msg';
    } else {
      this.emailStyle = 'success-msg';
    }
    if (this.registerForm.controls.mobile.status === 'INVALID') {
      gotoSubmit = false;
      this.errorMsg.valid = false;
      this.errorMsg.message += '\nPor favor, ingrese su mobile.';
      this.errorMsg.type = 'mobile';
      this.mobileStyle = 'error-msg';
    } else {
      this.mobileStyle = 'success-msg';
    }
    if (this.registerForm.controls.address.status === 'INVALID') {
      gotoSubmit = false;
      this.errorMsg.valid = false;
      this.errorMsg.message += '\nPor favor, ingrese su dirección.';
      this.errorMsg.type = 'address';
      this.addressStyle = 'error-msg';
    } else {
      this.addressStyle = 'success-msg';
    }

    if (gotoSubmit) {
      console.log('gotoSubmit', gotoSubmit);

      this.appprizesService
        .registerClient(
          this.registerForm.controls.firstname.value,
          this.registerForm.controls.lastname.value,
          this.registerForm.controls.email.value,
          this.registerForm.controls.mobile.value,
          this.registerForm.controls.address.value
        )
        .subscribe(
          (response) => {
            console.log(response);
            if (response.status && response.data) {
              this.appprizesService.firstname = response.data.firstname;
              this.appprizesService.email = response.data.email;
              this.router.navigate(['/codecupon'], { relativeTo: this.route });
            } else {
              this.errorMsg.valid = false;
              this.errorMsg.message += '\n' + response.message;
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
