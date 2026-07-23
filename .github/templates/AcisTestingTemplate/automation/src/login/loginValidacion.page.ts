import { Page, PageContext, pageProvider } from "@testing/wdio-page-objects";
import { expect } from 'chai';

const selectors = {
    mensaje:"#errId"
}

@PageContext({
    path: '/pkmslogin.form',
    wrapper: '',
})
export class LoginPageValidacion extends Page {
    async mensajeUsuarioOContraseniaIncorrecta():Promise<string>{
        const mensajeUsuarioIncorrecto = await $(selectors.mensaje);
        await mensajeUsuarioIncorrecto.waitForDisplayed({ timeout: 10000 });
        return mensajeUsuarioIncorrecto.getText();
    }

    async validacionAlerta(){
        console.log(await browser.getAlertText());
    }
}