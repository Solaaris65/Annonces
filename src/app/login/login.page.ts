import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login : string;
  password : string ;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  show()
  {
    if( this.login == this.password)
    {
      this.router.navigate(['/home']);
    }

    else
    {
      this.router.navigate(['/login']);
    }
  }

}
