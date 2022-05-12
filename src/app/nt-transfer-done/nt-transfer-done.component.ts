import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '@environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nt-transfer-done',
  templateUrl: './nt-transfer-done.component.html',
  styleUrls: ['./nt-transfer-done.component.css']
})
export class NtTransferDoneComponent implements OnInit {

  transferId:any;
  formAccountNo:any;
  toBankCode: any;
  toAccountNo: any;
  amount: any;
  transferDate:any;
  currency:any;
  status:any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }


  ngOnInit(): void {
    this.transferId = this.route.snapshot.paramMap.get('id');


    let token = localStorage.getItem('jwt');
    let headers = new HttpHeaders({
      'Authorization': token as string
    });
    let options = {
      headers,
      observe: 'response' as 'response'
    };
    this.http.get<any>(environment.ntservice + '/nt/tranfer/'+this.transferId, options).subscribe(res => {
      let response: HttpResponse<any> = res;

      this.formAccountNo=res.body.entity.formAccountNo;
      this.toBankCode=res.body.entity.toBankCode;
      this.toAccountNo=res.body.entity.toAccountNo;
      this.amount=res.body.entity.amount;
      this.transferDate=res.body.entity.transferDateS;
      this.currency=res.body.entity.currency;
      this.status=res.body.entity.status;
    

    }
    );
    
  }

}
