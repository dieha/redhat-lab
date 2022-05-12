import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '@environment';

@Component({
  selector: 'app-nt-deposit',
  templateUrl: './nt-deposit.component.html',
  styleUrls: ['./nt-deposit.component.css']
})
export class NtDepositComponent implements OnInit {

  constructor( private http: HttpClient) { }

  displayedColumns: string[] = ['accountNo', 'amount'];
  dataSource = []
accountNo:any;

  ngOnInit(): void {

    let token = localStorage.getItem('jwt');
    let headers = new HttpHeaders({
      'Authorization': token as string
    });
    let body = {
      accountId: localStorage.getItem('accountId'),
      account: localStorage.getItem('account'),
    };
    let options = {
      headers,
      observe: 'response' as 'response'
    };

    this.http.post<any>(environment.ntservice + '/nt/balance',body, options).subscribe(res => {
      console.log(res);
      let response: HttpResponse<any> = res;
      this.dataSource = res.body.entity;
      this.accountNo=res.body.entity[0].accountNo;

    }
    );
  }

}
