import { Component, OnInit, ElementRef } from '@angular/core';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  menuList=[{"id":"1","name":"Diary Management","submenus":[{"id":"1","name":"My Diaries"},{"id":"2","name":"My Pending Approvals"},{"id":"3","name":"My Pending Submission"}]},{"id":"2","name":"Human Resource","submenus":[{"id":"1","name":"Manage Profile"},{"id":"2","name":"My Leaves"},{"id":"3","name":"My Holidays"},{"id":"4","name":"Personal Details"},{"id":"5","name":"Official Details"},{"id":"6","name":"CTC Details"}]},{"id":"3","name":"Organization Setup","submenus":[{"id":"1","name":"Conveyance Rates"},{"id":"2","name":"Standard Rates"},{"id":"3","name":"Branchwise Holidays"},{"id":"4","name":"Clients"},{"id":"5","name":"Company Configuration"},{"id":"6","name":"Article Stipend Master"}]},{"id":"4","name":"Management","submenus":[{"id":"1","name":"Manpower Budgeting"},{"id":"2","name":"Copy Budget"}]},{"id":"5","name":"Document Management","submenus":[{"id":"1","name":"Libraries"}]}]
  user = new User('', '');
  submitted = false;
  private loginObservable ;
  constructor(private loginService: LoginService, public router: Router, private elementRef: ElementRef,private http: HttpClient) { }

  ngOnInit() {
    localStorage.setItem('menus',JSON.stringify(this.menuList));
    this.elementRef.nativeElement.ownerDocument.body.style.background = 'linear-gradient(to right, #a1c4fd , #c2e9fb)';
  }

  // onLogin(){
  // console.log(this.user);
  // const headers = { 
  //   'Content-Type': 'application/json',
  //   // 'Access-Control-Expose-Headers':'Authorization, UserID'
  // };
  // const body = JSON.stringify(this.user);

  // this.http.post<any>('http://localhost:8080/ediary/users/login', body,{ headers: headers, observe: 'response' })
  // .subscribe(resp => {
  //   console.log(resp);
  //   // display its headers
  //   console.log(resp.headers)
  //   const keys = resp.headers.keys();
  //   console.log(keys)
  //   const headers1 = keys.map(key => `${key}: ${resp.headers.get(key)}`);
  //   console.log(headers1)
  //   // console.log(headers1.findIndex('authorization'));
  // })

  // }
  

  onLogin(){
    this.loginService.login(JSON.stringify(this.user)) 
    .subscribe(resp => {
      console.log(resp);
      console.log(resp.headers);
      console.log(resp.headers.get('authorization'));
      if(resp.headers.get('authorization')){
        localStorage.setItem('token',resp.headers.get('authorization'));
        localStorage.setItem('userid',resp.headers.get('userid'));
        this.router.navigateByUrl('home');
      }
     
    })
  }
  ngOnDestroy() {
    // this.loginObservable.unsubscribe();
  }

}
