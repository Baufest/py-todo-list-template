import { Page, PageContext, pageProvider } from "@testing/wdio-page-objects";
import { expect } from 'chai';

const selectors = {

    shadowHost: '//manual-load-page[@id="0"]',
    shadowVerificarEnvio: '//manual-load-page[@id="4"]',
    inputImporte: '#amount-field > :first-child',
    inputCantBillete: 'bbva-web-form-amount > [aria-label="Denominación $ 2000 ( )"]',
    inputCuentas: '> bbva-web-form-select-filter-input > :first-child',
    mensajeError: 'bbva-notification-status:last-of-type',
    inputNombreFCI: 'input[aria-label="Nombre del FCI"]',
    inputCuitEntidadAdministradora: 'input[aria-label="CUIT Entidad Administradora"]',
    inputCuitEntAdm: 'input[aria-label="CUIT ENT ADM"]',
    inputCuitCuilCdi: 'input[aria-label*="CUIT/CUIL/CDI"]',
    inputNroDeReferencia: 'input[aria-label="Nro de Referencia" i], input[aria-label="N° Préstamo o referencia" i]',
    inputCUITdelOrdenante: 'input[aria-label="CUIT del Ordenante"]',
    inputPlazoEnDias: 'input[aria-label="Plazo en dias ( )"]',
    inputTasaDeInteres: 'input[aria-label="Tasa de Interes ( )"]',
    inputTipoDeTasa: 'input[aria-label="Tipo de tasa (opcional)"]',
    inputObservaciones: 'input[aria-label^="Observaciones" i], input[aria-label^="Obervaciones" i]',
    inputTextoLibre: 'input[aria-label="texto libre"]',
    inputTextoLibreBis: 'input[aria-label="texto libre bis"]',
    inputCUITDelBeneficiario: 'input[aria-label*="CUIT Beneficiario" i], input[aria-label*="CUIT del Beneficiario" i]',
    inputCUIT_CUIL_CDIdelOrdenante: 'input[aria-label="CUIT/CUIL/CDI Ordenante"]',
    inputCBUOrdenante: 'input[aria-label^="CBU Ordenante" i], input[aria-label^="CBU - Ordenante" i]',
    inputBeneficiarioCUIT_CUIL_CDI:'input[aria-label="CUIT/CUIL/CDI Beneficiario"]',
    inputCBUBeneficiario:'input[aria-label^="CBU Beneficiario"]',
    inputEspecie:'input[aria-label="Especie (opcional)"]',
    inputNroCupon:'input[aria-label="Nro de cupon ( )"]',
    inputCuitCuilBeneficiario:'input[aria-label="CUIT / CUIL Beneficiario"], input[aria-label*="CUIT/CUIL Beneficiario"]',
    inputConcepto: 'input[aria-label="Concepto"]',
    inputCuitCuilOrdenante:'input[aria-label*="CUIT / CUIL Ordenante"], input[aria-label*="CUIT/CUIL Ordenante"]',
    inputNombreOrdenante:'input[aria-label="Nombre ordenante"]',
    inputNombreBeneficiario:'input[aria-label="Nombre beneficiario" i]',
    inputNroOperacionOBoleto:'input[aria-label="Nro de operacion o boleto"]',
    inputCuitEntidadDestino:'input[aria-label="CUIT entidad destino"]',
    inputCantMoneda:'input[aria-label="Cant. moneda ( )"]',
    inputTipoDeCambio:'input[aria-label="Tipo de cambio ( )"]',
    dinamicForm: 'div[id="dynamic-form"]',
    nFacturaOReferencia: 'input[aria-label*="N° de Factura o Referencia" i]',
    cuitOtorgante: 'input[aria-label*="CUIT Otorgante" i]',
    cbuOtorgante: 'input[aria-label*="CBU Otorgante" i]',
    cbuDestino: 'input[aria-label*="CBU Destino" i]',
    cuitDestinatario: 'input[aria-label*="CUIT Destinatario final" i]',
    nroCertExpedJudicialRefer: 'input[aria-label*="Nro cert/exped judicial/refer" i]',
    titularCarátulaJudicial: 'input[aria-label*="Titular/Carátula Judicial" i]',
    inputNDeCertificadoOReferenc: 'input[aria-label*="Nro. de certificado o referenc" i]',
    inputTitular: 'input[aria-label*="Titular" i]',
    inputCbuOrigen: 'input[aria-label*="CBU Origen" i]',
    inputEntidadDestino: 'input[aria-label*="Sucursal de Entidad de Destino" i]',
    inputApellidoYNombreDelTitular: 'input[aria-label*="Apellido y Nombre del Titular" i]',
    inputEntidadRepresentada: 'input[aria-label*="Entidad representada" i]'
    
}

