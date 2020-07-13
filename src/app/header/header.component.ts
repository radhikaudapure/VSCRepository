import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerMenuList = JSON.parse(localStorage.getItem('menus'));
  constructor(public router: Router,private loginService: LoginService) { }

  ngOnInit() {
    console.log(this.headerMenuList);
  }

  onChangeMenuClick(submenu){
    if (submenu.name === 'My Diaries'){
      this.router.navigateByUrl('home/my-diary');
    }else{
      this.router.navigateByUrl('home/under-construction');
    }
  }


  onLogoutClick(){
      this.router.navigateByUrl('/login');
      localStorage.removeItem('token');
      localStorage.removeItem('menus');
      localStorage.removeItem('userid');
  }
  

}
