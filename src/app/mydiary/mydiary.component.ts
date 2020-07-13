import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppDemoJson } from '../services/app-demo-json';
import { AppObjects } from '../services/app-objects';
import { MydiaryService } from '../services/mydiary.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MyDiary } from '../models/mydiary';
import * as moment from 'moment';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-mydiary',
  templateUrl: './mydiary.component.html',
  styleUrls: ['./mydiary.component.css'],

})
export class MydiaryComponent implements OnInit {
  modalStatus='';
  demoApiJson = new AppDemoJson();
  myDiary = new MyDiary("","","","","","","","","","","","","","","Office to Client","15",true,"Two Wheeler","10","150","");
  closeResult = '';
  clientList:any;
  locationList:any;
  approverList:any;
  taskList:any;
  assignmentList:any;
  diaryList:any;
  fyList=[{id:2,name:'2018-2019'},{id:2,name:'2019-2020'}];

  constructor(private modalService: NgbModal,config: NgbTimepickerConfig, private mydiaryService:MydiaryService,private http: HttpClient) {
    config.spinners = false;
    config.size = 'small';
    config.meridian=false;
  }

  openModal(content,status) {
    this.modalStatus = status;
     if(!(this.modalStatus=='edit')){
      this.resetModalObject();
     } 
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'lg',windowClass : "myCustomModalClass"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  initCount=0;
  ngOnInit() {
    console.log("ngOnInit")
    this.loadApprovers();
  }
 
  loadApprovers(){
    this.mydiaryService.getApprovers()
    .subscribe(res => {
      console.log(res);
      this.approverList = res;
      this.loadClients();
    });
  }

  loadClients(){
    this.mydiaryService.getClients()
    .subscribe(res => {
      console.log(res);
      this.clientList = res;
      this.loadLocations();
    });
  }

  loadLocations(){
    this.mydiaryService.getLocations()
    .subscribe(res => {
      console.log(res);
      this.locationList = res;
      this.loadAssignments();
    });
  }

  loadAssignments(){
    this.mydiaryService.getAssignments()
    .subscribe(res => {
      console.log(res);
      this.assignmentList = res;
      this.loadTasks();
    });
  }

  loadTasks(){
    this.mydiaryService.getTasks()
    .subscribe(res => {
      console.log(res);
      this.taskList = res;
      if(this.initCount==0){
        this.initCount+=1;
        this.loadDiary();
      }
    });
  }

  loadDiary(){
    this.mydiaryService.getDiary()
    .subscribe(res => {
      console.log(res);
      this.diaryList = res;
    });
  }
  // Calculations
  convertMinutesToTime(n) {
    var time={hour:0,minute:0,second:0}
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    time.hour=rhours;
    time.minute=rminutes;
    time.second=0;
    // console.log(num + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).")
    return time;
  }

  convertHoursToTime(num) {
    var time={hour:'0',minute:'0',second:'0'}
    time.hour = ('0' + Math.floor(num) % 24).slice(-2) ;
    time.minute = ((num % 1)*60 + '0').slice(0, 2)
    return time;
  }

    
  diff_minutes(dt2, dt1){
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  console.log(diff)
  diff /= 60;
  return Math.abs(Math.round(diff));
  }
   
  onChangeOutTime(newTime) {
    if(newTime==null){
    }else{
      console.log('Time changed', newTime);
      // Calculate Total no of hours
      this.myDiary.noOfHours={};
      var strIn = "October 13, 2014 "+ this.myDiary.inTime.hour+":"+this.myDiary.inTime.minute+":00";
      var strOut = "October 13, 2014 "+ this.myDiary.outTime.hour+":"+this.myDiary.outTime.minute+":00";
      var inDate = new Date(strIn);
      var outDate = new Date(strOut);
      var totalTimeInMinutes = this.diff_minutes(outDate,inDate);
      this.myDiary.noOfHours = this.convertMinutesToTime(totalTimeInMinutes);
      // Calculate Cr and Dr no of hours
      var strTarget = "October 13, 2014 8:00:00";
      var targetedDate = new Date(strTarget);
      var expectedTimeInMinutes = moment.duration('8:00:00').asMinutes();

      if(expectedTimeInMinutes>totalTimeInMinutes){
        this.myDiary.creditedHours = {hour:0,minute:0,second:0};
        this.myDiary.debitedHours = this.convertMinutesToTime(totalTimeInMinutes-expectedTimeInMinutes);
      }else{
        this.myDiary.debitedHours = {hour:0,minute:0,second:0};
        this.myDiary.creditedHours = this.convertMinutesToTime(totalTimeInMinutes-expectedTimeInMinutes);
      }
    
      
    }
  }

  // AJAX CALL MEthods 
  getJsonObject(){
    var entryDate = new Date(this.myDiary.entryDate.year+'-'+this.myDiary.entryDate.month+'-'+this.myDiary.entryDate.day)
    console.log(entryDate);
    var data ={
      amount: this.myDiary.amount,
      approverUserId: this.myDiary.approverUserId,
      assignmentId: this.myDiary.assignmentId,
      chargeableToClient: this.myDiary.chargeableToClient,
      clientId: this.myDiary.clientId,
      creditedHours: moment.duration(this.myDiary.creditedHours.hour+":"+this.myDiary.creditedHours.minute).asHours(),
      debitedHours: moment.duration(this.myDiary.debitedHours.hour+":"+this.myDiary.debitedHours.minute).asHours(),
      distanceFromOffice: this.myDiary.distanceFromOffice,
      employeeUserId: localStorage.getItem('userid'),
      entryDate:  moment(entryDate).format("YYYY-MM-DD"),
      extraHours: 0,
      inTimeHour: this.myDiary.inTime.hour,
      inTimeMin: this.myDiary.inTime.minute,
      locationId: this.myDiary.locationId,
      mode: this.myDiary.mode,
      noOfHours: moment.duration(this.myDiary.noOfHours.hour+":"+this.myDiary.noOfHours.minute).asHours(),
      outTimeHour:this.myDiary.outTime.hour,
      outTimeMin: this.myDiary.outTime.minute,
      rate: this.myDiary.rate,
      taskId: this.myDiary.taskId,
      travellingFrom: this.myDiary.travellingFrom,
      workPerformed: this.myDiary.workPerformed
    }
    console.log(data)
    return JSON.stringify(data)
  }
  
  resetModalObject(){
    this.myDiary.id ='',
    this.myDiary.approverUserId ='',
    this.myDiary.entryDate ='',
    this.myDiary.assignmentId ='',
    this.myDiary.clientId ='',
    this.myDiary.locationId = '',
    this.myDiary.forFy ='',
    this.myDiary.taskId ='',
    this.myDiary.inTime ='',
    this.myDiary.outTime ='',
    this.myDiary.noOfHours='',
    this.myDiary.extraHours='',
    this.myDiary.debitedHours='',
    this.myDiary.creditedHours='',
    this.myDiary.travellingFrom = 'Office to Client',
    this.myDiary.distanceFromOffice = 15,
    this.myDiary.chargeableToClient = true,
    this.myDiary.mode = 'Two Wheeler',
    this.myDiary.rate=10,
    this.myDiary.amount= 150,
    this.myDiary.workPerformed=''
  }

  changeDiaryList(diary){
    if(this.modalStatus=='add'){
      this.diaryList.push(diary);
    }
    
    if(this.modalStatus=='edit'){
      // var item = this.diaryList.find(item => item.id === diary.id);
      // console.log(item);
      var index = this.diaryList.findIndex(item => item.id === diary.id)
      console.log(index);
      this.diaryList.splice(index, 1, diary);
      console.log(this.diaryList);
    }

    if(this.modalStatus=='delete'){
      var index = this.diaryList.findIndex(item => item.id === diary.id)
      console.log(index);
      this.diaryList.splice(index, 1);
    }
  }

  onSaveDiary(myDiaryForm:NgForm){
    console.log(myDiaryForm);
    if(myDiaryForm.form.invalid){

    }else{
      this.mydiaryService.saveDiary(this.getJsonObject()) 
      .subscribe(resp => {
        console.log(resp);
        this.changeDiaryList(resp);
        this.closeModal();
      })
    }
  }

  onDeleteDiary(diary){
    console.log(diary);
    this.modalStatus = 'delete';
    this.mydiaryService.deleteDiary(diary.id) 
    .subscribe(resp => {
      console.log(resp);
      this.changeDiaryList(resp);
    })
  }

  assignObjectToModal(diary){
    this.myDiary.id = diary.id,
    this.myDiary.amount = diary.amount;
    this.myDiary.approverUserId = diary.approver.userId;
    this.myDiary.assignmentId = diary.assignment.id;
    this.myDiary.chargeableToClient = diary.chargeableToClient;
    this.myDiary.clientId = diary.client.id;
    this.myDiary.locationId = diary.location.id;
    this.myDiary.mode = diary.mode;
    this.myDiary.distanceFromOffice = diary.distanceFromOffice;
    this.myDiary.rate = diary.rate;
    this.myDiary.taskId = diary.task.id;
    this.myDiary.travellingFrom = diary.travellingFrom;
    this.myDiary.workPerformed = diary.workPerformed;
    this.myDiary.inTime = {hour:diary.inTimeHour, minute:diary.inTimeMin, second:0};
    this.myDiary.outTime = {hour:diary.outTimeHour, minute:diary.outTimeMin, second:0};
    var diaryDate = new Date(diary.entryDate);
    this.myDiary.entryDate = {year:diaryDate.getFullYear(),month:diaryDate.getMonth()+1,day:diaryDate.getDay()}
    this.myDiary.creditedHours = this.convertHoursToTime(diary.creditedHours);
    this.myDiary.debitedHours = this.convertHoursToTime(diary.debitedHours);
    this.myDiary.noOfHours = this.convertHoursToTime(diary.noOfHours);
    
   
    // "employeeUserId": localStorage.getItem('userid'),
    // "extraHours": 0,   
   
    
  }

  viewDiary(diary,content){
    this.mydiaryService.viewDiary(diary.id) 
    .subscribe(resp => {
      console.log(resp);
      this.assignObjectToModal(diary);
      this.openModal(content,'edit');
    })
  }

  onEditDiary(diary,content){
    console.log(diary);
    this.viewDiary(diary,content);
  }

  onUpdateDiary(myDiaryForm:NgForm){
    console.log(myDiaryForm);
    this.mydiaryService.updateDiary(this.myDiary.id,this.getJsonObject()) 
    .subscribe(resp => {
      console.log(resp);
      this.changeDiaryList(resp);
      this.closeModal();
    })
  }

}
