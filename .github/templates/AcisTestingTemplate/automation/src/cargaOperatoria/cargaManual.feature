@CargaOperatoria
Feature: Carga manual de operatorias
Background: Login
    Given I'm a user with tags "usuariosMep" [framework]
    When me encuentro en la pagina de login
    And ingreso el usuario 2


########## CARGA DE OPERATORIAS CAMINO FELIZ ##########
@Tier2
@AA0
@prueba1
Scenario Outline: Carga operatoria AA0-CANC SALDO ACRE DE ENTID
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el tipo de operatoria con <tipo>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
    Examples:
    | operatoria                   | cuentaDeudora                            | entidadAcreedora                 | cuentaAcreedora                          | importe | tipo           |resultadoEnvio                    |
    | AA0-CANC SALDO ACRE DE ENTID | 17-Banco BBVA Argentina S.A.CTA.CTE.en$  | 11-Banco de la Nacion Argentina  | 11-BCO.DE LA NACION ARGENTIN-CTA.CTE.en $| 20000,00| ACRL-ARGENCLEAR|8000-La transferencia fue aceptada|


@Tier1
@DAD@operatoriaOk
@prueba2
Scenario Outline: Carga operatoria DAD-SOL. BILL. TESOROS REGIONALE
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el tipo de operatoria con <tipo>
And completo los campos billete <billete>
And completo el campo codigo de retiro <codigo>
And completo el campo codigo de provision <provision>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                      | cuentaDeudora                          | entidadAcreedora                | cuentaAcreedora              | importe   | tipo               |billete|codigo|provision|resultadoEnvio                    |
    | DAD-SOL. BILL. TESOROS REGIONALE| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 30-Banco Central de la República| 600-BCRA - GERENCIA DE TESORO| 2000000,00| TRE02-T REG MENDOZA|1      |01-   |1-BCRA.  |8000-La transferencia fue aceptada|

@Tier1
@DAA
Scenario Outline: Carga operatoria DAA-SOLICITUD DE BILLETES
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el tipo de operatoria con <tipo>
And completo los campos billete <billete>
And completo el campo codigo de retiro <codigo>
And completo el campo codigo de provision <provision>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria               | cuentaDeudora                          | entidadAcreedora                | cuentaAcreedora              | importe   | tipo               |billete|codigo|provision| resultadoEnvio                    |
    | DAA-SOLICITUD DE BILLETES| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 30-Banco Central de la República| 600-BCRA - GERENCIA DE TESORO| 2000000,00| TRE01-TF_Tesoro    |1      |01-   |1-BCRA   | 8000-La transferencia fue aceptada|

@Tier2
@D10
Scenario Outline: Carga operatoria D10-ACRED. CTA GTIA OPERAC MTM0
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el tipo de operatoria con <tipo>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                      | cuentaDeudora                          | entidadAcreedora      | cuentaAcreedora                               | importe | tipo                       | resultadoEnvio                    |
    | D10-ACRED. CTA GTIA OPERAC MTM  | 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 22200-A3 Mercados S.A.| 22200-A3 MERCADOS S.A.-GARANTIAS DE TERCEROS $| 20000,00| 01-Constitucion de Garantia| 8000-La transferencia fue aceptada|

@Tier3
@D13
Scenario Outline: Carga operatoria D13-CANC SALDO DDOR PESOS OPER MTM
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el tipo de operatoria con <tipo>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                        | cuentaDeudora                          | entidadAcreedora                   | cuentaAcreedora                             | importe | tipo                     | resultadoEnvio                    |
    | D13-CANC SALDO DDOR PESOS OPER MTM| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 22300-ARGENTINA CLEARING Y REGISTRO| 22300-ARG CLEARING Y REGISTRO-GTIA 3ROS EN $| 20000,00| 01-Liquidacion MTM       | 8000-La transferencia fue aceptada|

@Tier3
@D15
Scenario Outline: Carga operatoria D15-MARGEN DE LIQUIDEZ DE FCI
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el campo Nombre del FCI <nombreFCI>
And completo el campo CUIT Entidad Administradora <CUIT>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                   | cuentaDeudora                          | entidadAcreedora           | cuentaAcreedora                              | importe | nombreFCI|CUIT        | resultadoEnvio                    |
    | D15-MARGEN DE LIQUIDEZ DE FCI| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 17-Banco BBVA Argentina S.A| 17001-Banco BBVA Argentina S.A FCI FBA AHORRO| 20000,00| Prueba    |30500010912| 8000-La transferencia fue aceptada|

