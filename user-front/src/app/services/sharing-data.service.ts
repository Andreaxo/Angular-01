import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newUserEventEmiter: EventEmitter<User> = new EventEmitter(); 
  private _idUserEventEmiter = new EventEmitter();
  private _selectUserEventEmiter = new EventEmitter();

  private _findUserByIdEventEmiter = new EventEmitter();



  constructor() { }

  get findUserByIdEventEmiter(){
    // return this._idUserEventEmiter;
    return this._findUserByIdEventEmiter;
  }


  get newUserEventEmitter(): EventEmitter<User>{
    // return this._idUserEventEmiter;
    return this._newUserEventEmiter;
  }

  get idUserEventEmiter(): EventEmitter<number>{
    return this._idUserEventEmiter;
  }

  get selectUserEventEmitter(): EventEmitter<User>{
    return this._selectUserEventEmiter
  }
}
