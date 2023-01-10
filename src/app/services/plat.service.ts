
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatService {
  SERVER_URL : string='http://localhost:3000';

  constructor(private httpClient : HttpClient ) { }

  public addPlat(plat:any){
    console.log("here in addPlat in service");
    
    return this.httpClient.post<{message:String}>(this.SERVER_URL + '/api/addPlat',plat)
  }
  public getPlats(){ 
    return this.httpClient.get<{plats : any}>(this.SERVER_URL + '/api/allPlats');
}
public getPlat(platId :any){
  return this.httpClient.get <{plat : any}>(`${this.SERVER_URL + '/api/allPlats'}/${platId}`); 
}


public deletePlat(platId:any){
  return this.httpClient.delete<{message:String}>(`${this.SERVER_URL + '/api/allPlats'}/${platId}`)
}
public updatePlat(plat:any){
  return this.httpClient.put<{message:String}>(`${this.SERVER_URL + '/api/allPlats'}/${plat._id}`, plat)
}
public getMyPlats(idTrainer){
  return this.httpClient.get<{myPlats:any}>(`${this.SERVER_URL + '/api/myPlats'}/${idTrainer}`)
}
}
