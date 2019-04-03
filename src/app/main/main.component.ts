import { Component, OnInit, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  newArr:any = [];
  edArr: any = [];
  parseJ: any[];
  parseJN: any[];
  del: any = [];
  check: boolean = false;
  edit: number;
  editS: number;
  checkInfo:boolean = false;
  checkSearch:boolean = false;
  dynamic: any;
  dynamicS: Array<any> = [];
  usersSearch: Array<any> = []; 
  firstLast: string = '';
  lastFirst: string = '';
  noCopy: Array<any> = [];
  noCopyCheck: boolean = true;
  firstLastCheck: boolean = true;
  alertAdd: boolean = false;
  valueImitation: Array<any> = [];
  space: boolean = true;
  checkAuditSearch: boolean = false;
  checkReplica: boolean = false;

  private modalRef: BsModalRef;

  public users: Array<any>;

  

  constructor(
    private modalService: BsModalService,
    public usersService: UsersService
    ) {
      if(!localStorage.getItem('USERS')){
        usersService.getUsers()
        .subscribe(users => this.users = users);
      }

      if(localStorage.getItem('USERS')) this.checkAuditSearch = true;
      else this.checkAuditSearch = false;
     }

     

  searchContact(value){

   this.space = true;
   this.valueImitation = [];

   value = value.split('');

   for(let i=0; i<value.length; i++){
     if(value[i]==' ') value[i]='delMePlease'
   }

   for(let i=0; i<value.length; i++){
    if(value[i]!=='delMePlease'){
      this.valueImitation.push(value[i])
    }
  }

   value = this.valueImitation.join('');
    if(value==''){
      this.checkSearch = false;
    }
    else{
      this.checkSearch = true;
      
      this.dynamicS = [];
      this.dynamic = [];
      this.usersSearch = [];
      this.noCopy = [];
      this.noCopyCheck = true;
      this.firstLast = '';
      this.lastFirst = '';

      

      
      console.log(`VALUE - ${value}`)


      //FIRSTNAME
      for(let i=0; i<this.users.length; i++){
        this.dynamicS = [];
        for(let a=0; a<value.split('').length; a++){
          if(this.users[i].firstName.split('')[a]!=undefined) {
            this.dynamicS.push(this.users[i].firstName.split('')[a])
          }
        }
        this.dynamic = this.dynamicS;

        

        
        console.log(this.dynamic);
        if(value.toLowerCase()==this.dynamic.join('').toLowerCase()){
          this.usersSearch.push(this.users[i]);
          this.noCopy.push(i);
          console.log(`noCopy - ${this.noCopy}`)
        }
        
      }



      //LASTNAME
      for(let i=0; i<this.users.length; i++){
        this.dynamicS = [];
        for(let a=0; a<value.split('').length; a++){
          if(this.users[i].lastName.split('')[a]!=undefined) {
            this.dynamicS.push(this.users[i].lastName.split('')[a])
          }
        }
        this.dynamic = this.dynamicS;
        this.noCopyCheck = true;

        if(value.toLowerCase()==this.dynamic.join('').toLowerCase()) {
          if(this.noCopy!=[]){
            for(let c=0; c<this.noCopy.length; c++){
              if(i==this.noCopy[c]){
                this.noCopyCheck = false;
              }
            }
          }
          if(this.noCopyCheck){
          this.usersSearch.push(this.users[i]);
          console.log('LASTNAME WORKING1')
          }
        }
        
      }




      //FLLFNAME
      
    if(this.usersSearch.length==0){
      for(let i=0; i<this.users.length; i++){
        this.dynamicS = [];
        this.firstLast = this.users[i].firstName + this.users[i].lastName;
        
        this.firstLastCheck=true;
        console.log(this.firstLast);
        for(let a=0; a<value.split('').length; a++){
          if(this.firstLast.split('')[a]!=undefined) {
            this.dynamicS.push(this.firstLast.split('')[a])
          }
        }
        this.dynamic = this.dynamicS;
        console.log(this.dynamic);

        
        console.log(`THIS.DYNAMIC - ${this.dynamic}`)
        

        if(value.toLowerCase()==this.dynamic.join('').toLowerCase() && this.usersSearch.length==0){
          this.usersSearch.push(this.users[i]);
          this.firstLastCheck=false;
          console.log('firstLast WORKING1')
        }

        if(this.firstLastCheck){
          this.dynamicS=[];
          this.lastFirst = this.users[i].lastName + this.users[i].firstName;
        for(let a=0; a<value.split('').length; a++){
          if(this.lastFirst.split('')[a]!=undefined) {
            this.dynamicS.push(this.lastFirst.split('')[a])
          }
        }
        this.dynamic = this.dynamicS;
        console.log(this.dynamic);

        
        console.log(`THIS.DYNAMIC-IMPORTANT - ${this.dynamic}`)
        

        if(value.toLowerCase()==this.dynamic.join('').toLowerCase()){
          this.usersSearch.push(this.users[i]);
          console.log('LASTfIRST WORKING1')
          
        }

      }
        
        
      }
    }

     

      


      if(this.usersSearch.length>0) {
        console.log(`search: ${this.usersSearch[0].lastName}`);
      }
        
    }
  
}


   editI(contact, boolean){
     if(this.checkSearch==true){
     this.usersService.i = this.usersSearch[contact].count;
     }
     else{
      this.usersService.i = contact;
     }
     this.usersService.checkInfo = boolean;
     console.log(this.usersService.checkInfo);
   }
   

  ngOnInit() {
    if(localStorage.getItem('USERS')){
      this.users = JSON.parse(localStorage.getItem('USERS'));
    }
  }

  public openModal(template) {
    this.modalRef = this.modalService.show(template);
  }

  delContact(index){
    if(this.checkSearch){
      this.del = JSON.parse(localStorage.getItem('USERS'));
    this.del.splice(this.usersSearch[index].count, 1);
    localStorage.setItem('USERS',  JSON.stringify(this.del));
    this.users = JSON.parse(localStorage.getItem('USERS'));

    this.usersSearch.splice(index, 1);

    this.parseJN = JSON.parse(localStorage.getItem('USERS'));
    for(let a=0; a<this.parseJN.length; a++){
      this.parseJN[a].count = a;
    }
    localStorage.setItem('USERS',  JSON.stringify(this.parseJN));
    this.users = JSON.parse(localStorage.getItem('USERS'));
    }
    else{
    this.del = JSON.parse(localStorage.getItem('USERS'));
    this.del.splice(index, 1);
    localStorage.setItem('USERS',  JSON.stringify(this.del));
    this.users = JSON.parse(localStorage.getItem('USERS'));

   
        this.parseJN = JSON.parse(localStorage.getItem('USERS'));
        for(let a=0; a<this.parseJN.length; a++){
          this.parseJN[a].count = a;
        }
        localStorage.setItem('USERS',  JSON.stringify(this.parseJN));
        this.users = JSON.parse(localStorage.getItem('USERS'));
  }

  if(localStorage.getItem('USERS')) this.checkAuditSearch = true;
      else this.checkAuditSearch = false;

  if(JSON.parse(localStorage.getItem('USERS')).length==0){
    this.checkAuditSearch = false;
    localStorage.removeItem("USERS");
  }
}

 

  editContact(fN, sN, num, city, age, photoLink){

    this.checkReplica=false;

    if(fN && sN && num && city && age && photoLink !='' && ' '){

    
      for(let l=0; l<JSON.parse(localStorage.getItem('USERS')).length; l++){
        if(this.edit!=l){
        if(fN==JSON.parse(localStorage.getItem('USERS'))[l].firstName 
        && sN==JSON.parse(localStorage.getItem('USERS'))[l].lastName
        || num==JSON.parse(localStorage.getItem('USERS'))[l].number){
          this.checkReplica=true;
          }
        }
      }

      if(!this.checkReplica){

    this.edArr = JSON.parse(localStorage.getItem('USERS'));
    this.edArr[this.edit].firstName = fN;
    this.edArr[this.edit].lastName = sN;
    this.edArr[this.edit].number = num;
    this.edArr[this.edit].city = city;
    this.edArr[this.edit].age = age;
    this.edArr[this.edit].photo = photoLink;
    localStorage.setItem('USERS',  JSON.stringify(this.edArr));
    this.users = JSON.parse(localStorage.getItem('USERS'));
    this.alertAdd = false;
    this.checkReplica=false;
   this.modalRef.hide();
      }

      else{
        this.alertAdd = true;
      }
  }

  else{
    this.checkReplica=false;
    this.alertAdd = true;
  }
}

editContactS(fN, sN, num, city, age, photoLink){

  this.checkReplica=false;

  if(fN && sN && num && city && age && photoLink !='' && ' '){

    for(let l=0; l<JSON.parse(localStorage.getItem('USERS')).length; l++){
      if(this.editS!=l){
      if(fN==JSON.parse(localStorage.getItem('USERS'))[l].firstName 
      && sN==JSON.parse(localStorage.getItem('USERS'))[l].lastName
      || num==JSON.parse(localStorage.getItem('USERS'))[l].number){
        this.checkReplica=true;
        }
      }
    }

    if(!this.checkReplica){

    this.usersSearch[this.editS].firstName = fN;
    this.usersSearch[this.editS].lastName = sN;
    this.usersSearch[this.editS].number = num;
    this.usersSearch[this.editS].city = city;
    this.usersSearch[this.editS].age = age;
    this.usersSearch[this.editS].photo = photoLink;


    this.edArr = JSON.parse(localStorage.getItem('USERS'));
    this.edArr[this.usersSearch[this.editS].count].firstName = fN;
    this.edArr[this.usersSearch[this.editS].count].lastName = sN;
    this.edArr[this.usersSearch[this.editS].count].number = num;
    this.edArr[this.usersSearch[this.editS].count].city = city;
    this.edArr[this.usersSearch[this.editS].count].age = age;
    this.edArr[this.usersSearch[this.editS].count].photo = photoLink;
    localStorage.setItem('USERS',  JSON.stringify(this.edArr));
    this.users = JSON.parse(localStorage.getItem('USERS'));

    this.alertAdd = false;
    this.checkReplica=false;
   this.modalRef.hide();
  }

  else{
    this.alertAdd = true;
  }

}


else{
  this.checkReplica=false;
  this.alertAdd = true;
  }
}

  addLS(fN, sN, num, city, age, photoLink){

    this.checkReplica=false;
    if(fN && sN && num && city && age && photoLink !='' && ' '){

    

      if(!localStorage.getItem('USERS') && JSON.parse(localStorage.getItem('USERS'))!=[]){
        this.newArr = [{count: 0,firstName: fN, lastName: sN, number: num, city: city, age: age, photo: photoLink}];
       localStorage.setItem('USERS',  JSON.stringify(this.newArr));
       }
       else{

        for(let l=0; l<JSON.parse(localStorage.getItem('USERS')).length; l++){
          if(fN==JSON.parse(localStorage.getItem('USERS'))[l].firstName 
          && sN==JSON.parse(localStorage.getItem('USERS'))[l].lastName
          || num==JSON.parse(localStorage.getItem('USERS'))[l].number){
            this.checkReplica=true;
          }
        }

        if(!this.checkReplica){
          this.newArr = {count: JSON.parse(localStorage.getItem('USERS')).length, firstName: fN, lastName: sN, 
          number: num, city: city, 
          age: age, photo: photoLink};
          this.parseJ = JSON.parse(localStorage.getItem('USERS'));
          this.parseJ.push(this.newArr);
          localStorage.setItem('USERS',  JSON.stringify(this.parseJ));
        }
       }

       if(!this.checkReplica){
      
       this.users = JSON.parse(localStorage.getItem('USERS'));

       if(localStorage.getItem('USERS')) this.checkAuditSearch = true;
       else this.checkAuditSearch = false;

       this.alertAdd = false;
       this.checkReplica=false;
      this.modalRef.hide();

       }
       else{
        
        this.alertAdd = true;
       }
       
    }

    else{
         this.checkReplica=false;
         this.alertAdd = true;
    }
  } 

  alertDel(){
    this.alertAdd = false;
  }
}

