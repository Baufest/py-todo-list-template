const fs = require('node:fs');
import { Given,When, Then, getStepClassInstance } from "@testing/cucumber-runner";
import { pageProvider } from "@testing/wdio-page-objects";
import { expect } from "chai";
import { DashboardPage } from "../login/dashboard.page";
import { CargaManualPage } from "./cargaManual.page";
import { ValidacionCargaManual } from "./validacionCargaManual.page";
import allureReporter from '@wdio/allure-reporter';
import { ValidacionLoadPage } from "../login/validacionLoad.page";

export class cargaManualSteps {

    get dashboardPage() {
        return pageProvider.wait(DashboardPage);
    }

    get cargaManual() {
        return pageProvider.wait(CargaManualPage);
    }

    get validacionCargaManual() {
        return pageProvider.wait(ValidacionCargaManual);
    }

    get validacionLoadPage() {
        return pageProvider.wait(ValidacionLoadPage);
    }

    @Given(/^estoy en carga manual de operatoria$/)
    async estoyEncargaManualDeoperatoria() {
        await (await this.validacionLoadPage).seCierraSpinnerLoad();
        await (await this.dashboardPage).clickMenu();
        await (await this.dashboardPage).clickCargaManual();
    }

    @Then(/^ingreso la operatoria (.*)$/)
    async ingresoLaOperatoria(texto:string) {
        console.log(`se carga la operatoria ${texto}`);
        const filePath = './numeroOperatoriaCargada.json';
        await (await this.cargaManual).cargarOperatoria(texto, "selector1");
        let data: { operatoria?: string } = {};
        if (fs.existsSync(filePath)) {
            data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
        data.operatoria = texto;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }

    @Then(/^completo cuenta deudora (.*)$/)
    async completoCuentaDeudora(cuentaDeudora: string){
        await (await this.cargaManual).cargarOperatoria(cuentaDeudora, "selector2");
    }

    @Then(/^completo entidad acreedora (.*)$/)
    async completoEntidadAcreedora(entidadAcreedora: string){
        await (await this.cargaManual).cargarOperatoria(entidadAcreedora, "selector3");
    }

    @Then(/^completo cuenta acreedora (.*)$/)
    async completoCuentaAcreedora(cuentaAcreedora: string){
        await (await this.cargaManual).cargarOperatoria(cuentaAcreedora, "selector4");
    }

    @Then(/^completo el campo importe (.*)$/)
    async completoElCampoImporte(importe: string){
        await (await this.cargaManual).cargarImporte(importe);
    }

    @Then(/^completo el tipo de operatoria con (.*)$/)
    async completoEltipoDeOperatoria(tipo: string){
        await (await this.cargaManual).seleccionarDropDown(tipo, '1');
    }

    @Then(/^completo el desplegable concepto (.*)$/)
    async completoDesplegableConcepto(tipo: string){
        await (await this.cargaManual).seleccionarDropDown(tipo, '1');
    }

    @Then(/^se carga correctamente la operatoria y muestra el numero de movimiento$/)
    async seCargaCorrectamenteLaOperatoriaYMuestraElNumeroDeMovimiento(){
        const textoEsperado = "Se ha cargado el movimiento n°";
        const filePath = './numeroOperatoriaCargada.json';
        await (await this.cargaManual).enviarFormulario();
        let texto = await (await this.validacionCargaManual).validarEnvio();
        console.log(texto);
        const numeroEnvio = texto.match(/\d+/)[0];
        let data: { numero?: string } = {};
        if (fs.existsSync(filePath)) {
            data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
        data.numero = numeroEnvio;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        expect(texto).to.include(textoEsperado);
    }

    @Then(/^completo los campos billete (.*)$/)
    async completoLosCamposBillete(cantBillete: string){
        await (await this.cargaManual).cargaDeDenominacion(cantBillete);
    }

    @Then(/^completo el campo codigo de retiro (.*)$/)
    async completoCodigoRetiro(tipo:string){
        await (await this.cargaManual).seleccionarDropDown(tipo, '2');
    }

    @Then(/^completo el campo origen de los fondos (.*) "(.*)"$/)
    async completoElCampoOrigenDeLosFondos(tipo:string, ubicacion:string){
        await (await this.cargaManual).seleccionarDropDown(tipo, ubicacion);
    }

    @Then(/^completo el campo codigo de provision (.*)$/)
    async completoCampoProvision(tipo:string){
        await (await this.cargaManual).seleccionarDropDown(tipo, '3');
    }

    @Then(/^completo el desplegable conozco cliente-PEP (.*)$/)
    async completoCampoConozcoClientePEP(tipo:string){
        await (await this.cargaManual).seleccionarDropDown(tipo, '3');
    }

    @Then(/^no se carga la operatoria e indica el mensaje (.*)$/)
    async noSeCargaLaOperatoria(mensajeError:string){
        await (await this.cargaManual).enviarFormulario();
        await (await this.cargaManual).mensajeDeError();
    }

    @Then(/^completo el campo Nombre del FCI (.*)$/)
    async completoElCampoNombreDelFCI(nombreFCI:string){
        await (await this.cargaManual).completarNombreFCI(nombreFCI);
    }

    @Then(/^completo el campo CUIT Entidad Administradora (.*)$/)
    async completoElcampoCUIT(cuit:string){
        await (await this.cargaManual).completarCuitEntidadAdministradora(cuit);
    }

    @Then(/^completo el campo CUIT ENT ADM (.*)$/)
    async completoElCampoCuitEntAdm(cuitEntAdn:string){
        await (await this.cargaManual).completarCuitEntAdm(cuitEntAdn);
    }

    @Then(/^completo el campo CUIT-CUIL-CDI (.*)$/)
    async completoElCampoCuitCuilCdi(cuitEntAdn:string){
        await (await this.cargaManual).completarCuitCuilCdi(cuitEntAdn);
    }

    @Then(/^completo el Nro de Referencia (.*)$/)
    async completoElNroDeReferencia(NrodeReferencia:string){
        await (await this.cargaManual).completarNroDeReferencia(NrodeReferencia);
    } 

    @Then(/^completo el campo CUIT del Ordenante (.*)$/)
    async completoElCUITdelOrdenante(CUITdelOrdenante:string){
        await (await this.cargaManual).completarCUITDelOrdenante(CUITdelOrdenante);
    } 

    @Then(/^completo el campo Plazo en dias (.*)$/)
    async completoElPlazoEnDias(PlazoEnDias:string){
        await (await this.cargaManual).completarPlazoEnDias(PlazoEnDias);
    } 

    @Then(/^completo el campo Tasa de Interes (.*)$/)
    async completoElTasaDeInteres(TasaDeInteres:string){
        await (await this.cargaManual).completarTasaDeInteres(TasaDeInteres);
    } 

    @Then(/^completo el campo opcional Tipo de tasa (.*)$/)
    async completoElTipoDeTasa(TipoDeTasa:string){
        await (await this.cargaManual).completarTipoDeTasa(TipoDeTasa);
    } 

    @Then(/^completo el campo Observaciones (.*)$/)
    async completoElObservaciones(Observaciones:string){
        await (await this.cargaManual).completarObservaciones(Observaciones);
    } 

    @Then(/^completo el campo texto libre (.*)$/)
    async completoEltextoLibre(textoLibre:string){
        await (await this.cargaManual).completarTextoLibre(textoLibre);
    } 

    @Then(/^completo el campo texto libreBis (.*)$/)
    async completoEltextoLibreBis(textoLibreBis:string){
        await (await this.cargaManual).completarTextoLibreBis(textoLibreBis);
    } 

    @Then(/^completo el campo CUIT del Beneficiario (.*)$/)
    async completoElCUITdelBeneficiario(CUITdelBeneficiario:string){
        await (await this.cargaManual).completarCUITdelBeneficiario(CUITdelBeneficiario);
    } 

    @Then(/^completo el desplegable Concepto de pago (.*)$/)
    async completoElConceptoDePago(tipo:string){
        await (await this.cargaManual).seleccionarDropDown(tipo, '1');
    }

    @Then(/^completo el desplegable origen de los fondos (.*)$/)
    async completoElOrigenDeLosFondos(tipo:string){
        await (await this.cargaManual).seleccionarDropDown(tipo, '1');
    }

    @Then(/^completo el campo Ordenante CUIT-CUIL-CDI (.*)$/)
    async completoElCUIT_CUIL_CDIdelOrdenante(CUIT_CUIL_CDIdelOrdenante:string){
        await (await this.cargaManual).completarCUIT_CUIL_CDIdelOrdenante(CUIT_CUIL_CDIdelOrdenante);
    } 

    @Then(/^completo el campo CBU Ordenante (.*)$/)
    async completoElCBUOrdenante(CBUOrdenante:string){
        await (await this.cargaManual).completarCBUOrdenante(CBUOrdenante);
    } 

    @Then(/^completo el campo Beneficiario CUIT-CUIL-CDI (.*)$/)
    async completoElBeneficiarioCUIT_CUIL_CDI(beneficiarioCUIT_CUIL_CDI:string){
        await (await this.cargaManual).completarBeneficiarioCUIT_CUIL_CDI(beneficiarioCUIT_CUIL_CDI);
    } 

    @Then(/^completo el campo CBU Beneficiario (.*)$/)
    async completoElCBUBeneficiario(CBUBeneficiario:string){
        await (await this.cargaManual).completarCBUBeneficiario(CBUBeneficiario);
    } 

    @Then(/^completo el desplegable Tipo de Operacion (.*)$/)
    async completoElTipoOperacion(tipo:string){
        await (await this.cargaManual).seleccionarDropDown(tipo, '2');
    } 

    @Then(/^completo el campo opcional Especie (.*)$/)
    async completoElEspecie(especie:string){
        await (await this.cargaManual).completarEspecie(especie);
    } 

    @Then(/^completo el campo Nro de cupon (.*)$/)
    async completoNroCupon(nroCupon:string){
        await (await this.cargaManual).completarNroCupon(nroCupon);
    } 

    @Then(/^completo el campo CUIT CUIL Beneficiario (.*)$/)
    async completoCuitCuilBeneficiario(cuitCuilBeneficiario:string){
        await (await this.cargaManual).completarCuitCuilBeneficiario(cuitCuilBeneficiario);
    } 

    @Then(/^completo el desplegable Codigo de transferencia (.*)$/)
    async completoCodigoDeTransferencia(tipo:string){
        await (await this.cargaManual).seleccionarDropDown(tipo, '1');
    } 

    @Then(/^completo el campo concepto (.*)$/)
    async completoConcepto(concepto:string){
        await (await this.cargaManual).completarConcepto(concepto);
    } 

    @Then(/^completo el campo CUIT CUIL Ordenante (.*)$/)
    async completoCuitCuilOrdenante(cuitCuilOrdenante:string){
        await (await this.cargaManual).completarCuitCuilOrdenante(cuitCuilOrdenante);
    } 

    @Then(/^completo el campo nombre ordenante (.*)$/)
    async completoNombreOrdenante(nombreOrdenante:string){
        await (await this.cargaManual).completarNombreOrdenante(nombreOrdenante);
    } 

    @Then(/^completo el desplegable declaro conocer a mi cliente (.*) "(.*)"$/)
    async completoDeclaroConocerCliente(tipo:string, ubicacion:string){
        await (await this.cargaManual).seleccionarDropDown(tipo, ubicacion);
    } 

    @Then(/^completo el desplegable Ordenante PEP-Pers Exp Politc (.*) "(.*)"$/)
    async completoOrdenantePEPPersExpPolitc(tipo:string, ubicacion:string){
        await (await this.cargaManual).seleccionarDropDown(tipo, ubicacion);
    } 

    @Then(/^completo el desplegable tipo de cuenta ordenante (.*)$/)
    async completoTipoDeCuentaOrdenante(tipo:string){
        await (await this.cargaManual).seleccionarDropDown(tipo, '4');
    } 

    @When(/^completo el campo nombre beneficiario (.*)$/)
    async completoNombreBeneficiario(nombreBeneficiario:string){
        await (await this.cargaManual).completarNombreBeneficiario(nombreBeneficiario);
    } 

    @When(/^completo el desplegable Concepto Acreditacion (.*)$/)
    async completoConceptoAcreditacion(tipo:string){
        await (await this.cargaManual).seleccionarDropDown(tipo, '1');
    } 

    @When(/^completo el desplegable Concepto Cancelacion (.*)$/)
    async completoConceptoCancelacion(tipo:string){
        await (await this.cargaManual).seleccionarDropDown(tipo, '1');
    }
    
    @When(/^completo el campo Nro de operacion o boleto (.*)$/)
    async obtenerNroOperacionOBoleto(nroOperacionOBoleto:string){
        await (await this.cargaManual).obtenerNroOperacionOBoleto(nroOperacionOBoleto);
    } 

    @When(/^completo el campo CUIT entidad destino (.*)$/)
    async obtenerCuitEntidadDestino(cuitEntidadDestino:string){
        await (await this.cargaManual).obtenerCuitEntidadDestino(cuitEntidadDestino);
    }

    @When(/^completo el desplegable Codigo moneda (.*)$/)
    async completoCodigoMoneda(tipo:string){
        await (await this.cargaManual).seleccionarDropDown(tipo, '1');
    }

    @When(/^completo el campo Cant. moneda (.*)$/)
    async obtenerCantMoneda(cantMoneda:string){
        await (await this.cargaManual).obtenerCantMoneda(cantMoneda);
    }

    @When(/^completo el campo Tipo de cambio (.*)$/)
    async obtenerTipoDeCambio(tipoDeCambio:string){
        await (await this.cargaManual).obtenerTipoDeCambio(tipoDeCambio);
    }

    @Then(/^completo el desplegable Concepto de la operacion (.*)$/)
    async completoElConceptoDeLaOperacion(tipo:string){
        await (await this.cargaManual).seleccionarDropDown(tipo, '1');
    }

    @When(/^completo el campo N de factura o referencia (.*)$/)
    async completoNumeroDeFacturaOReferencia(facturaOReferrencia:string){
        await (await this.cargaManual).obtenerNumeroFacturaOReferencia(facturaOReferrencia);
    }

    @When(/^completo el campo CUIT otorgante (.*)$/)
    async completoCUITotorgante(CUITotorgante:string){
        await (await this.cargaManual).obtenerCUITotorgante(CUITotorgante);
    }
     
    @When(/^completo el campo CBU otorgante (.*)$/)
    async completoCBUotorgante(CBUotorgante:string){
        await (await this.cargaManual).obtenerCBUotorgante(CBUotorgante);
    }

    @When(/^completo el campo CBU destino(.*)$/)
    async completoCBUdestinoFinal(CBUdestino:string){
        await (await this.cargaManual).obtenerCBUdestinoFinal(CBUdestino);
    }

    @When(/^completo el campo CUIT destinatario final (.*)$/)
    async completoCUITdestinatario(CUITdestinatario:string){
        await (await this.cargaManual).obtenerCUITdestinatario(CUITdestinatario);
    }

    @Then(/^completo el desplegable tipo de inversion (.*) "(.*)"$/)
    async completoTipoInversion(tipo:string, ubicacion:string){
        await (await this.cargaManual).seleccionarDropDown(tipo, ubicacion);
    }

    @When(/^completo el campo Nro cert-exped judicial-refer (.*)$/)
    async completoNroCertExpedJudicialRefer(nroCertExpedJudicialRefer:string){
        await (await this.cargaManual).obtenerNroCertExpedJudicialRefer(nroCertExpedJudicialRefer);
    }

    @When(/^completo el campo Titular-Carátula Judicial (.*)$/)
    async completoTitularCarátulaJudicial(titularCarátulaJudicial:string){
        await (await this.cargaManual).obtenerTitularCarátulaJudicial(titularCarátulaJudicial);
    }

    @When(/^completo el campo Nro. de certificado o referenc (.*)$/)
    async completoNDeCertificadoOReferenc(nDeCertificadoOReferenc:string){
        await (await this.cargaManual).obtenerNDeCertificadoOReferenc(nDeCertificadoOReferenc);
    }

    @When(/^completo el campo titular (.*)$/)
    async completoTitular(titular:string){
        await (await this.cargaManual).obtenerTitular(titular);
    }

    @When(/^completo el campo CBU origen (.*)$/)
    async completoCBUOrigen(cbuOrigen:string){
        await (await this.cargaManual).obtenerCbuOrigen(cbuOrigen);
    }

    @When(/^completo el campo Sucursal de Entidad de Destino (.*)$/)
    async completoEntidadDestino(entidadDestino:string){
        await (await this.cargaManual).obtenerEntidadDestino(entidadDestino);
    }

    @When(/^completo el campo Apellido y Nombre del Titular (.*)$/)
    async completoApellidoYNombreDelTitular(apellidoNombreTitular:string){
        await (await this.cargaManual).obtenerApellidoYNombreDelTitular(apellidoNombreTitular);
    }

    @When(/^completo el campo entidad representada (.*)$/)
    async completoElCampoEntidadRepresentada(entidadRepresentada:string){
        await (await this.cargaManual).obtenerEntidadRepresentada(entidadRepresentada);
    }


}


