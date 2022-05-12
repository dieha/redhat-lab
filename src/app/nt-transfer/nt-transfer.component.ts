import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '@environment';
@Component({
  selector: 'app-nt-transfer',
  templateUrl: './nt-transfer.component.html',
  styleUrls: ['./nt-transfer.component.css']
})
export class NtTransferComponent implements OnInit {

  msg: string = '';
  accountNo=[''];
  bankCode=[];

  transferForm:any;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.accountNo=[''];

    this.transferForm = this.fb.group({
      formAccountNo: [null,[Validators.required,Validators.maxLength(12)]],
      toBankCode: [null,[Validators.required,Validators.maxLength(3)]],
      toAccountNo: [null,[Validators.required,Validators.maxLength(12)]],
      amount: [null,[Validators.required,Validators.maxLength(14)]],
      transferDate:[null,[Validators.required]]
  
    });



    let token = localStorage.getItem('jwt');
    let headers = new HttpHeaders({
      'Authorization': token as string
    });
    let options = {
      headers
    };
    this.http.get<any>(environment.ntservice + '/bankCode', options).subscribe(res => {
      console.log(res);
      let response: HttpResponse<any> = res;
      
    }
    );
    

  }

  transfer(){

    let token = localStorage.getItem('jwt');
    let headers = new HttpHeaders({
      'Authorization': token as string
    });
    let options = {
      headers,
      observe: 'response' as 'response'
    };

    let body = {
      formAccountNo: this.transferForm.get('formAccountNo')?.value,
      toBankCode: this.transferForm.get('toBankCode')?.value,
      toAccountNo:this.transferForm.get('toAccountNo')?.value,
      currency:'NT',
      amount:this.transferForm.get('amount')?.value,
      transferDateS:this.transferForm.get('transferDate')?.value

    };
    console.log(body);
    this.http.post<any>(environment.ntservice + '/nt/tranfer', body, options).subscribe(res => {
      let response: HttpResponse<any> = res;
      console.log(res.body);
      this.msg = res.body.returnMsg;
      if (res.body.returnCode == '200') {
        this.router.navigateByUrl('/transfer/done/'+res.body.entity.transferId);
      }

    }

    );



  }

  get transferFormC() {
    return this.transferForm.controls;
  }

}