@PageContext({
    path: 'mep/#!/manualload',
    wrapper: '#selector1',
})

export class CargaManualPage extends Page {

    async cargarOperatoria(texto: string, selector:string){
        //selecciono el campo operatoria
        const dropDown = await $(selectors.shadowHost).shadow$(`bbva-web-form-select-filter[id=${selector}]`);
        await dropDown.click();
        const input = await $(selectors.shadowHost).shadow$(`#${selector} ${selectors.inputCuentas}`);
        
        await input.setValue(texto);
       //selecciono la opcion que viene por el parametro texto
        const opciones = await $(selectors.shadowHost).shadow$$(`#${selector} [role="option"]:not([hidden])`);
        const opcionesNumber = await opciones.length;
        for (let i = 0; i < opcionesNumber; i++) {
            const getTexto = await opcionesNumber[i].getText();
            if (getTexto === texto) {
                const isEnabled = await opcionesNumber[i].isEnabled();
        
                if (isEnabled) {
                    await opcionesNumber[i].click();  
                    break;
                } else {
                    console.log("Elemento no habilitado para hacer click");
                }
            }
        }

    }

    async cargarImporte(monto:string){
        const importe = await $(selectors.shadowHost).shadow$(selectors.inputImporte);
        await importe.clearValue();
        await importe.setValue(monto);

    }

    async seleccionarDropDown(texto: string, tipo:string){
        const dropDown = (await $(selectors.shadowHost).shadow$(`div#dynamic-form > bbva-web-form-select:nth-of-type(${tipo})`));
        await dropDown.scrollIntoView();
        const dropDown2 = await dropDown.shadow$(`#button`);
        await dropDown2.scrollIntoView();
        await dropDown2.click();

        const opciones = await dropDown.shadow$$(`#list [role="option"]`);
        const opcionesNumber = await opciones.length;
        for (let i = 0; i < opcionesNumber; i++) {
        
            const getTexto = await opcionesNumber[i].getText();
            if (getTexto === texto) {
                await opcionesNumber[i].waitForDisplayed({ timeout: 5000, timeoutMsg: 'No se encontro el elemento'});
                const isEnabled = await opcionesNumber[i].isEnabled();
        
                if (isEnabled) {
                    await opcionesNumber[i].click(); 
                    break;
                } else {
                    console.log("Elemento no habilitado para hacer click");
                }
            }
        }
    }

    async enviarFormulario(){
        const enviarForm = (await $(selectors.shadowHost).shadow$('#send'));
        await enviarForm.click()
    }

    async cargaDeDenominacion(cantBillete:string){
        const billete1 = (await $(selectors.shadowHost).shadow$(selectors.inputCantBillete));
        await billete1.clearValue();
        await billete1.setValue(cantBillete);
    }

    async mensajeDeError(){
        const mensajeError = (await $(selectors.shadowVerificarEnvio).shadow$(selectors.mensajeError));
        const mensaje = await (mensajeError).getText();
        console.log(mensaje);
    }

    async completarNombreFCI(dato:string){
        const nombreFCI = (await $(selectors.shadowHost).shadow$(selectors.inputNombreFCI));
        await nombreFCI.setValue(dato);
    }

    async completarCuitEntidadAdministradora(dato:string){
        const nombreFCI = (await $(selectors.shadowHost).shadow$(selectors.inputCuitEntidadAdministradora));
        await nombreFCI.setValue(dato);
    }

    async completarCuitEntAdm(dato:string){
        const nombreFCI = (await $(selectors.shadowHost).shadow$(selectors.inputCuitEntAdm));
        await nombreFCI.setValue(dato);
    }

    async completarCuitCuilCdi(dato:string){
        const nombreFCI = (await $(selectors.shadowHost).shadow$(selectors.inputCuitCuilCdi));
        await nombreFCI.setValue(dato);
    }

    async completarNroDeReferencia(dato:string){
        const nombreFCI = (await $(selectors.shadowHost).shadow$(selectors.inputNroDeReferencia));
        await nombreFCI.setValue(dato);
    }

    async completarCUITDelOrdenante(dato:string){
        const nombreFCI = (await $(selectors.shadowHost).shadow$(selectors.inputCUITdelOrdenante));
        await nombreFCI.setValue(dato);
    }

    async completarPlazoEnDias(dato:string){
        const nombreFCI = (await $(selectors.shadowHost).shadow$(selectors.inputPlazoEnDias));
        await nombreFCI.setValue(dato);
    }

    async completarTasaDeInteres(dato:string){
        const nombreFCI = (await $(selectors.shadowHost).shadow$(selectors.inputTasaDeInteres));
        await nombreFCI.setValue(dato);
    }

