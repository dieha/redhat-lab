import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NtDepositComponent } from './nt-deposit/nt-deposit.component';
import { NtRecordComponent } from './nt-record/nt-record.component';
import { NtTransferComponent } from './nt-transfer/nt-transfer.component';
import { NtTransferDoneComponent } from './nt-transfer-done/nt-transfer-done.component';
import { LayoutGuard } from './login/layout.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'deposit', component: NtDepositComponent ,canActivate:[LayoutGuard]},
  { path: 'record/:id', component: NtRecordComponent },
  { path: 'transfer', component: NtTransferComponent },
  { path: 'transfer/done/:id', component: NtTransferDoneComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