@Tier3
@D16
Scenario Outline: Carga operatoria D16-DESAFECTACION MARG LIQ DE FCI
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el campo Nombre del FCI <nombreFCI>
And completo el campo CUIT ENT ADM <CUITENTADM>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                       | cuentaDeudora                                | entidadAcreedora           | cuentaAcreedora                        | importe | nombreFCI|CUITENTADM | resultadoEnvio|
    | D16-DESAFECTACION MARG LIQ DE FCI| 17001-Banco BBVA Argentina S.A FCI FBA AHORRO| 17-Banco BBVA Argentina S.A| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 20000,00| Prueba   |30500010912| 8000-La transferencia fue aceptada|

@Tier3
@D20 
Scenario Outline: Carga operatoria D20-MERC CAP - CANCELAC SDO DEUDOR
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el desplegable concepto <concepto>
And completo el campo origen de los fondos <origenFondos> "2"
And completo el campo CUIT-CUIL-CDI <cuitCuilCdi>
And completo el desplegable conozco cliente-PEP <clientePEP>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                        | cuentaDeudora                                | entidadAcreedora     | cuentaAcreedora                   | importe | concepto                  | origenFondos| cuitCuilCdi| clientePEP                                                                                            | resultadoEnvio                    |
    | D20-MERC CAP - CANCELAC SDO DEUDOR| 11017-Banco BBVA Argen-CTA A LA VTA. EN EUROS| 80008-BANCO DE PRUEBA| 80888-BCO. PRUEBA CTA. VISTA EUROS| 20000,00| 1-Cancelacion saldo deudor| 1-Propios   | 20408689784| S1-PEP(Persona Expuesta PolÝticamente) -Declaro conocer a mi cliente. Ley 25246ûEncub Lavado y Activos| 8000-La transferencia fue aceptada|

@Tier1
@DK0 
Scenario Outline: Carga operatoria DK0-OTOR CALL MONEY / PREST INTERF
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el Nro de Referencia <NrodeReferencia>
And completo el campo CUIT del Ordenante <CUITdelOrdenante>
And completo el campo Plazo en dias <PlazoEnDias>
And completo el campo Tasa de Interes <TasaDeInteres>
And completo el campo opcional Tipo de tasa <TipoDeTasa>
And completo el campo Observaciones <Observaciones>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                        | cuentaDeudora                          | entidadAcreedora          | cuentaAcreedora                       | importe | NrodeReferencia| CUITdelOrdenante | PlazoEnDias| TasaDeInteres| TipoDeTasa| Observaciones| resultadoEnvio                    | 
    | DK0-OTOR CALL MONEY / PREST INTERF| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 198-Banco de Valores S. A.| 198-BANCO DE VALORES S.A.-CTA.CTE.en $| 20000,00| 12345678       | 30500003193      | 20         | 10,0         | TNA       | test         | 8000-La transferencia fue aceptada|

@Tier2
@DK1 
Scenario Outline: Carga operatoria DK1-DEVOL CALL MONEY /PREST INTERF
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el Nro de Referencia <NrodeReferencia>
And completo el campo CUIT del Beneficiario <CUITdelBeneficiario>
And completo el desplegable Concepto de pago <conceptoDePago>
And completo el campo Observaciones <Observaciones>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                        | cuentaDeudora                          | entidadAcreedora          | cuentaAcreedora                       | importe | NrodeReferencia| CUITdelBeneficiario | conceptoDePago         | Observaciones|resultadoEnvio                    |
    | DK1-DEVOL CALL MONEY /PREST INTERF| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 198-Banco de Valores S. A.| 198-BANCO DE VALORES S.A.-CTA.CTE.en $| 20000,00| 12345678       | 30576124275         | 01-Reintegro de capital| test         |8000-La transferencia fue aceptada|

@Tier2
@DK3 
Scenario Outline: Carga operatoria DK3-OPERACIONES CON TITULOS
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el desplegable origen de los fondos <origenDeLosFondos>
And completo el campo Ordenante CUIT-CUIL-CDI <CUIT_CUIL_CDIdelOrdenante>
And completo el campo CBU Ordenante <CBUOrdenanteOpcional>
And completo el campo Beneficiario CUIT-CUIL-CDI <beneficiarioCUIT_CUIL_CDI>
And completo el campo CBU Beneficiario <CBUBeneficiarioOpcional>
And completo el desplegable Tipo de Operacion <tipoOperacion>
And completo el campo opcional Especie <especie>
And completo el campo Nro de cupon <nroCupon>
And completo el desplegable conozco cliente-PEP <cliente_PEP>
And completo el campo Observaciones <observacionesOpcional>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                 | cuentaDeudora                          | entidadAcreedora          | cuentaAcreedora                       | importe |origenDeLosFondos| CUIT_CUIL_CDIdelOrdenante| CBUOrdenanteOpcional  | beneficiarioCUIT_CUIL_CDI| CBUBeneficiarioOpcional| tipoOperacion       | especie| nroCupon| cliente_PEP       | observacionesOpcional| resultadoEnvio                    |
    | DK3-OPERACIONES CON TITULOS| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 198-Banco de Valores S. A.| 198-BANCO DE VALORES S.A.-CTA.CTE.en $| 20000,00| 1-Propios       | 30576124275              |                       | 30576124275              |                        | 01-Renta / Intereses|Opcional| 13      |S0-Operaci¾n propia| Prueba               | 8000-La transferencia fue aceptada|

