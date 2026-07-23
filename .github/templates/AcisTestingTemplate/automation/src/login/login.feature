Feature: Login
Background:
    Given I'm a user with tags "usuariosMep" [framework]
    

@login
Scenario Outline: Iniciar sesion como operador y autorizante
When me encuentro en la pagina de login
And ingreso el usuario <IdUsuario>
Then valido en el dashboard el usuario <usuario> <rol>
Examples:
    |IdUsuario|usuario  |rol  |
    |1        |UDESMEPA |autorizante|
    |2        |UDESMEPO |operador|
            

@loginNoOk
Scenario Outline: Iniciar sesion contrasenia y usuario incorrecto
When me encuentro en la pagina de login
And ingreso el usuario <IdUsuario>
Then valido que no inicia sesion y muestra el mensaje <mensajeError> y <mensajeErrorIngles> en ingles
Examples:
    |IdUsuario| mensajeError                                                                                                            | mensajeErrorIngles                                                                                  |
    |3        | HPDIA0200W Error de autenticación. Ha especificado un nombre de usuario, una contraseña o un certificado de cliente incorrecto. |HPDIA0200W Authentication failed. You have used an invalid user name, password or client certificate.|