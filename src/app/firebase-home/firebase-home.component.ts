import { iUser, Users } from './user.model';
import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { log } from 'util';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-firebase-home',
  templateUrl: './firebase-home.component.html',
  styleUrls: ['./firebase-home.component.css']
})
export class FirebaseHomeComponent implements OnInit {

 

  model : iUser
  userRef: AngularFirestoreCollection<iUser>
  user: Observable<iUser[]>
  users
  constructor(public db: AngularFirestore) { 

  }

  ngOnInit() {

    this.userRef = this.db.collection<iUser>('Users')
    this.model={
      NAME: '',
      LASTNAME: '',
      USERID: this.db.createId()
    }
    this.user = this.userRef.valueChanges() 
  }


  clickSave(){
    this.addUser(this.model)
  }

  addUser(data){
   /*  this.model.USERID = this.db.createId() */
   console.log(data)
    this.userRef.add(data)
  }
  deleteUser(id){
    console.log(id)
    //  this.userRef.doc(id).delete()
    this.db
  }

  showUsers(){
     this.userRef.valueChanges().subscribe(res=>{
        return res
      })
  }

}


 /*    this.user = this.db.collection('Users').valueChanges().subscribe(res=>{
      console.log(res)
    }) */

/* 
    this.model.USERID = this.db.createId()
    this.model.NAME = 'Saiyavong'
    this.model.LASTNAME = 'MITTHASONE' */

 
/*     this.db.collection('Users').add(this.model)
      .then(res=>{
          console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
 */

