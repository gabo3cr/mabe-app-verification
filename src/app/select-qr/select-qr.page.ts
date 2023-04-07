import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-qr',
  templateUrl: './select-qr.page.html',
  styleUrls: ['./select-qr.page.scss'],
})
export class SelectQRPage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  checkIn() {
    // # 0
    localStorage.setItem("punch_state", "0");
    this.router.navigate(['/qrscreen']);    
  }
  
  checkOut() {
    // # 1
    localStorage.setItem("punch_state", "1");
    this.router.navigate(['/qrscreen']);    
  }
    
  breakOut() {
    // # 2
    localStorage.setItem("punch_state", "2");
    this.router.navigate(['/qrscreen']);    
  }
  
  breakIn() {
    // # 3
    localStorage.setItem("punch_state", "3");
    this.router.navigate(['/qrscreen']);    
  }
   
  backButton(){
    this.router.navigate(['/select-qr']);
  }
}

