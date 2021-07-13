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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  emailForm: FormGroup;
  errorMsg = new ErrorMsg();
  emailStyle: string;

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
    console.log('Page Home');
    this.initForm(); 
  }
  openModal(template: TemplateRef<any>, size = "lg") {
    let modalCss = { class: "modal-dialog-centered modal-" + size };
    this.modalRef = this.modalService.show(template, modalCss);
  }
  private initForm() {
    this.emailForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          "^[a-zA-Z0-9_\\-.!#$%&*+-/=?^_{|}~']+@[a-zA-Z0-9\\-]+\\.[a-zA-Z0-9\\-.]+$"
        ),
        Validators.maxLength(250),
      ]),
    });
  }
  onSubmit(email: string) {
    this.errorMsg.message = '';
    if (this.emailForm.controls.email.status === 'INVALID') {
      this.errorMsg.valid = false;
      this.errorMsg.message +=
        '\nOops, parece que se ingresó una dirección de correo electrónico no válida.';
      this.errorMsg.type = 'email';
      this.emailStyle = 'error-msg';
    } else {
      this.emailStyle = 'success-msg';
    
      this.appprizesService.searchClient(email).subscribe(
        (response) => {
          console.log(response);
          if (response.data) {
            console.log('Client exist');
            this.appprizesService.firstname = response.data.firstname;
            this.appprizesService.email = response.data.email;
            this.router.navigate(["/codecupon"], { relativeTo: this.route });
          }else {
            console.log('Client new');
            this.router.navigate(["/register"], { relativeTo: this.route });
          }
        },
        (error) => {
          console.error(error);
          this.openModal(this.serverErrorCode, "sm");
        }
      );
    }
  }
}
