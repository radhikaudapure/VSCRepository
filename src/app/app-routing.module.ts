import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MydiaryComponent } from './mydiary/mydiary.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';

const routes: Routes = [
  { path: 'login', component : LoginComponent},
 // { path: 'home', component : HomeComponent},
  // { path: 'my-diary', component : MydiaryComponent},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'my-diary', component: MydiaryComponent },
      { path: 'under-construction', component:UnderConstructionComponent },
    ]
  },
  {path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true , onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
