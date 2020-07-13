export class AppAPI {
    private baseURL="";
    // private baseURL="http://localhost:8080";
    public  loginAPI= this.baseURL+"/users/login"; 
    public  logoutAPI= this.baseURL+"/users/logout"; 

    public  getUsersAPI= this.baseURL+"/users"; 
    public  getClientsAPI= this.baseURL+"/client"; 
    public  getLocationsAPI= this.baseURL+"/location";
    public  getAssignmentsAPI= this.baseURL+"/assignment";
    public  getTasksAPI= this.baseURL+"/task";
    public  getDiaryAPI= this.baseURL+"/diary/user"; // '/{id}'
  
    public  diaryAPI= this.baseURL+"/diary"; 

   
}