    async completarTipoDeTasa(dato:string){
        const nombreFCI = (await $(selectors.shadowHost).shadow$(selectors.inputTipoDeTasa));
        await nombreFCI.setValue(dato);
    }

    async completarObservaciones(dato:string){
        const observaciones = (await $(selectors.shadowHost).shadow$(selectors.inputObservaciones));
        await observaciones.setValue(dato);
    }

    async completarTextoLibre(dato:string){
        const nombreFCI = (await $(selectors.shadowHost).shadow$(selectors.inputTextoLibre));
        //nombreFCI.scrollIntoView();
        await nombreFCI.setValue(dato);
    }

    async completarTextoLibreBis(dato:string){
        const nombreFCI = (await $(selectors.shadowHost).shadow$(selectors.inputTextoLibreBis));
        nombreFCI.scrollIntoView();
        await nombreFCI.setValue(dato);
    }

    async completarCUITdelBeneficiario(dato:string){
        const CUITDelBeneficiario = (await $(selectors.shadowHost).shadow$(selectors.inputCUITDelBeneficiario));
        CUITDelBeneficiario.scrollIntoView();
        await CUITDelBeneficiario.setValue(dato);
    }

    async completarCUIT_CUIL_CDIdelOrdenante(dato:string){
        const CUIT_CUIL_CDI = (await $(selectors.shadowHost).shadow$(selectors.inputCUIT_CUIL_CDIdelOrdenante));
        CUIT_CUIL_CDI.scrollIntoView();
        await CUIT_CUIL_CDI.setValue(dato);
    }

    async completarCBUOrdenante(dato:string){
        const CBUOrdenante = (await $(selectors.shadowHost).shadow$(selectors.inputCBUOrdenante));
        CBUOrdenante.scrollIntoView();
        await CBUOrdenante.setValue(dato);
    }

    async completarBeneficiarioCUIT_CUIL_CDI(dato:string){
        const beneficiarioCUIT_CUIL_CDI = (await $(selectors.shadowHost).shadow$(selectors.inputBeneficiarioCUIT_CUIL_CDI));
        beneficiarioCUIT_CUIL_CDI.scrollIntoView();
        await beneficiarioCUIT_CUIL_CDI.setValue(dato);
    }

    async completarCBUBeneficiario(dato:string){
        const CBUBeneficiario = (await $(selectors.shadowHost).shadow$(selectors.inputCBUBeneficiario));
        CBUBeneficiario.scrollIntoView();
        await CBUBeneficiario.setValue(dato);
    }

    async completarEspecie(dato:string){
        const especie = (await $(selectors.shadowHost).shadow$(selectors.inputEspecie));
        especie.scrollIntoView();
        await especie.setValue(dato);
    }

    async completarNroCupon(dato:string){
        const nroCupon = (await $(selectors.shadowHost).shadow$(selectors.inputNroCupon));
        nroCupon.scrollIntoView();
        await nroCupon.setValue(dato);
    }

    async completarCuitCuilBeneficiario(dato:string){
        const cuitCuilBeneficiario = (await $(selectors.shadowHost).shadow$(selectors.inputCuitCuilBeneficiario));
        cuitCuilBeneficiario.scrollIntoView();
        await cuitCuilBeneficiario.setValue(dato);
    }

    async completarCuitCuilOrdenante(dato:string){
        const cuitCuilOrdenante = (await $(selectors.shadowHost).shadow$(selectors.inputCuitCuilOrdenante));
        cuitCuilOrdenante.scrollIntoView();
        await cuitCuilOrdenante.setValue(dato);
    }

    async completarNombreOrdenante(dato:string){
        const nombreOrdenante = (await $(selectors.shadowHost).shadow$(selectors.inputNombreOrdenante));
        nombreOrdenante.scrollIntoView();
        await nombreOrdenante.setValue(dato);
    }

    async completarConcepto(dato:string){
        const concepto = (await $(selectors.shadowHost).shadow$(selectors.inputConcepto));
        concepto.scrollIntoView();
        await concepto.setValue(dato);
    }

    async completarNombreBeneficiario(dato:string){
        const NombreBeneficiario = (await $(selectors.shadowHost).shadow$(selectors.inputNombreBeneficiario));
        NombreBeneficiario.scrollIntoView();
        await NombreBeneficiario.setValue(dato);
    }

    async obtenerNroOperacionOBoleto(dato:string){
        const nroOperacionOBoleto = (await $(selectors.shadowHost).shadow$(selectors.inputNroOperacionOBoleto));
        nroOperacionOBoleto.scrollIntoView();
        await nroOperacionOBoleto.setValue(dato);
    }

