import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  public indexInfo: number;
  public checkInfo: boolean = false;
  users: Array<any>;

  
 
  constructor(public UsersService: UsersService){
    this.indexInfo = UsersService.i;
    this.checkInfo = UsersService.checkInfo;
  }

  cl(){
     console.log(this.indexInfo);
  }

  

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem('USERS'));
    console.log(this.users);
    console.log(this.checkInfo);
    
  }
  


  

}
