import { Page, PageContext, pageProvider } from "@testing/wdio-page-objects";
import { expect } from 'chai';

const selectors = {
    host:"#cells-template-login",
    host2:"#progress",
    spinnerLoad:"#spinnerMask"
}

@PageContext({
    path: '*',
    wrapper: '',
})
export class ValidacionLoadPage extends Page {

    async seCierraSpinnerLoad(){
        const spinner = (await $(selectors.host).shadow$(selectors.host2).shadow$(selectors.spinnerLoad));
        await browser.waitUntil(
        async () => (await spinner.getAttribute("paused")) !== null,
        {
            timeout: 50000, // 50s máximo
            interval: 200,
            timeoutMsg: "El spinner nunca mostró el atributo pausa",
        }
    );
    }
}