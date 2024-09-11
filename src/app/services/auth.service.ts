import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogged() {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem('user')
      if(data!==null){
        return true
      }
      // const user = JSON.parse(data!)
      // return data!==null
    }
    return false
  }

}
