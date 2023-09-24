
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent } from 'src/app/components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { LoginComponent } from './components/pages/login/login.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: 'about', component:AboutComponent},
   {path: 'login', component:LoginComponent},
   {path: 'callback', component:LoginComponent},
  // {path: 'moments/edit/:id', component:EditMomentComponent},
  // {path: 'moments/:id', component:MomentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
