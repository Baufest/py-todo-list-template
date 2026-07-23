const fs = require('node:fs');
import { Given,When, Then, getStepClassInstance } from "@testing/cucumber-runner";
import { pageProvider } from "@testing/wdio-page-objects";
import { expect } from "chai";
import { DashboardPage } from "../login/dashboard.page";
import { CargaManualPage } from "./cargaManual.page";
import { ValidacionCargaManual } from "./validacionCargaManual.page";
import allureReporter from '@wdio/allure-reporter';
import { CargaMasivaPage } from "./cargaMasiva.page";
import { Utils } from "../utils/utils.page";
const path = require('path');

export class cargaMasivaSteps {

    get dashboardPage() {
        return pageProvider.wait(DashboardPage);
    }

    get cargaMasivaPage() {
        return pageProvider.wait(CargaMasivaPage);
    }

    private utils = new Utils();

    @Given(/^estoy en carga masiva de operatoria$/)
    public async estoyEnCargaMasivaDeOperatoria() {
        await (await this.dashboardPage).clickMenu();
        await (await this.dashboardPage).clickButtonCargaMasiva();
    }
    
    @When(/^selecciono el archivo (.*)$/)
    public async thenElSistemaMuestraLaValidacionDelArchivoCargado(archivo: string) {
        const rutaAbsoluta = path.resolve(process.cwd(), archivo);
        await (await this.cargaMasivaPage).cargarArchivo(rutaAbsoluta);
    }

    @When(/^hago click en el boton Cargar archivo$/)
    public async hagoClickEnElBotonCargarArchivo() {
        await (await this.cargaMasivaPage).clickUpload();
        await this.utils.actualizarNumeroCargaMasiva();
    }

    @Then(/^se muestra un mensaje en el pop up (.*)$/)
    public async seMuestraUnMensajeEnElPopUp(popUp: string) {
        await this.utils.obtenerPopUp();
        const alertText = await browser.getAlertText();
        const real = alertText.replace(/\s+/g, ' ').trim(); // eliminamos salto de linea y espacios extra
        console.log(real);
        expect(real).to.equal(popUp, 'El texto no coincide');
    }

    @Then(/^se muestra el mensaje en pantalla (.*)$/)
    public async seMuestraElMensajeEnPantalla(mensaje: string) {
        const mensajePantalla = await (await this.cargaMasivaPage).getMensaje();
        console.log(mensajePantalla);
        expect(mensajePantalla).to.equal(mensaje, 'El mensaje en pantalla no coincide');
    }
}