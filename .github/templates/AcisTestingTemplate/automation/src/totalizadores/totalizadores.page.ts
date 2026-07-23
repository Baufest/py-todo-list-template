const fs = require('node:fs');
import { Page, PageContext, pageProvider } from "@testing/wdio-page-objects";
import { expect } from 'chai';

const selectors = {
    shadowHost:'//totalizadores-page[@id="cells-template-totalizadores"]',
    buttonEnviarMovimientosTotalizador:'bbva-button-default[id="enviarMovimientosTotalizador"]',
    mensajeTotalizador:'#enviarMovimientosTotalizadorTable > tbody > tr > td:nth-child(3) > bbva-web-table-body-text',
    mensajeNotification:'bbva-notification-status[id="notification"]',
    barraProgreso: 'bbva-text[text="En progreso"]'
}

@PageContext({
    path: 'mep/#!/totalizadores',
    wrapper: "",
})
export class TotalizadoresPage extends Page {

    async clickButtonEnviarMovimientoTotalizadores(){
        const enviarMovimiento = await $(selectors.shadowHost).shadow$(selectors.buttonEnviarMovimientosTotalizador);
        await enviarMovimiento.click();
        console.log("se envio el movimiento");
    }

    async validarMensajeDeEnvio():Promise<String>{
        const mensaje = await $(selectors.shadowHost).shadow$(selectors.mensajeTotalizador);
        await mensaje.waitForDisplayed({timeout: 10000, timeoutMsg: 'El mensaje no se encuentra'});
        await mensaje.waitForExist({timeout: 10000, timeoutMsg: 'El mensaje no se muestra en pantalla'});
        
        const html = await mensaje.getHTML(); // sin outer HTML
        // Extraer solo el contenido textual eliminando tags y espacios
        const texto = html.replace(/<[^>]*>/g, '').trim();
        console.log(texto);
        return texto;
    }

    async validarNotificacion(){
        const notification = await $(selectors.shadowHost).shadow$(selectors.mensajeNotification);
        await notification.waitForDisplayed({timeout: 5000, timeoutMsg: 'La notifiacion no se encuentra'});
        await notification.waitForExist({timeout: 5000, timeoutMsg: 'La notificacion no se muestra en pantalla'});
    }  

    async mensajeEnProceso(){
        const notification = await $(selectors.shadowHost).shadow$(selectors.barraProgreso);
        await notification.isDisplayed();
        await notification.isExisting();
    }

    async validarHorario(): Promise<boolean> {
    const ahora = new Date();
    const hora = ahora.getHours();
    const minutos = ahora.getMinutes();
    const data = JSON.parse(await fs.promises.readFile('./numeroOperatoriaCargada.json', 'utf8'));
    const operatoria = data.operatoria;
    const operatoriasEspeciales = [
        "DAD-SOL. BILL. TESOROS REGIONALE",
        "DAA-SOLICITUD DE BILLETES",
        "DKB-TRASLADO BILLETES E/ENT.FINANC"
    ];

    if (operatoriasEspeciales.includes(operatoria)) {
        const desdeHora = 8, desdeMin = 15;
        const hastaHora = 10, hastaMin = 30;
        return (
            (hora > desdeHora || (hora === desdeHora && minutos >= desdeMin)) &&
            (hora < hastaHora || (hora === hastaHora && minutos <= hastaMin))
        );
    } else {
        const desdeHora = 8, desdeMin = 0;
        const hastaHora = 20, hastaMin = 0;
        return (
            (hora > desdeHora || (hora === desdeHora && minutos >= desdeMin)) &&
            (hora < hastaHora || (hora === hastaHora && minutos <= hastaMin))
        );
        }
    }
}