@Tier2
@DL0 
Scenario Outline: Carga operatoria DL0-TRANSF MISMO TITULAR
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el campo CBU Beneficiario <CBUBeneficiario>
And completo el campo CUIT CUIL Beneficiario <cuitCuilBeneficiario>
And completo el desplegable Codigo de transferencia <codigoDeTransferencia>
And completo el campo concepto <concepto>
And completo el campo CBU Ordenante <CBUOrdenante>
And completo el campo CUIT CUIL Ordenante <cuitCuilOrdenante>
And completo el campo nombre ordenante <nombreOrdenante>
And completo el desplegable declaro conocer a mi cliente <declaroConocerCliente> "2"
And completo el desplegable Ordenante PEP-Pers Exp Politc <ordenantePEPPersExpPolitc> "3"
And completo el desplegable tipo de cuenta ordenante <tipoDeCuentaOrdenante>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                 | cuentaDeudora                          | entidadAcreedora                 | cuentaAcreedora                        | importe | CBUBeneficiario       | cuitCuilBeneficiario| codigoDeTransferencia| concepto| CBUOrdenante          | cuitCuilOrdenante| nombreOrdenante| declaroConocerCliente                                                       | ordenantePEPPersExpPolitc| tipoDeCuentaOrdenante| resultadoEnvio                    |
    | DL0-TRANSF MISMO TITULAR   | 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 11-Banco de la Nacion Argentina| 11-BCO.DE LA NACION ARGENTIN-CTA.CTE.en $| 20000,00| 0110599530000022511929| 20131519347         | ALQ-Alquileres       | prueba  | 0170368740000002605775| 20131519347      | Don Prueba     | SI-Declaro conocer a mi cliente. Ley 25246-Encubrimiento y Lavado de Activos| SI-Si                    | 01-Cuenta Corriente  | 8000-La transferencia fue aceptada|

@Tier2
@DL1 
Scenario Outline: Carga operatoria DL1-TRANS. ACRED. CUENTAS GRAVADAS
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el campo CBU Beneficiario <CBUBeneficiario>
And completo el campo CUIT CUIL Beneficiario <cuitCuilBeneficiario>
And completo el desplegable Codigo de transferencia <codigoDeTransferencia>
And completo el campo concepto <concepto>
And completo el campo CBU Ordenante <CBUOrdenante>
And completo el campo CUIT CUIL Ordenante <cuitCuilOrdenante>
And completo el campo nombre ordenante <nombreOrdenante>
And completo el desplegable declaro conocer a mi cliente <declaroConocerCliente> "2"
And completo el desplegable Ordenante PEP-Pers Exp Politc <ordenantePEPPersExpPolitc> "3"
And completo el campo nombre beneficiario <nombreBeneficiario>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                        | cuentaDeudora                          | entidadAcreedora               | cuentaAcreedora                          | importe | CBUBeneficiario       | cuitCuilBeneficiario| codigoDeTransferencia| concepto| CBUOrdenante          | cuitCuilOrdenante| nombreOrdenante    | declaroConocerCliente                                                       | ordenantePEPPersExpPolitc| nombreBeneficiario|resultadoEnvio                    |
    | DL1-TRANS. ACRED. CUENTAS GRAVADAS| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 11-Banco de la Nacion Argentina| 11-BCO.DE LA NACION ARGENTIN-CTA.CTE.en $| 20000,00| 0110091430009136796929| 20176111152         | ALQ-Alquileres       | alquiler| 0170087940000043777585| 27059106649      | Prueba automatizada| SI-Declaro conocer a mi cliente. Ley 25246-Encubrimiento y Lavado de Activos| SI-Si                    | Test Automation   |8000-La transferencia fue aceptada|

