import { Page, PageContext, pageProvider } from "@testing/wdio-page-objects";
import { expect } from 'chai';

const selectors = {

    //shadowHost: '//manual-load-page[@id="4"]',
    shadowVerificarEnvio: '//manual-load-page[@id="4"] | //manual-load-page[@id="6"]',
    shadowVerificarEnvio2: '//manual-load-page[@id="5"]',
    inputImporte: '#amount-field > :first-child'
    
}

@PageContext({
    path: '/mep/#!/manualload',
    wrapper: '#confirmSent',
})

export class ValidacionCargaManual extends Page {

    async validarEnvio(): Promise<string>{
        const host = (await $(selectors.shadowVerificarEnvio));
        const host2 = (await $(selectors.shadowVerificarEnvio2));
        if(await host.isExisting()){
            const confirmSend = (await $(selectors.shadowVerificarEnvio).shadow$('#confirmSent'));
            //console.log("existe el primer selector")
            return await confirmSend.getAttribute('text');
        }else if(await host2.isExisting()){
            const confirmSend2 = (await $(selectors.shadowVerificarEnvio2).shadow$('#confirmSent'));
            return await confirmSend2.getAttribute('text');
        }

    }

}