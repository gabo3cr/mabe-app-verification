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

  normalScan() {
    this.router.navigate(['/qrscreen']);
    console.log("aqui va a la interfaz del QR");
  }
  
  scanInput() {
    this.router.navigate(['/qrscreen']);
    console.log("aqui va a la interfaz del QR");
  }
  
  scanOutput() {
    this.router.navigate(['/qrscreen']);
    console.log("aqui va a la interfaz del QR");
  }
  
  scanAbsence() {
    this.router.navigate(['/qrscreen']);
    console.log("aqui va a la interfaz del QR");
  }
  
   
}