@Tier3
@DL2 
Scenario Outline: Carga operatoria DL2-TRANS. ACRED. CUENTAS NO GRAVA
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el campo CBU Beneficiario <CBUBeneficiario>
And completo el campo CUIT CUIL Beneficiario <cuitCuilBeneficiario>
And completo el desplegable Codigo de transferencia <codigoDeTransferencia>
And completo el campo concepto <concepto>
And completo el campo CBU Ordenante <CBUOrdenante>
And completo el campo CUIT CUIL Ordenante <cuitCuilOrdenante>
And completo el campo nombre ordenante <nombreOrdenante>
And completo el desplegable declaro conocer a mi cliente <declaroConocerCliente> "2"
And completo el desplegable Ordenante PEP-Pers Exp Politc <ordenantePEPPersExpPolitc> "3"
And completo el campo nombre beneficiario <nombreBeneficiario>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                        | cuentaDeudora                          | entidadAcreedora               | cuentaAcreedora                          | importe | CBUBeneficiario       | cuitCuilBeneficiario| codigoDeTransferencia| concepto| CBUOrdenante          | cuitCuilOrdenante| nombreOrdenante| declaroConocerCliente                                                       | ordenantePEPPersExpPolitc| nombreBeneficiario|resultadoEnvio                    |
    | DL2-TRANS. ACRED. CUENTAS NO GRAVA| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 11-Banco de la Nacion Argentina| 11-BCO.DE LA NACION ARGENTIN-CTA.CTE.en $| 20000,00| 0110091430009136796929| 20176111152         | ALQ-Alquileres       | prueba  | 0170087940000043777585| 27059106649      | Don Prueba     | SI-Declaro conocer a mi cliente. Ley 25246-Encubrimiento y Lavado de Activos| SI-Si                    | Ivan coronel      |8000-La transferencia fue aceptada|

@Tier3
@DL3
Scenario Outline: Carga operatoria DL2-TRANS. ACRED. CUENTAS NO GRAVA
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el campo CBU Beneficiario <CBUBeneficiario>
And completo el campo CUIT CUIL Beneficiario <cuitCuilBeneficiario>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                   | cuentaDeudora                          | entidadAcreedora               | cuentaAcreedora                          | importe | CBUBeneficiario       | cuitCuilBeneficiario|resultadoEnvio                    |
    | DL3-TRANS. POR PAGO DE SUELDO| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 11-Banco de la Nacion Argentina| 11-BCO.DE LA NACION ARGENTIN-CTA.CTE.en $| 20000,00| 0110091430009136796929| 20176111152         |8000-La transferencia fue aceptada|

@Tier2
@DM2
Scenario Outline: Carga operatoria DM2-INCREM. GARANTIAS OCT-MAE-MTM
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el desplegable Concepto Acreditacion <conceptoAcreditacion>
And completo el campo Observaciones <observacionesOpcional>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                          | cuentaDeudora                          | entidadAcreedora      | cuentaAcreedora                                     | importe | conceptoAcreditacion       | observacionesOpcional| resultadoEnvio                    |
    | DM2-INCREM. GARANTIAS OCT - A3 - MTM| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 22200-A3 Mercados S.A.| 22205-A3 MERCADOS S.A. - GARANTÍA DE TERCEROS EN ARP| 20000,00| 01-Constitucion de Garantia| test                 | 8000-La transferencia fue aceptada|


@Tier2
@DM5
Scenario Outline: Carga operatoria DM5-CANC. SALDO DEUDOR OCT-MAE-MTM
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el desplegable Concepto Cancelacion <conceptoCancelacion>
And completo el campo Observaciones <observacionesOpcional>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                        | cuentaDeudora                          | entidadAcreedora      | cuentaAcreedora                            | importe | conceptoCancelacion| observacionesOpcional| resultadoEnvio                    | 
    | DM5-CANC. SALDO DEUDOR OCT-MAE-MTM| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 22200-A3 Mercados S.A.| 22204-A3 MERCADOS S.A. - LIQUIDACIÓN EN ARP| 20000,00| 01-Liquidacion MTM | test                 | 8000-La transferencia fue aceptada|


@Tier2
@DP5
Scenario Outline: Carga operatoria DP5-CPRA/VTA CBIO-C.CTE $ -OP.PROP
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el campo Nro de operacion o boleto <nroOperacionOBoleto>
And completo el campo CUIT entidad destino <cuitEntidadDestino>
And completo el desplegable Codigo moneda <codigoMoneda>
And completo el campo Cant. moneda <cantMoneda>
And completo el campo Tipo de cambio <tipoDeCambio>
And completo el campo Observaciones <observacionesOpcional>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                        | cuentaDeudora                          | entidadAcreedora          | cuentaAcreedora                       | importe | nroOperacionOBoleto| cuitEntidadDestino| codigoMoneda      | cantMoneda| tipoDeCambio| observacionesOpcional|resultadoEnvio                    |
    | DP5-CPRA/VTA CBIO-C.CTE $ -OP.PROP| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 198-Banco de Valores S. A.| 198-BANCO DE VALORES S.A.-CTA.CTE.en $| 20000,00| 4484               | 30576124275       | 002-D¾lar E.E.U.U.| 200       | 100         | prueba               |8000-La transferencia fue aceptada|
    | DP5-CPRA/VTA CBIO-C.CTE $ -OP.PROP| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 198-Banco de Valores S. A.| 198-BANCO DE VALORES S.A.-CTA.CTE.en $| 20100,00| 4484               | 30576124275       | 002-D¾lar E.E.U.U.| 200       | 100,50      | prueba               |8000-La transferencia fue aceptada|
