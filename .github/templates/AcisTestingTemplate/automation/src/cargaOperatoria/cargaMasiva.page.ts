import { Page, PageContext, pageProvider } from "@testing/wdio-page-objects";
import { expect } from 'chai';

const selectors = {
    shadowHost: '//carga-masiva-page[@id="cells-template-carga-masiva"]',
    buttonSeleccionarUnArchivo:'#selectFileButton',
    inputFile: '#file-input',
    buttonUpload: '#uploadButton',
}

@PageContext({
    path: 'mep/#!/carga-masiva',
    wrapper: '',
})

export class CargaMasivaPage extends Page {
    async clickCargaMasiva() {
        const seleccionarArchivo = (await $(selectors.shadowHost).shadow$(selectors.buttonSeleccionarUnArchivo));
        await seleccionarArchivo.scrollIntoView();
        await seleccionarArchivo.click();
    }

    async cargarArchivo(rutaArchivo: string) {
    const inputFile = (await $(selectors.shadowHost).shadow$(selectors.inputFile));
    await inputFile.waitForExist();
    await browser.execute((el) => { ((el as unknown) as HTMLElement).style.display = 'block'; }, inputFile);
    await inputFile.setValue(rutaArchivo);
}
    async clickUpload() {
        const buttonUpload = (await $(selectors.shadowHost).shadow$(selectors.buttonUpload));
        await buttonUpload.scrollIntoView();
        await buttonUpload.click();
    }

    async getMensaje(): Promise<string> {
        const mensaje = (await $(selectors.shadowHost).shadow$('cells-template-paper-drawer-panel > div.container > div.progress-bar > bbva-panel-info'));
        return await mensaje.getAttribute('heading');
    }
}