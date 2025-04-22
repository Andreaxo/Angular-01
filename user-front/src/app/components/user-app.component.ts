import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2'
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import { NavbarComponent } from './navbar/navbar.component';
import { subscribeOn } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html'
})
export class UserAppComponent implements OnInit{
  title: string = 'Listado de usuarios';

  users: User[] = []; // Se define variable contenedora
  
  // userSelected: User;
  

  constructor(private router: Router, private service: UserService, private sharingData: SharingDataService){ // Se inicializa el servicio
    // this.userSelected =new User();  
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users)

    this.addUser();
    // this.setSelectedUser();
    this.removeUser();
    this.findUserById();
 }

  findUserById() {
    this.sharingData.findUserByIdEventEmiter.subscribe(id => {
      const user = this.users.find(user => user.id == id);

      this.sharingData.selectUserEventEmitter.emit(user);
    })
  }
 
 addUser(){
    this.sharingData.newUserEventEmitter.subscribe(user => {
      if(user.id > 0){
        // this.users = this.users.map(u => (u.id == user.id) ? { ...user}: u);
        this.service.update(user).subscribe(userUpdate =>{
          this.users = this.users.map(u => (u.id ==userUpdate.id ) ? {...userUpdate}: u)
          this.router.navigate(['/users'], {state: {users: this.users}})
        })
      } else {
        this.service.create(user).subscribe(userNew => {
          this.users =[...this.users, {...userNew}];
          this.router.navigate(['/users'], {state: {users: this.users}})
        })
      }
      this.router.navigate(['/users'], {state: {users: this.users}});
      Swal.fire({
        title: "Guardado -V.2!",
        text: "Ha sido guardado correctamente!",
        icon: "success"
      });
      
      // this.userSelected = new User(); 
    })
 }

 removeUser(): void{
  this.sharingData.idUserEventEmiter.subscribe(id =>{
    Swal.fire({
      icon: "success",
      title: "Será eliminado",
      text: "Something went wrong!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText:'Si',
      cancelButtonText:'No' 

    }).then((result) => {
     if(result.isConfirmed){
      this.service.remove(id).subscribe(() => {
        this.users = this.users.filter(user => user.id != id);
        this.router.navigate(['/users/create'], {skipLocationChange: true}).then(() => {
          this.router.navigate(['/users'], {state: {users: this.users}});
        })
        })
       
     Swal.fire({
         icon: "success",
         title: "Fue eliminado",
      text: "Something went wrong!",
       })
     }
    })
    })
  }
  

}
//   setSelectedUser(): void{
//     this.sharingData.selectUserEventEmitter.subscribe(userRow => this.userSelected = { ...userRow});

//   }
// }