@Tier2
@DP6
Scenario Outline: Carga operatoria DP6-CPRA/VTA CBIO-CTA M.EXT-OP.PRO
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el campo Nro de operacion o boleto <nroOperacionOBoleto>
And completo el campo CUIT entidad destino <cuitEntidadDestino>
And completo el desplegable Codigo moneda <codigoMoneda>
And completo el campo Cant. moneda <cantMoneda>
And completo el campo Tipo de cambio <tipoDeCambio>
And completo el campo Observaciones <observacionesOpcional>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                        | cuentaDeudora                               | entidadAcreedora          | cuentaAcreedora                            | importe| nroOperacionOBoleto| cuitEntidadDestino| codigoMoneda| cantMoneda| tipoDeCambio   | observacionesOpcional|resultadoEnvio                    |
    | DP6-CPRA/VTA CBIO-CTA M.EXT-OP.PRO| 80017-CTA VISTA DLS-Banco BBVA Argentina S.A| 281-Banco Meridian S.A.   | 80281-CTA VISTA DLS BCO MERIDIAN SA        | 1000,00| 1234               | 30534487491       | 080-Pesos   | 1143000   | 1143           | prueba               |8000-La transferencia fue aceptada|
    | DP6-CPRA/VTA CBIO-CTA M.EXT-OP.PRO| 80017-CTA VISTA DLS-Banco BBVA Argentina S.A| 281-Banco Meridian S.A.   | 80281-CTA VISTA DLS BCO MERIDIAN SA        | 1000,00| 1234               | 30534487491       | 080-Pesos   | 1143500   | 1143,50        | prueba               |8000-La transferencia fue aceptada|   
@Tier1
@DR0
Scenario Outline: Carga operatoria DR0-TRANS. MISMO TITULAR MON EXTR
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el campo CBU Beneficiario <CBUBeneficiario>
And completo el campo CUIT CUIL Beneficiario <cuitCuilBeneficiario>
And completo el desplegable Codigo de transferencia <codigoDeTransferencia>
And completo el campo concepto <concepto>
And completo el campo CBU Ordenante <CBUOrdenante>
And completo el campo CUIT CUIL Ordenante <cuitCuilOrdenante>
And completo el campo nombre ordenante <nombreOrdenante>
And completo el desplegable declaro conocer a mi cliente <declaroConocerCliente> "2"
And completo el desplegable Ordenante PEP-Pers Exp Politc <PEPpers> "3"
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                       | cuentaDeudora                               | entidadAcreedora               | cuentaAcreedora                                | importe | CBUBeneficiario       | cuitCuilBeneficiario| codigoDeTransferencia| concepto| CBUOrdenante          | cuitCuilOrdenante| nombreOrdenante| declaroConocerCliente                                                       | PEPpers|resultadoEnvio                    |
    | DR0-TRANS. MISMO TITULAR MON EXTR| 80017-CTA VISTA DLS-Banco BBVA Argentina S.A| 72-BANCO SANTANDER ARGENTINA SA| 80072-CTA VISTA DLS- BCO SANTANDER ARGENTINA SA| 20000,00| 0720165988000002981754| 20339704016         | ALQ-Alquileres       | prueba  | 0170314426000000408262| 20339704016      | Don Prueba     | SI-Declaro conocer a mi cliente. Ley 25246-Encubrimiento y Lavado de Activos| SI-Si  |8000-La transferencia fue aceptada|

