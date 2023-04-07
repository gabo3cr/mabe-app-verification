import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Location, ɵNullViewportScroller } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})


export class FormPage implements OnInit {

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  tokenLogin = sessionStorage;

  formPassword = new FormGroup({
    clave: new FormControl('')
  });

  constructor(private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
    private location: Location) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.setToken(token);
      this.router.navigate(['home']);
    }
  }

  public iniciarSesion(): void {
    const sessionId = this.generateSessionId(); // Genera un sessionId
    this.authService.loginIn(this.formPassword.value, sessionId).pipe(
      catchError((error) => {
        console.log(error);
        if (error.status === 400 && error.error.message === 'La clave ya ha sido utilizada anteriormente') {
          this.errorPasswordToast();
        }
        return EMPTY;
      })
    ).subscribe((response) => {
      if (response.login && response.status === 'Activa') {
        console.log('loginIn: ', response);
        this.authService.setToken(response.data.clave);
        this.router.navigate(['home']);
        this.successToast();
      } else {
        this.errorToast();
      }
    });
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Error, ingrese los datos correctamente o la licencia esta en uso.',
      duration: 2500,
      position: 'top',

    });

    await toast.present();
  }

  async errorPasswordToast() {
    const toast = await this.toastController.create({
      message: 'La licencia que esta ingresando ya esta en uso.',
      duration: 2500,
      position: 'top',

    });

    await toast.present();
  }

  async successToast() {
    const toast = await this.toastController.create({
      message: 'La licencia ha sido activada.',
      duration: 2500,
      position: 'top',

    });

    await toast.present();
  }

}
