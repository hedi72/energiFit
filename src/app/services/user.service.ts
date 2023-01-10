import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // SERVER_URL: string = "http://localhost:8080/api/";
  SERVER_URL: string = "http://localhost:3000";
  constructor(private httpClient:HttpClient) { }

public getUsers(){ 
    return this.httpClient.get<{users : any}>(this.SERVER_URL + '/api/allUsers');
}
public getUser(userId){
  return this.httpClient.get <{user : any}>(`${this.SERVER_URL + '/api/allUsers'}/${userId}`); 
}
public createUser(user: any){
  return this.httpClient.post <{message:String}>(`${this.SERVER_URL + '/api/createUser'}`, user)
}
public login(user:any){
  return this.httpClient.post<{findedUser:any}>(this.SERVER_URL + '/api/login',user); 
}
public searchChef(chef:any){
  return this.httpClient.post<{chefs:any}>(this.SERVER_URL + '/api/searchChef',chef); 
}
public deleteUser(userId){
  return this.httpClient.delete<{message:String}>(`${this.SERVER_URL + '/api/allUsers'}/${userId}`)
}
public updateUser(user:any){
  return this.httpClient.put<{message : String}>(`${this.SERVER_URL + '/api/allUsers'}/${user._id}`, user)
}
}

