import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any={};
  
  loginForm:FormGroup;
  findedUser:any;
  connectedUser:any={};
  connectedUser1:any={};
  
  title:string;
  constructor(private fb : FormBuilder, private router:Router ,private userService:UserService) { }

  ngOnInit() {
    this.connectedUser=JSON.parse(localStorage.getItem("connectedUser")||'[]');
    this.connectedUser1=JSON.parse(localStorage.getItem("connectedUser")||'[]');
    console.log("hello riadh")
  
    this.loginForm = this.fb.group({
      email : [''],
      password : [''],
    })
    this.connectedUser=JSON.parse(localStorage.getItem("connectedUser"||'[]'));
    if (this.connectedUser) {
      this.title='Welcome'+' '+this.connectedUser.firstName;
    } else {
      this.title='Welcome';
      
    }

  }
  login(){
    this.userService.login(this.user).subscribe(
      (data)=>{
        console.log("findedUser",data.findedUser);
        if (data.findedUser.role) {
          localStorage.setItem("connectedUser",JSON.stringify(data.findedUser))
          //redirection 
          switch (data.findedUser.role) {
                  case 'admin':
                    this.router.navigate(['dashboard-admin']);
                    
                    break;
                    case 'player':
                      this.router.navigate(['']);
                      
                      break;
                      case 'trainers':
                        this.router.navigate(['dashboard-trainers']);
                        
                        break;
                
                  default:
                    break;
                }
          
        }
      }
    )

  }
  logout(){
    
    localStorage.removeItem("connectedUser");
    // this.router.navigate(['']);

      //**********reload************
  let currentUrl = this.router.url;
  // routeReuseStrategy:ne pas détruire un composant, mais en fait de le sauvegarder -
  // pour un re-rendu à une date ultérieure.
  //*****mettre en cache */
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      //gerer une demande navigation vers l'url actuel
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);

  this.router.navigate(['']);
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    // routeReuseStrategy:ne pas détruire un composant, mais en fait de le sauvegarder -
    // pour un re-rendu à une date ultérieure.
    //*****mettre en cache */
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        //gerer une demande navigation vers l'url actuel
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
  
   }
  //   refresh(){
  //     this.router.navigate(['']);
  //     }

}
