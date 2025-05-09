import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-user',
  imports: [RouterModule],
  templateUrl: './user.component.html'
})
export class UserComponent {
  title: string = 'Listado de usuarios';

// @Input() 
 users: User[] = [];

// @Output() 
idUserEventEmiter = new EventEmitter();
// @Output() 
selectUserEventEmiter = new EventEmitter();


constructor(
  private service: UserService,
  private sharingData: SharingDataService,
  private router: Router){

    if(this.router.getCurrentNavigation()?.extras.state){
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];

    }
    else{
      this.service.findAll().subscribe(users => this.users = users)
    }
  }

onRemoveUser(id: number) : void{
  this.sharingData.idUserEventEmiter.emit(id);
}

onSelectedUser(user: User): void{
  // this.sharingData.selectUserEventEmitter.emit(user);
  this.router.navigate(['/users/edit', user.id], {state: {user}});
}
}
