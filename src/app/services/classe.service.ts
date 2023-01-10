import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  SERVER_URL : string='http://localhost:3000';

  constructor(private httpClient : HttpClient ) { }

  public addClasse(classe:any){
    console.log("here in addClasse in service");
    
    return this.httpClient.post<{message:String}>(this.SERVER_URL + '/api/addClasse',classe)
  }
  public getClasses(){ 
    return this.httpClient.get<{classes : any}>(this.SERVER_URL + '/api/allClasses');
}
public getClasse(classeId :any){
  return this.httpClient.get <{classe : any}>(`${this.SERVER_URL + '/api/allClasses'}/${classeId}`); 
}


public deleteClasse(classeId:any){
  return this.httpClient.delete<{message:String}>(`${this.SERVER_URL + '/api/allClasses'}/${classeId}`)
}
public updateClasse(classe:any){
  return this.httpClient.put<{message:String}>(`${this.SERVER_URL + '/api/allClasses'}/${classe._id}`, classe)
}
public getMyClasses(idTrainer){
  return this.httpClient.get<{myClasses:any}>(`${this.SERVER_URL + '/api/myClasses'}/${idTrainer}`)
}
}

