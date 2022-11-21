import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { LoadingController, ToastController } from "@ionic/angular";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { timer } from "rxjs";
import { Usuario } from "src/app/class/usuario";
import { Creditos } from "src/app/class/creditos";
import { CreditosService } from "src/app/services/creditos.service";


@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  user: Usuario;
  email: string="";
  password: string ="";
  loginForm: FormGroup;
  public creditosUsuarios: Creditos[]=[];

  get name() {
    return this.loginForm.get("email");
  }

  get power() {
    return this.loginForm.get("password");
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private fromBuilder: FormBuilder,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public afAuth: AngularFireAuth,
    public creditosSrv: CreditosService
  ) {
    this.user = new Usuario();
    this.loginForm = this.fromBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  ngOnInit() {
  }

  Login() {

    this.presentLoading();
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then((res) => {
        this.creditosSrv.getCreditos().subscribe(aux => {
          this.creditosUsuarios = aux;
          this.creditosUsuarios.forEach(item => {
            if (item.usuario == this.email) {
              localStorage.setItem('creditos', item.credito.toString());
              this.creditosSrv.creditosUsuario = item;
            }
          })
        })
        localStorage.setItem('usuario', this.email);
        if (this.email == 'admin@admin.com') { localStorage.setItem("tipoUsuario", "admin") } else { localStorage.setItem("tipoUsuario", "usuario") }
        timer(2000).subscribe(() => { this.router.navigate(['/home']) });
      })
      .catch((err) => {
        err.code == "auth/wrong-password"
          ? this.presentToast("Uno o mas campos son invalidos...")
          : this.presentToast("Ha ocurrido un error vuelva a intentar.");
      });
  }

  testUser(accountNumber: number) {
    switch (accountNumber) {
      case 1:
        this.loginForm.controls["email"].setValue("admin@admin.com");
        this.loginForm.controls["password"].setValue("111111");
        break;
      case 2:
        this.loginForm.controls["email"].setValue("invitado@invitado.com");
        this.loginForm.controls["password"].setValue("222222");
        break;
      case 3:
        this.loginForm.controls["email"].setValue("usuario@usuario.com");
        this.loginForm.controls["password"].setValue("333333");
        break;
      case 4:
        this.loginForm.controls["email"].setValue("anonimo@anonimo.com");
        this.loginForm.controls["password"].setValue("444444");
        break;
      case 5:
        this.loginForm.controls["email"].setValue("tester@tester.com");
        this.loginForm.controls["password"].setValue("555555");
        break;
    }
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      cssClass: "toast-danger",
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Cargando...',
      duration: 2000,
      translucent: true,

      cssClass: 'my-loading-class'

    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }

}
