import { Injectable } from '@angular/core';
import { AppAPI } from './app-api';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MydiaryService {
  appApi= new AppAPI();
  httpOptions={};
  // httpOptions = {
  //     headers: new HttpHeaders({Authorization : localStorage.getItem('token')})
  // };
  userId = localStorage.getItem('userid');

  constructor(private http: HttpClient) {   
    this.httpOptions = {
      headers: new HttpHeaders({ 'Authorization' : localStorage.getItem('token'),'Content-Type': 'application/json' }),
      // observe: 'response'
    };
  }

  getApprovers(){
    return this.http.get(this.appApi.getUsersAPI,this.httpOptions);
  }

  getClients(){
    return this.http.get(this.appApi.getClientsAPI,this.httpOptions);
  }

  getLocations(){
    return this.http.get(this.appApi.getLocationsAPI,this.httpOptions);
  }

  getAssignments(){
    return this.http.get(this.appApi.getAssignmentsAPI,this.httpOptions);
  }

  getTasks(){
    return this.http.get(this.appApi.getTasksAPI,this.httpOptions);
  }

  getDiary(){
    return this.http.get(this.appApi.getDiaryAPI+'/'+this.userId,this.httpOptions);
  }

  saveDiary(body){
    console.log(body);
    return this.http.post<any>(this.appApi.diaryAPI, body,this.httpOptions)
  }

  viewDiary(id){
    return this.http.get<any>(this.appApi.diaryAPI+'/'+id,this.httpOptions)
  }

  updateDiary(id,body){
    console.log(body);
    return this.http.put<any>(this.appApi.diaryAPI+'/'+id, body,this.httpOptions)
  }

  deleteDiary(id){
    return this.http.delete<any>(this.appApi.diaryAPI+'/'+id,this.httpOptions)
  }

}
