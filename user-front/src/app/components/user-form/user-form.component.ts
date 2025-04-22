import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule, NgForm } from '@angular/forms';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit{

  // @Input() 
  user: User; // Objeto global

  // @Output() 
  newUserEventEmiter: EventEmitter<User> = new EventEmitter(); // Se crea el objeto para emitir el evento al padre.
 
  constructor(private sharingData: SharingDataService, private route: ActivatedRoute, 
                      private service: UserService
  ){
    this.user = new User();

    // if(this.router.getCurrentNavigation()?.extras.state){
    //   this.user = this.router.getCurrentNavigation()?.extras.state!['user'];
    // }else{
    //   this.user = new User();
    // }
  }

  ngOnInit(): void {
    // this.sharingData.selectUserEventEmitter.subscribe(user => this.user = user);

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');

      if(id > 0){
        this.service.findById(id).subscribe(user => this.user = user );
        // this.sharingData.findUserByIdEventEmiter.emit(id);
      }
    });
  }

  
  onSubmit(userForm: NgForm): void{

    if(userForm.valid){
      this.sharingData.newUserEventEmitter.emit(this.user); // Se llama el objeto y se emite el objeto al usuario.
      console.log(this.user);
    }
    
    userForm.reset();
    userForm.resetForm(); //Limpia los formularios.
    }


    onClear(userForm: NgForm): void {
      this.user = new User();
      userForm.reset();
      userForm.resetForm();

    }
}


