import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppprizesService {
  pubid: string;
  firstname: string;
  email: string;
  phone: number;

  apiUrl: string;
  apiAuthKey: string;
  campaignId: number;

  prizeInfo: string;
  minimunAmount: number;

  constructor(private http: HttpClient) {
    this.campaignId = 1;
    this.apiAuthKey =
      'ESDGAUDJHRGIUNIEHUIGDUGDOIJGOJ3240324938J29J8DFJF88F64HFXX0SF9U799N';
    this.apiUrl = 'http://127.0.0.1:8000/api/';
  }

  loadCampaignSetting(id) {
    const headers: HttpHeaders = new HttpHeaders({
      'X-Authorization-APP': this.apiAuthKey,
      'Content-Type': 'application/json',
    });
    const url = this.apiUrl + this.campaignId + '/settings';

    const httpObservable = this.http.get<any>(url, { headers });

    return httpObservable;
  }

  searchClient(email: string) {
    const headers: HttpHeaders = new HttpHeaders({
      'X-Authorization-APP': this.apiAuthKey,
      'Content-Type': 'application/json',
    });

    const url = this.apiUrl + this.campaignId + '/clients?email=' + email;

    const httpObservable = this.http.get<any>(url, { headers });

    return httpObservable;
  }

  registerClient(firstname, lastname, email, mobile, address) {
    const headers: HttpHeaders = new HttpHeaders({
      'X-Authorization-APP': this.apiAuthKey,
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const url = this.apiUrl + this.campaignId + '/clients';

    const params = new HttpParams()
      .set('firstname', firstname)
      .set('lastname', lastname)
      .set('email', email)
      .set('mobile', mobile)
      .set('address', address);

    const httpObservable = this.http.post<any>(url, params.toString(), {
      headers,
    });

    return httpObservable;
  }

  searchCodecupon(code) {
    const headers: HttpHeaders = new HttpHeaders({
      'X-Authorization-APP': this.apiAuthKey,
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const url = this.apiUrl + this.campaignId + '/coupons/search';

    const params = new HttpParams().set('code', code);

    const httpObservable = this.http.post<any>(url, params.toString(), {
      headers,
    });

    return httpObservable;
  }

  enterCodecupon(code) {
    const headers: HttpHeaders = new HttpHeaders({
      'X-Authorization-APP': this.apiAuthKey,
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const url = this.apiUrl + this.campaignId + '/coupons/use';

    const params = new HttpParams()
    .set('code', code)
    .set('firstname', this.firstname)
    .set('email', this.email);

    const httpObservable = this.http.post<any>(url, params.toString(), {
      headers,
    });

    return httpObservable;
  }

  // /*use when the unique code is available*/
  // uniqueCode(
  //   code1,
  //   outletId = null,
  //   purchaseAmount = null,
  //   photobase64 = '',
  //   getOutletInfo = false
  // ) {
  //   const centerIdSelected = JSON.parse(
  //     localStorage.getItem('centerIdSelected')
  //   );
  //   // console.log(code1);

  //   outletId = outletId ? outletId : '';
  //   purchaseAmount = purchaseAmount ? purchaseAmount : '';

  //   // console.log('On EnterCode page, lyOutletId = ' + lyOutletId);
  //   // console.log('On EnterCode page, purchaseAmount = ' + purchaseAmount);
  //   if (code1.toUpperCase() === 'FORESTWAY') {
  //     // getOutletInfo = false;
  //   }

  //   const headers: HttpHeaders = new HttpHeaders({
  //     'X-Authorization-APP': this.apiAuthKey,
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   });

  //   const url =
  //     this.apiUrl + this.campaignId + '/members/' + this.pubid + '/enter';

  //   const params = new HttpParams()
  //     .set('company_id', this.companyId)
  //     .set('crack_code', code1)
  //     .set('ly_outlet_id', outletId)
  //     .set('purchase_amount', purchaseAmount) // spent_range
  //     .set('receipt_image', photobase64)
  //     .set('entry_location', this.entryLocation)
  //     .set('get_outlet_info', getOutletInfo ? '1' : '0'); // getOutletInfo ? '1' :

  //   const httpObservable = this.http.post<DrawData>(url, params.toString(), {
  //     headers,
  //   });

  //   return httpObservable;
  // }
}
