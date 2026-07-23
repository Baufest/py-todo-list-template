import { Page, PageContext, pageProvider } from "@testing/wdio-page-objects";
import { expect } from 'chai';

const selectors = {
    inputUser:'#username',
    inputPass:'//input[@name="password"]',
    buttonAceptar: "//input[@name='aceptar'or @value='Iniciar sesión' or @value='Login']"
}

@PageContext({
    path: '/mep',
    wrapper: '',
})
export class LoginPage extends Page {
    
    async getInputUser(user: string) {
        await (await $(selectors.inputUser)).waitForDisplayed({ timeout: 4000 });
        await (await $(selectors.inputPass)).click();
        await (await $(selectors.inputUser)).setValue(user);
    }

    async getInputPass(pass: string) {
        await (await $(selectors.inputPass)).waitForDisplayed({ timeout: 7000 });
        await (await $(selectors.inputPass)).click(); // Asegura que el campo esté enfocado
        await (await $(selectors.inputPass)).setValue(pass);
    }

    async clickButtonAceptar() {
        await (await $(selectors.buttonAceptar)).waitForDisplayed({ timeout: 10000 });
        await (await $(selectors.buttonAceptar)).click(); // Asegura que el campo esté enfocado
    }
}