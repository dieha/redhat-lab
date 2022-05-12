import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '@environment';
import { ActivatedRoute } from '@angular/router';
import { Transfer } from './Tranfer';

@Component({
  selector: 'app-nt-record',
  templateUrl: './nt-record.component.html',
  styleUrls: ['./nt-record.component.css']
})
export class NtRecordComponent implements OnInit {


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  accountNo: any;
  msg = '';

  displayedColumns: string[] = ['transferDate', 'withdraw', 'deposit'];
  dataSource: any;


  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {

    this.accountNo = this.route.snapshot.paramMap.get('id');

  }


  record() {
    if (this.range.invalid) {
      this.msg = '請填寫時間';
      return;
    }
    this.msg = '';
    let token = localStorage.getItem('jwt');
    let headers = new HttpHeaders({
      'Authorization': token as string
    });
    let body = {
      accountNo: this.accountNo,
      startDate: this.range.value.start,
      endDate: this.range.value.end
    };
    let options = {
      headers,
      observe: 'response' as 'response'
    };

    this.http.post<any>(environment.ntservice + '/nt/traded/record', body, options).subscribe(res => {
      console.log(res);
      let response: HttpResponse<any> = res;
      ;
      let list = [];

      for (let o of res.body.entity) {
        let t: Transfer = {
          "withdraw": null,
          "deposit": null,
          "transferDate": null
        };
        if (o.formAccountNo == this.accountNo) {
          t.withdraw = o.amount;
        } else if (o.toAccountNo == this.accountNo) {
          t.deposit = o.amount;
        }
        t.transferDate = o.transferDateS;
        list.push(t);
      }
      console.log(list)
      this.dataSource = list;
    }
    );


  }

}