@DR1@Tier3 
Scenario Outline: Carga operatoria DR1-TRANS GRAVADAS ORIGEN MON EXTR
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el campo CBU Beneficiario <CBUBeneficiario>
And completo el campo CUIT CUIL Beneficiario <cuitCuilBeneficiario>
And completo el desplegable Codigo de transferencia <codigoDeTransferencia>
And completo el campo concepto <concepto>
And completo el campo CBU Ordenante <CBUOrdenante>
And completo el campo CUIT CUIL Ordenante <cuitCuilOrdenante>
And completo el campo nombre ordenante <nombreOrdenante>
And completo el desplegable declaro conocer a mi cliente <declaroConocerCliente> "2"
And completo el desplegable Ordenante PEP-Pers Exp Politc <PEPpers> "3"
And completo el campo nombre beneficiario <nombreBeneficiario>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                        | cuentaDeudora                               | entidadAcreedora               | cuentaAcreedora                                | importe | CBUBeneficiario       | cuitCuilBeneficiario| codigoDeTransferencia| concepto| CBUOrdenante          | cuitCuilOrdenante| nombreOrdenante| declaroConocerCliente                                                       | PEPpers| nombreBeneficiario|resultadoEnvio                    |
    | DR1-TRANS GRAVADAS ORIGEN MON EXTR| 80017-CTA VISTA DLS-Banco BBVA Argentina S.A| 72-BANCO SANTANDER ARGENTINA SA| 80072-CTA VISTA DLS- BCO SANTANDER ARGENTINA SA| 20000,00| 0720165988000002981754| 20339704016         | ALQ-Alquileres       | prueba  | 0170314426000000408262| 30716617714      | Don Prueba     | SI-Declaro conocer a mi cliente. Ley 25246-Encubrimiento y Lavado de Activos| SI-Si  | ivan coronel      |8000-La transferencia fue aceptada|

@DR2@Tier3 
Scenario Outline: Carga operatoria DR2-TRAN NO GRAVA ORIGEN MON EXTR
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el campo CBU Beneficiario <CBUBeneficiario>
And completo el campo CUIT CUIL Beneficiario <cuitCuilBeneficiario>
And completo el desplegable Codigo de transferencia <codigoDeTransferencia>
And completo el campo concepto <concepto>
And completo el campo CBU Ordenante <CBUOrdenante>
And completo el campo CUIT CUIL Ordenante <cuitCuilOrdenante>
And completo el campo nombre ordenante <nombreOrdenante>
And completo el desplegable declaro conocer a mi cliente <declaroConocerCliente> "2"
And completo el desplegable Ordenante PEP-Pers Exp Politc <PEPpers> "3"
And completo el campo nombre beneficiario <nombreBeneficiario>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                       | cuentaDeudora                               | entidadAcreedora               | cuentaAcreedora                                | importe | CBUBeneficiario       | cuitCuilBeneficiario| codigoDeTransferencia| concepto| CBUOrdenante          | cuitCuilOrdenante| nombreOrdenante| declaroConocerCliente                                                       | PEPpers| nombreBeneficiario|resultadoEnvio                    | 
    | DR2-TRAN NO GRAVA ORIGEN MON EXTR| 80017-CTA VISTA DLS-Banco BBVA Argentina S.A| 72-BANCO SANTANDER ARGENTINA SA| 80072-CTA VISTA DLS- BCO SANTANDER ARGENTINA SA| 20000,00| 0720247821000000639441| 30709805386         | ALQ-Alquileres       | prueba  | 0170508926000000010117| 30686314118      | Don Prueba     | SI-Declaro conocer a mi cliente. Ley 25246-Encubrimiento y Lavado de Activos| SI-Si  | ivan coronel      |8000-La transferencia fue aceptada|

@DT0@Tier3 
Scenario Outline: Carga operatoria DT0-OPERACIONES PROPIAS
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el desplegable Concepto de la operacion <conceptoOperacion>
And completo el campo CUIT del Beneficiario <CUITdelBeneficiario>
And completo el campo CBU Beneficiario <CBUBeneficiario>
And completo el campo N de factura o referencia <nFacturaOReferncia>
And completo el campo Observaciones <Observaciones>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria             | cuentaDeudora                          | entidadAcreedora        | cuentaAcreedora        | importe | conceptoOperacion              | CUITdelBeneficiario| CBUBeneficiario       | nFacturaOReferncia| Observaciones          |resultadoEnvio                    |
    | DT0-OPERACIONES PROPIAS| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 34-Banco Patagonia S. A.| 34-BANCO PATAGONIA S.A.| 20000,00| 01-Compra de cartera crediticia| 20313262090        | 0340106008106003211008| 345678            | prueba automatizada    |8000-La transferencia fue aceptada|  

@GC0@Tier3 
Scenario Outline: Carga operatoria GC0-TRANSF FDOS-ACRED EN CTA BCRA
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el campo CUIT otorgante <CUITotorgante>
And completo el campo CBU otorgante <CBUotorgante>
And completo el campo CUIT del Beneficiario <CUITdelBeneficiario>
And completo el campo Observaciones <Observaciones>
And completo el desplegable declaro conocer a mi cliente <declaroConocerCliente> "1"
And completo el desplegable Ordenante PEP-Pers Exp Politc <PEPpers> "2"
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                       | cuentaDeudora                          | entidadAcreedora                | cuentaAcreedora                          | importe | CUITotorgante| CBUotorgante          | CUITdelBeneficiario| Observaciones      | declaroConocerCliente                                                                                | PEPpers|resultadoEnvio                     | 
    | GC0-TRANSF FDOS-ACRED EN CTA BCRA| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 7-BANCO DE GALICIA Y BUENOS AIRE| 7-BCO.DE GALICIA Y BS.AS.SA-CTA.CTE.en $| 20000,00| 30710918178  | 0170039820000002312000| 30592238892        | Prueba automatizada| SI-En transacción de 3ros., declaro conocer a mi cliente. Ley 25246-Encubrimiento y Lavado de Activos| SI-Si  | 8000-La transferencia fue aceptada|

