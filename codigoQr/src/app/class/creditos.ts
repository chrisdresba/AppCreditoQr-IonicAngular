export class Creditos {
    credito: number = 0;
    creditoDiez: number = 0;
    creditoCincuenta: number = 0;
    creditoCien: number = 0;
    usuario: string = "";
    id:string = ""

    constructor() {
    }
    iniciar(usuario : string) {
        this.credito = 0;
        this.creditoDiez = 0;
        this.creditoCincuenta = 0;
        this.creditoCien = 0;
        this.usuario = usuario;
    }
}
