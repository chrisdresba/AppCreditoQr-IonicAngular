import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from "src/app/services/auth.service";
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { CreditosService } from "src/app/services/creditos.service";
import { ToastService } from "src/app/services/toast.service";
import { Creditos } from "src/app/class/creditos";
import { AngularFireAuth } from "@angular/fire/compat/auth";


declare let window: any; // Don't forget this part!
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  public readResult!: String;
  qrCodes: any = {
    diez: "8c95def646b6127282ed50454b73240300dccabc",
    cincuenta: "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172",
    cien: "2786f4877b9091dcad7f35751bfcf5d5ea712b2f",
  };

  scannedResult: any;
  content_visibility = '';

  listado: any[] = [];
  userRol!: string;
  currentUid: any;
  showSpinner: boolean;
  creditos!: number;
  diez: boolean = false;
  cincuenta: boolean = false;
  cien: boolean = false;
  public listadoCreditos!: Creditos;
  public creditosUsuarios!: Creditos[];
  public usuarioLog: any;
  public usuario: any;


  constructor(
    public creditosSrv: CreditosService,
    public authSrv: AuthService,
    private router: Router,
    public toastSrv: ToastService,
    private toast: ToastController,
    public alertController: AlertController,
    public afAuth: AngularFireAuth
  ) {
    this.showSpinner = true;
    if(localStorage.getItem('creditos')){  
    this.creditos = parseInt(localStorage.getItem('creditos')!);
  }
  }


  ngOnInit() {

    this.usuario = this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.usuario = user;
        this.usuarioLog = this.usuario.email;
      }
    })

    if(localStorage.getItem('usuario')){
      this.usuarioLog = localStorage.getItem('usuario');
    }


    this.creditosSrv.getCreditos().subscribe(aux => {
      this.creditosUsuarios = aux;
      this.creditosUsuarios.forEach(item=>{
        if(item.usuario == this.usuarioLog){
          this.listadoCreditos = item;
          this.creditosSrv.creditosUsuario = item;
        }
      })
    })

  }


  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch (e) {
      return console.log(e);
    }
  }

  async ReadQrCode() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')!.classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      this.CargarCreditos(result.content);

      BarcodeScanner.showBackground();
      document.querySelector('body')!.classList.remove('scanner-active');
      this.content_visibility = '';
      if (result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')!.classList.remove('scanner-active');
    this.content_visibility = '';
  }

  ngOnDestroy(): void {
    this.stopScan();
  }
  /////////


  CargarCreditos(qrtext: any) {
    const qrvalue = this.GetCodeValue(qrtext);
    if (this.usuarioLog == "admin@admin.com") {
      switch (qrvalue) {
        case 10:
          if (this.listadoCreditos.creditoDiez < 20) {
            this.creditos += 10;
            this.listadoCreditos.credito += 10;
            this.listadoCreditos.creditoDiez += 10;
            this.creditosSrv.actualizarCredito(this.listadoCreditos)
            this.ShowtToastCargaOk(10)
          } else {
            this.ShowtToastQrLimit();
          }
          break;
        case 50:
          if (this.listadoCreditos.creditoCincuenta < 100) {
            this.creditos += 50;
            this.listadoCreditos.credito += 50;
            this.listadoCreditos.creditoCincuenta += 50;
            this.creditosSrv.actualizarCredito(this.listadoCreditos)
            this.ShowtToastCargaOk(10)
          } else {
            this.ShowtToastQrLimit();
          }
          break;
        case 100:
          if (this.listadoCreditos.creditoCien < 200) {
            this.creditos += 100;
            this.listadoCreditos.credito += 100;
            this.listadoCreditos.creditoCien += 100;
            this.creditosSrv.actualizarCredito(this.listadoCreditos)
            this.ShowtToastCargaOk(10)
          } else {
            this.ShowtToastQrLimit();
          }
          break;
      }
    } else {
      switch (this.GetCodeValue(qrtext)) {
        case 10:
          if (this.listadoCreditos.creditoDiez < 10) {
            this.creditos += 10;
            this.listadoCreditos.credito += 10;
            this.listadoCreditos.creditoDiez += 10;
            this.creditosSrv.actualizarCredito(this.listadoCreditos)
            this.ShowtToastCargaOk(10)
          } else {
            this.ShowtToastQrLimit();
          }
          break;
        case 50:
          if (this.listadoCreditos.creditoCincuenta < 50) {
            this.creditos += 50;
            this.listadoCreditos.credito += 50;
            this.listadoCreditos.creditoCincuenta += 50;
            this.creditosSrv.actualizarCredito(this.listadoCreditos)
            this.ShowtToastCargaOk(10)
          } else {
            this.ShowtToastQrLimit();
          }
          break;
        case 100:
          if (this.listadoCreditos.creditoCien < 100) {
            this.creditos += 100;
            this.listadoCreditos.credito += 100;
            this.listadoCreditos.creditoCien += 100;
            this.creditosSrv.actualizarCredito(this.listadoCreditos)
            this.ShowtToastCargaOk(10)
          } else {
            this.ShowtToastQrLimit();
          }
          break;
      }
    }
  }

  GetCodeValue(qr: string):any{
    switch (qr) {
      case "8c95def646b6127282ed50454b73240300dccabc":
        return 10;
        break;
      case "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172":
        return 50;
        break;
      case "2786f4877b9091dcad7f35751bfcf5d5ea712b2f":
        return 100;
        break;
    }
  }

  async ShowtToastQrLimit() {
    this.presentToast("Créditos", "Este código ya fue cargado", "warning");
  }
  async ShowtToastCargaOk(credito: number) {
    this.presentToast("Créditos", "La operación se realizo correctamente", "success");
  }

  Logout() {
    localStorage.removeItem('creditos');
    localStorage.removeItem('usuario');
    this.authSrv.SignOut();
    this.router.navigate(["login"]);
  }

  LimpiarCreditos() {
    this.creditos = 0;
    this.listadoCreditos.credito = 0;
    this.listadoCreditos.creditoDiez = 0;
    this.listadoCreditos.creditoCincuenta = 0;
    this.listadoCreditos.creditoCien = 0;
    this.creditosSrv.actualizarCredito(this.listadoCreditos);
    this.presentToast("Reinicio exitoso", "Se han reiniciado los creditos", "success");
  }

  async presentToast(header: string, message: string, color: string) {
    const toast = await this.toast.create({
      header,
      message,
      color,
      duration: 2000,
      position: "middle"
    });
    toast.present();
  }
}

