#  APLICACIÓN DE LECTURA QR - Carga de Créditos

Proyecto desarrollado con Ionic y Angular.

**CONSIGNA  DEL DESAFIO DESARROLLADO**

**Carga de crédito:** 
Ingresar un usuario. (registrado en BD)
La aplicación permite escanear un código QR (encriptado) que acumula créditos.
- Si el código no se cargó, se le agrega el crédito correspondiente, que se acumulará en un visor de créditos.
- Si ya lo cargó, mostrará un mensaje que indique lo sucedido y no se permitirá la carga del crédito.
- Si el usuario registrado tiene el perfil “admin” e intenta cargar un código que ya posee, se le permitirá acumularlo, pero si lo intenta hacer más de dos veces no se le permitirá y se mostrará un mensaje de error.
- Agregar un botón para limpiar los créditos cargados del usuario.

***QR: 10 créditos***

![](https://github.com/chrisdresba/AppCreditoQr-IonicAngular/blob/main/Img/QR10.png?raw=true?raw=true)

***QR: 50 créditos***
![](https://github.com/chrisdresba/AppCreditoQr-IonicAngular/blob/main/Img/QR50.png?raw=true?raw=true)

***QR: 100 créditos***
![](https://github.com/chrisdresba/AppCreditoQr-IonicAngular/blob/main/Img/QR100.png?raw=true?raw=true)


# Funcionamiento

**Splash Screen**  

*Pantalla de inicio*    

![](https://github.com/chrisdresba/AppCreditoQr-IonicAngular/blob/main/Img/Splash.png?raw=true?raw=true)


**Login** 

*En esta pantalla podremos ingresar con los 5 perfiles requeridos en el desafio a través de los botones de ingreso rapido*    

![](https://github.com/chrisdresba/AppCreditoQr-IonicAngular/blob/main/Img/Login.png?raw=true?raw=true)

**Home** 

*Aquí podremos visualizar los creditos del usuario y a través del botón CARGAR CREDITOS podremos acceder al lector QR*    

![](https://github.com/chrisdresba/AppCreditoQr-IonicAngular/blob/main/Img/Home.png?raw=true?raw=true)

*Aquí indicamos el boton de Cerrar Sesión y el botón que se encargar de LIMPIAR los créditos acumulados* 

![](https://github.com/chrisdresba/AppCreditoQr-IonicAngular/blob/main/Img/Home3.png?raw=true?raw=true)
