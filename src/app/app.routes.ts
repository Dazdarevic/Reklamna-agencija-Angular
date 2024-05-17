import { Routes } from '@angular/router';
import { HomepageComponent } from './components/home/homepage/homepage.component';
import { LoginComponent } from './components/home/login/login.component';
import { SignupComponent } from './components/home/signup/signup.component';
import { MyProfileComponent } from './components/myprofile/myprofile.component';
import { RequestForRegComponent } from './components/admin/request-for-reg/request-for-reg.component';
import { PanoiComponent } from './components/admin/panoi/panoi.component';
import { ListapanoaComponent } from './components/admin/listapanoa/listapanoa.component';
import { ReklamnipanoComponent } from './components/klijent/reklamnipano/reklamnipano.component';
import { MojeReklameComponent } from './components/klijent/moje-reklame/moje-reklame.component';
import { RequestForAdsComponent } from './components/admin/request-for-ads/request-for-ads.component';
import { SvereklameComponent } from './components/posetilac/svereklame/svereklame.component';
import { AdminFaktureComponent } from './components/admin/admin-fakture/admin-fakture.component';
import { KlijentFaktureComponent } from './components/klijent/klijent-fakture/klijent-fakture.component';

export const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'myprofile', component: MyProfileComponent },
  { path: 'request-for-reg', component: RequestForRegComponent },
  { path: 'panoi', component: PanoiComponent },
  { path: 'listapanoa', component: ListapanoaComponent },
  { path: 'reklamnipano', component: ReklamnipanoComponent }, //
  { path: 'moje-reklame', component: MojeReklameComponent }, //
  { path: 'request-for-ads', component: RequestForAdsComponent }, //
  { path: 'svereklame', component: SvereklameComponent },//
  { path: 'admin-fakture', component: AdminFaktureComponent }, //
  { path: 'klijent-fakture', component: KlijentFaktureComponent }, //
  { path: '**', component: HomepageComponent }, //

];
