export class Usuario {
    usuario: string = "";
    contraseña:string = "";
    tipo:string = "";

    constructor(){

    }

    crearUsuario(usuario:string,contraseña:string,tipo:string){
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.tipo = tipo;
    }
}
