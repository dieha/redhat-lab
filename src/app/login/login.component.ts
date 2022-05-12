import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '@environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg: string = '';
  

  loginForm=this.fb.group({
    identity: [null, [Validators.required, Validators.pattern('[A-Z][1-2]\\d{8}$')]],
    account: [null, [Validators.required]],
    password: [null, [Validators.required]],
    capCode: [null, [Validators.required]]
  });
  
  get identity(): FormControl {
    return this.loginForm.get('identity') as FormControl;
  }
  get account(): FormControl {
    return this.loginForm.get('account') as FormControl;
  }
  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
  get capCode(): FormControl {
    return this.loginForm.get('capCode') as FormControl;
  }

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    // localStorage.removeItem('account');
    // localStorage.removeItem('accountId');
    // localStorage.removeItem('jwt');

  }

  getErrorMessage(formControl: FormControl): string {
       
    let errorMessage: string = '';
    if (!formControl.errors || formControl.pristine) {
    } else if (formControl.errors['required']) {
      errorMessage = '此欄位必填';
    } else if (formControl.errors['pattern']) {
      errorMessage = '格式有誤，請重新輸入';
    }
    return errorMessage;
  }
  
  login() {

    if (this.loginForm.invalid) {
        this.msg = '請填寫';
      return;
    }
    let msg = '';

    let body = {
      identity: this.loginForm.get('identity')?.value,
      account: this.loginForm.get('account')?.value,
      password: btoa(this.loginForm.get('password')?.value)
    };
    let options = {
      observe: 'response' as 'response'
    };

    this.http.post<any>(environment.loginservice + '/login', body, options).subscribe(res => {
      let response: HttpResponse<any> = res;
      console.log(res.body);
      this.msg = res.body.returnMsg;
      if (res.body.entity != null) {
        localStorage.setItem('account', this.loginForm.get('account')?.value);
        localStorage.setItem('accountId', res.body.entity.accountId);
        localStorage.setItem('jwt', res.body.entity.token);
        this.router.navigateByUrl('/deposit');
      }
    }

    );


  }


}
