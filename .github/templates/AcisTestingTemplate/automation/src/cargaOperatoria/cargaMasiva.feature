@CargaOperatoria
Feature: Carga masiva de operatorias
Background: Login
    Given I'm a user with tags "usuariosMep" [framework]
    When me encuentro en la pagina de login
    And ingreso el usuario 2

@Tier1
@cargaMasiva
Scenario Outline: Carga masiva de operatorias
Given estoy en carga masiva de operatoria
And selecciono el archivo <archivo>
And hago click en el boton Cargar archivo
Then se muestra un mensaje en el pop up <popUp>
Then se muestra el mensaje en pantalla <mensaje>
Examples:
    | archivo                       | popUp                                                      | mensaje          |
    | src/resources/cargaMasiva.txt | Se han cargado correctamente 7 registro/s de un total de 7.| Operacion Exitosa|
