import { Component, OnInit } from '@angular/core';
import { Style } from '@capacitor/status-bar';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastController } from '@ionic/angular';
import { ICreateManualLog, IUser } from '../models/interfaces';
import { utils } from '../utils/utils';

@Component({
  selector: 'app-qrscreen',
  templateUrl: './qrscreen.page.html',
  styleUrls: ['./qrscreen.page.scss'],
})
export class QRscreenPage implements OnInit {


  constructor(public AlertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private service: ApiService,
    private userService: UserService,
    private router: Router,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  async scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log("Captura info credencial: " + barcodeData.text);
      this.callGetUserById(barcodeData.text);
    }).catch(err => {
      console.log('Error', err);
    });
  }

  async fastScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log("Captura info credencial: " + barcodeData.text);
      this.FastcallGetUserById(barcodeData.text);
    }).catch(err => {
      console.log('Error', err);
    });
  }


  async callGetUserById(id: string) {
    try {
      const response = await this.service.getUserInfo(id);
      console.log("Response get user", response);
      const user = response['data'].length > 0 ? response['data'][0] : null;
      this.userService.cleanUser();
      if (user) {

        let usr: IUser;
        usr.idEmployee = user.id;
        usr.firstName = user.first_name, 
        usr.lastName = user.last_name, 
        usr.code = user.emp_code;

        this.userService.setUser(usr);

        let mLog: ICreateManualLog;
        mLog.employee = user.emp_code,
        mLog.punch_time = utils.formatDate(new Date()),
        mLog.punch_state = 0; // Check In

        this.service.savePunch(mLog);

        //this.router.navigate(['/authorized-user']);
        this.presentUser(id);
      } else {
        this.presentToast(id);
      }

    } catch (err) {
      //pasar a pantalla de negativo
      console.log(err);
    }

  }

  async FastcallGetUserById(id: string) {
    try {
      const response = await this.service.getUserInfo(id);
      console.log("Response get user", response);
      const user = response['data'].length > 0 ? response['data'][0] : null;
      this.userService.cleanUser();
      if (user) {
        
        let usr: IUser;
        usr.idEmployee = user.id;
        usr.firstName = user.first_name, 
        usr.lastName = user.last_name, 
        usr.code = user.emp_code;

        this.userService.setUser(usr);

        let mLog: ICreateManualLog;
        mLog.employee = user.emp_code,
        mLog.punch_time = utils.formatDate(new Date()),
        mLog.punch_state = 0; // Check In

        this.service.savePunch(mLog);
        
        this.fastScan()
        this.presentUser(id);
      } else {
        this.presentToast(id);
      }

    } catch (err) {
      //pasar a pantalla de negativo
      console.log(err);
    }

  }

  async presentToast(id: string) {
    const toast = await this.toastController.create({
      message: 'El usuario no se encuentra registrado en sistema.',
      duration: 2500,
      position: 'top',

    });

    await toast.present();
  }

  async presentUser(id: string) {
    const toast = await this.toastController.create({
      message: 'Ingreso Exitoso',
      duration: 2500,
      position: 'top',

    });

    await toast.present();

  }

}
