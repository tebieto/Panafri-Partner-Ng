import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { File as IonicFileService } from '@ionic-native/file/ngx';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

}