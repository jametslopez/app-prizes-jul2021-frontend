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
// import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { ErrorMsg } from '../shared/errorMsg';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, AfterViewInit {
  emailForm: FormGroup;
  errorMsg = new ErrorMsg();
  emailStyle: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute // private modalService: BsModalService
  ) {}

  ngAfterViewInit() {}
  ngOnInit() {
    console.log('footer');

    this.initForm();
  }
  // openModal(template: TemplateRef<any>, size = "lg") {
  //   let modalCss = { class: "modal-dialog-centered modal-" + size };
  //   this.modalRef = this.modalService.show(template, modalCss);
  // }
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
        '\nUh-oh, looks like an invalid email address was entered.';
      this.errorMsg.type = 'email';
      this.emailStyle = 'error-msg';
    } else {
      this.emailStyle = 'success-msg';
      // this.campaignCenterService.register(email).subscribe(
      //   (response) => {
      //     console.log(response);
      //     if (response.pubid) {
      //       console.log("Already a member");
      //       this.campaignCenterService.email = email;
      //       this.campaignCenterService.pubid = response.pubid;
      //       // this.campaignCenterService.memberAlready=true;
      //       // this.campaignCenterService.showFooter = false;
      //       // this.campaignCenterService.footerSecondary = true;

      //       this.loadingStyle = "displaynone";
      //       this.buttonDisabled = false;
      //       // entryOnly || uniqueCode || spentOnly
      //       if (
      //         this.campaignCenterService.campaignType === "uniqueCode" ||
      //         this.campaignCenterService.campaignType === "spentOnly"
      //       ) {
      //         this.router.navigate(["/entercode"], { relativeTo: this.route }); // use it when enter code or spend avaiable
      //       }
      //       if (this.campaignCenterService.campaignType === "entryOnly") {
      //         this.entryOnly(); // use it only enter and thank you page.
      //       }
      //     } else {
      //       console.log("Not a member yet");
      //       // window.location.href = '/register';
      //       this.campaignCenterService.email = email;
      //       // this.campaignCenterService. Secondary = true;
      //       // this.campaignCenterService.memberAlready=false;

      //       this.loadingStyle = "displaynone";
      //       this.buttonDisabled = false;
      //       this.router.navigate(["/register"], { relativeTo: this.route });
      //     }
      //   },
      //   (error) => {
      //     console.log(error);
      //     this.loadingStyle = "displaynone";
      //     this.buttonDisabled = false;
      //     this.openModal(this.serverErrorCode);
      //   },
      //   () => {
      //     console.log("completed");
      //   }
      // );
    }
  }
}