    async obtenerCuitEntidadDestino(dato:string){
        const cuitEntidadDestino = (await $(selectors.shadowHost).shadow$(selectors.inputCuitEntidadDestino));
        cuitEntidadDestino.scrollIntoView();
        await cuitEntidadDestino.setValue(dato);
    }

    async obtenerCantMoneda(dato:string){
        const cantMoneda = (await $(selectors.shadowHost).shadow$(selectors.inputCantMoneda));
        cantMoneda.scrollIntoView();
        await cantMoneda.setValue(dato);
    }

    async obtenerTipoDeCambio(dato:string){
        const tipoDeCambio = (await $(selectors.shadowHost).shadow$(selectors.inputTipoDeCambio));
        tipoDeCambio.scrollIntoView();
        await tipoDeCambio.setValue(dato);
    }

    async obtenerNumeroFacturaOReferencia(dato:string){
        const numeroFacturaOReferencia = (await $(selectors.shadowHost).shadow$(selectors.nFacturaOReferencia));
        numeroFacturaOReferencia.scrollIntoView();
        await numeroFacturaOReferencia.setValue(dato);
    }

    async obtenerCUITotorgante(dato:string){
        const CUITotorgante = (await $(selectors.shadowHost).shadow$(selectors.cuitOtorgante));
        CUITotorgante.scrollIntoView();
        await CUITotorgante.setValue(dato);
    }

    async obtenerCBUotorgante(dato:string){
        const CBUotorgante = (await $(selectors.shadowHost).shadow$(selectors.cbuOtorgante));
        CBUotorgante.scrollIntoView();
        await CBUotorgante.setValue(dato);
    }

    async obtenerCBUdestinoFinal(dato:string){
        const CBUdestino = (await $(selectors.shadowHost).shadow$(selectors.cbuDestino));
        CBUdestino.scrollIntoView();
        await CBUdestino.setValue(dato);
    }

    async obtenerCUITdestinatario(dato:string){
        const CUITdestino = (await $(selectors.shadowHost).shadow$(selectors.cuitDestinatario));
        CUITdestino.scrollIntoView();
        await CUITdestino.setValue(dato);
    }

    async obtenerNroCertExpedJudicialRefer(dato:string){
        const nroCertExpedJudicialRefer = (await $(selectors.shadowHost).shadow$(selectors.nroCertExpedJudicialRefer));
        nroCertExpedJudicialRefer.scrollIntoView();
        await nroCertExpedJudicialRefer.setValue(dato);
    }

    async obtenerTitularCarátulaJudicial(dato:string){
        const titularCarátulaJudicial = (await $(selectors.shadowHost).shadow$(selectors.titularCarátulaJudicial));
        titularCarátulaJudicial.scrollIntoView();
        await titularCarátulaJudicial.setValue(dato);
    }

    async obtenerNDeCertificadoOReferenc(dato:string){
        const nDeCertificadoOReferenc = (await $(selectors.shadowHost).shadow$(selectors.inputNDeCertificadoOReferenc));
        nDeCertificadoOReferenc.scrollIntoView();
        await nDeCertificadoOReferenc.setValue(dato);
    }

    async obtenerTitular(dato:string){
        const titular = (await $(selectors.shadowHost).shadow$(selectors.inputTitular));
        titular.scrollIntoView();
        await titular.setValue(dato);
    }

    async obtenerCbuOrigen(dato:string){
        const CBUOrigen = (await $(selectors.shadowHost).shadow$(selectors.inputCbuOrigen));
        CBUOrigen.scrollIntoView();
        await CBUOrigen.setValue(dato);
    }

    async obtenerEntidadDestino(dato:string){
        const CBUOrigen = (await $(selectors.shadowHost).shadow$(selectors.inputCbuOrigen));
        CBUOrigen.scrollIntoView();
        await CBUOrigen.setValue(dato);
    }

    async obtenerApellidoYNombreDelTitular(dato:string){
        const apellidoYNombreDelTitular = (await $(selectors.shadowHost).shadow$(selectors.inputApellidoYNombreDelTitular));
        apellidoYNombreDelTitular.scrollIntoView();
        await apellidoYNombreDelTitular.setValue(dato);
    }

    async obtenerOperatorias(){
        const NombreBeneficiario = (await $(selectors.shadowHost).shadow$$(selectors.dinamicForm));
        const nombreNumber = await NombreBeneficiario.length;
        for (let i = 0; i < nombreNumber; i++) {
            const getTexto = await NombreBeneficiario[i].getText();
            console.log(getTexto);
        }
    }

    async obtenerEntidadRepresentada(dato:string){
        const entidadRepresentada = (await $(selectors.shadowHost).shadow$(selectors.inputEntidadRepresentada));
        entidadRepresentada.scrollIntoView();
        await entidadRepresentada.setValue(dato);
    }
}