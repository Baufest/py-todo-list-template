const fs = require('node:fs');
import { Page, PageContext, pageProvider } from "@testing/wdio-page-objects";
import { expect } from 'chai';

const selectors = {
    shadowHost:'//dashboard-page[@id="0"]',
    tituloDashboard:'#text',
    buttonMenu:'#cells-icon[icon="coronita:menu"]',
    buttonCargaManual:'nav:nth-child(2) > div:nth-child(2) > bbva-navigation-menu-item-89766:nth-child(1)',
    buttonCargaMasiva:'nav > div.list > bbva-navigation-menu-item-9527:nth-child(2)',
    filtrosHost:'#testeo',
    buttonSearch: 'bbva-web-link[class="button-search"]',
    inputFiltroNumero: 'input[name="numero"]',
    buttonBuscar: 'bbva-web-button-default[role="button"]',
    checkBoxOperatoria: '#headerCheck',
    buttonEnviarMovimiento:'bbva-button-default[id="enviarMovimientos"]',
    buttonEnviarMovimientosTotalizador:'bbva-button-default[data-tag-name="bbva-button-default"]'
}

@PageContext({
    path: 'mep/#!/dashboard',
    wrapper: "#drawerPanel",
})
export class DashboardPage extends Page {

    async getTituloDashboard(): Promise<string>{
        const elemento = await $(selectors.tituloDashboard);
        await elemento.waitForDisplayed({ timeout: 10000 });
        return await elemento.getText();
    }

    async clickMenu(){
        const menu = await $(selectors.shadowHost).shadow$('bbva-header-main').shadow$('button[id="btn-left-primary"]');
        await menu.waitForDisplayed({ timeout: 10000 });
        await menu.click();
    }

    async clickCargaManual(){
        const cargaManual = await $(selectors.shadowHost).shadow$('bbva-navigation-menu').shadow$('div.list > *:first-child');
        await cargaManual.waitForDisplayed({ timeout: 10000 });
        await cargaManual.click();

    }

    async clickButtonSearch(){
        const search = await $(selectors.shadowHost).shadow$(selectors.filtrosHost).shadow$(selectors.buttonSearch);
        await search.click();
    }

    async completarFiltroNumero(){
        const search = await $(selectors.shadowHost).shadow$(selectors.inputFiltroNumero);
        const data = JSON.parse(fs.readFileSync('./numeroOperatoriaCargada.json'));
        const numeroEnvio = data.numero;
        await search.setValue(numeroEnvio);
    }

    async clickButtonBuscar(){
        const buscar = await $(selectors.shadowHost).shadow$(selectors.filtrosHost).shadow$(selectors.buttonBuscar);
        await buscar.click();
    }

    async clickCheckBox(){
        const checkBox = await $(selectors.shadowHost).shadow$(selectors.checkBoxOperatoria);
        await checkBox.click();
    }

    async clickButtonEnviarMovimiento(){
        const enviarMovimiento = await $(selectors.shadowHost).shadow$(selectors.buttonEnviarMovimiento);
        await enviarMovimiento.click();
    }

    async clickButtonEnviarMovimientoTotalizadores(){
        const enviarMovimiento = await $(selectors.shadowHost).shadow$(selectors.buttonEnviarMovimientosTotalizador);
        await enviarMovimiento.click();
    }

    async clickButtonCargaMasiva(){
        const cargaMasiva = await $(selectors.shadowHost).shadow$('bbva-navigation-menu').shadow$('div.list > *:nth-child(2)');
        await cargaMasiva.waitForDisplayed({ timeout: 10000 });
        await cargaMasiva.click();
    }

}