@GC1@Tier3 
Scenario Outline: Carga operatoria GC1-SUSC FDO COM INV/FIDEICOMISOS
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el campo origen de los fondos <origenFondos> "1"
And completo el campo CUIT-CUIL-CDI <cuitCuilCdi>
And completo el campo CBU Ordenante <CBUOrdenante>
And completo el campo CBU destino <CBUdestinoFinal>
And completo el campo CUIT destinatario final <CUITdestinatarioFinal>
And completo el campo concepto <concepto>
And completo el desplegable tipo de inversion <tipoInversion> "2"
And completo el desplegable declaro conocer a mi cliente <declaroConocerCliente> "3"
And completo el desplegable Ordenante PEP-Pers Exp Politc <PEPpers> "4"
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                       | cuentaDeudora                          | entidadAcreedora                | cuentaAcreedora                         | importe | origenFondos| cuitCuilCdi| CBUOrdenante          | CBUdestinoFinal       | CUITdestinatarioFinal| concepto| tipoInversion              | declaroConocerCliente                                                       | PEPpers| resultadoEnvio                     |
    | GC1-SUSC FDO COM INV/FIDEICOMISOS| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 7-BANCO DE GALICIA Y BUENOS AIRE| 7-BCO.DE GALICIA Y BS.AS.SA-CTA.CTE.en $| 20000,00| 1-Propios   | 30710918178| 0170039820000002312000| 0070040520000005053188|  30592238892         | prueba  | 01-Fondo Comun de Inversion| SI-Declaro conocer a mi cliente. Ley 25246-Encubrimiento y Lavado de Activos| NO-No  | 8000-La transferencia fue aceptada |

@PF1@Tier3 
Scenario Outline: Carga operatoria PF1-PLAZO FIJO-CONSTITUC.CERTIF.
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el campo Nro cert-exped judicial-refer <nroCert>
And completo el campo CBU Ordenante <CBUOrdenanteOpcional>
And completo el campo CUIT CUIL Ordenante <cuitCuilOrdenante>
And completo el campo Titular-Carátula Judicial <titular>
And completo el desplegable declaro conocer a mi cliente <declaroConocerCliente> "1"
And completo el campo Observaciones <Observaciones>
And completo el desplegable Ordenante PEP-Pers Exp Politc <PEPpers> "2"
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                      | cuentaDeudora                          | entidadAcreedora               | cuentaAcreedora                          | importe | nroCert | CBUOrdenanteOpcional  | cuitCuilOrdenante| titular    | declaroConocerCliente                                                       | Observaciones| PEPpers|resultadoEnvio                     | 
    | PF1-PLAZO FIJO-CONSTITUC.CERTIF.| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 11-Banco de la Nacion Argentina| 11-BCO.DE LA NACION ARGENTIN-CTA.CTE.en $| 20000,00| 12345678| 0170461120000000103277| 30697668973      | prueba test| SI-Declaro conocer a mi cliente. Ley 25246-Encubrimiento y Lavado de Activos| prueba       | SI-Si  | 8000-La transferencia fue aceptada|

@PF2@Tier3 
Scenario Outline: Carga operatoria PF2-PLAZO FIJO-CANCEL.CERTIFIC.
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el campo Nro. de certificado o referenc <nCertificado>
And completo el tipo de operatoria con <tipo>
And completo el campo CBU Beneficiario <CBUBeneficiarioOpcional>
And completo el campo CUIT CUIL Beneficiario <cuitCuilBeneficiario>
And completo el campo titular <titular>
And completo el desplegable declaro conocer a mi cliente <declaroConocerCliente> "2"
And completo el campo Observaciones <Observaciones>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                     | cuentaDeudora                          | entidadAcreedora               | cuentaAcreedora                          | importe | nCertificado| tipo                  | CBUBeneficiarioOpcional| cuitCuilBeneficiario| titular| declaroConocerCliente                                                       | Observaciones      | resultadoEnvio                    | 
    | PF2-PLAZO FIJO-CANCEL.CERTIFIC.| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 11-Banco de la Nacion Argentina| 11-BCO.DE LA NACION ARGENTIN-CTA.CTE.en $| 20000,00| 12345678    | 02-Cancelacion Parcial| 0110807930080700458397 | 20439332205         | Prueba | SI-Declaro conocer a mi cliente. Ley 25246-Encubrimiento y Lavado de Activos| prueba automatizada| 8000-La transferencia fue aceptada|

