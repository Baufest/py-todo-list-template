import { Given,When, Then, getStepClassInstance } from "@testing/cucumber-runner";
import { pageProvider } from "@testing/wdio-page-objects";
import { expect } from "chai";
import { DashboardPage } from "../login/dashboard.page";
import { TotalizadoresPage } from "./totalizadores.page";

export class TotalizadoresSteps {

    get dashboardPage() {
        return pageProvider.wait(DashboardPage);
    }

    get totalizadores() {
        return pageProvider.wait(TotalizadoresPage);
    }

   @Then(/^Envio la operatoria (.*)$/)
   async envioLaOperatoria(resultado: string){
    const fueraHora = '904-Operatoria fuera de hora';
    const fueraHoraTesoro = '737-Operatoria fuera del horario del Tesoro';
    await (await this.dashboardPage).clickCheckBox();
    await (await this.dashboardPage).clickButtonEnviarMovimiento();
    await (await this.totalizadores).clickButtonEnviarMovimientoTotalizadores();
    if (await (await this.totalizadores).validarHorario() === true) {
        expect(await (await this.totalizadores).validarMensajeDeEnvio()).to.equal(resultado, 'El texto no coincide');
    } else {
        expect([fueraHora, fueraHoraTesoro]).to.contains(await (await this.totalizadores).validarMensajeDeEnvio());
        }
    }
}