@PRE@Tier3 
Scenario Outline: Carga operatoria PRE-PRESTAMOS
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el tipo de operatoria con <tipo>
And completo el campo CBU origen <CBUorigen>
And completo el campo CUIT-CUIL-CDI <cuitCuilCdi>
And completo el campo CBU destino <CBUdestino>
And completo el campo Sucursal de Entidad de Destino <entidadDestino>
And completo el Nro de Referencia <NrodePrestamoReferencia>
And completo el campo Apellido y Nombre del Titular <apellidoYNombre>
And completo el campo Observaciones <Observaciones>
And completo el desplegable declaro conocer a mi cliente <declaroConocerCliente> "2"
And completo el desplegable Ordenante PEP-Pers Exp Politc <PEPpers> "3"
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria   | cuentaDeudora                          | entidadAcreedora               | cuentaAcreedora                          | importe | tipo           | CBUorigen             | cuitCuilCdi| CBUdestino            | entidadDestino| NrodePrestamoReferencia| apellidoYNombre |Observaciones| declaroConocerCliente                                                                                | PEPpers| resultadoEnvio                    | 
    | PRE-PRESTAMOS| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 11-Banco de la Nacion Argentina| 11-BCO.DE LA NACION ARGENTIN-CTA.CTE.en $| 20000,00| 01-Otorgamiento|                       | 20439332205| 0110807930080700458397| test          | 12345678               | Prueba Test     |prueba       | SI-En transacción de 3ros., declaro conocer a mi cliente. Ley 25246-Encubrimiento y Lavado de Activos| NO-No  | 8000-La transferencia fue aceptada|

@D00@Tier3  
Scenario Outline: Carga operatoria D00-CANCELAC SALDO DEU CEC (OTROS)
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el tipo de operatoria con <tipo>
And completo el campo entidad representada <entidadRepresentada>
Then se carga correctamente la operatoria y muestra el numero de movimiento
When cierro sesion
When me encuentro en la pagina de login
And ingreso el usuario 1
And hago click en buscar
And cargo la operatoria creada
Then Envio la operatoria <resultadoEnvio>
Examples:
    | operatoria                        | cuentaDeudora                          | entidadAcreedora       | cuentaAcreedora                  | importe | tipo                | entidadRepresentada| resultadoEnvio                   |
    | D00-CANCELAC SALDO DEU CEC (OTROS)| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 91388-INTERBANKING S.A.| 91388-INTERBANKING SA-CTACTE EN $| 20000,00| AMEX-American Expres| test automation    | 8000-La transferencia fue aceptada| 


########## CARGA DE OPERATORIAS CON ERRORES ##########
@operatoriaNoOk
Scenario Outline: Carga operatoria DAD-SOL. BILL. TESOROS REGIONALE con importe incorrecto
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo cuenta deudora <cuentaDeudora>
And completo entidad acreedora <entidadAcreedora>
And completo cuenta acreedora <cuentaAcreedora>
And completo el campo importe <importe>
And completo el tipo de operatoria con <tipo>
And completo los campos billete <billete>
And completo el campo codigo de retiro <codigo>
And completo el campo codigo de provision <provision>
Then no se carga la operatoria e indica el mensaje <error>
Examples:
    | operatoria                      | cuentaDeudora                          | entidadAcreedora                | cuentaAcreedora              | importe | tipo               |billete|codigo|provision|error                                          |
    | DAD-SOL. BILL. TESOROS REGIONALE| 17-Banco BBVA Argentina S.A.CTA.CTE.en$| 30-Banco Central de la República| 600-BCRA - GERENCIA DE TESORO| 20000,00| TRE02-T REG MENDOZA|2     |01-   |1-BCRA.   |El valor acumulado y el importe no son iguales |

@campoVacio
Scenario Outline: operatoria DAD-SOL. BILL. TESOROS REGIONALE cuenta deudora vacio
Given estoy en carga manual de operatoria
When ingreso la operatoria <operatoria>
And completo el campo importe <importe>
And completo el tipo de operatoria con <tipo>
And completo los campos billete <billete>
And completo el campo codigo de retiro <codigo>
And completo el campo codigo de provision <provision>
Then no se carga la operatoria e indica el mensaje <error>
Examples:
    | operatoria                      | importe | tipo               |billete|codigo|provision|error               |
    | DAD-SOL. BILL. TESOROS REGIONALE| 20000,00| TRE02-T REG MENDOZA|20     |01-   |1-BCRA.  |Formulario inválido |
