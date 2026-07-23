import { Given,When, Then, getStepClassInstance, World } from "@testing/cucumber-runner";
import { LoginPage } from "./login.page";
import { pageProvider } from "@testing/wdio-page-objects";
import { expect } from "chai";
import { DashboardPage } from "./dashboard.page";
import { LoginPageValidacion } from "./loginValidacion.page";
import { ValidacionLoadPage } from "../login/validacionLoad.page";

export class LoginSteps {

    world:World;
    constructor(world:World) {
        this.world=world;
        
    }


    get inicioPage() {
        return pageProvider.wait(LoginPage);
    }

    get dashboardPage() {
        return pageProvider.wait(DashboardPage);
    }

    get loginValidacionPage() {
        return pageProvider.wait(LoginPageValidacion);
    }

    get validacionLoadPage() {
            return pageProvider.wait(ValidacionLoadPage);
        }

    @Then('me encuentro en la pagina de login')
    async meEncuentroEnLaPaginaDeLogin() {
        await pageProvider.go(LoginPage);
    }

    @Then(/^ingreso el usuario (.*)$/)
    async ingresoElusuarioYLaContrasenia(idUser: number) {
        
        const userData = this.world.users.get();
        //console.log(JSON.stringify(userData));
        const user1 = userData.usuarios.filter(x => x.Id==idUser)[0];
        await (await this.inicioPage).getInputUser(user1.usuario);
        await (await this.inicioPage).getInputPass(user1.password);
        await (await this.inicioPage).clickButtonAceptar();    
    }

   @Then(/^valido en el dashboard el usuario (.*) (.*)$/)
   async validoDashboard(user: string, rol: string){
    
    
    let mensajeEsperado = `Bienvenido, ${user} TEST, ${rol}`;
    let mensaje = await (await this.dashboardPage).getTituloDashboard();
    expect(mensaje).to.equal(mensajeEsperado,'los textos no coinciden');
   }

   @Then(/^valido que no inicia sesion y muestra el mensaje (.*) y (.*) en ingles$/)
   async validoQueNoIniciaSesionYMuestraElMensaje(mensaje:string, mensajeIngles:string){

    let mensajeEsperado = await (await this.loginValidacionPage).mensajeUsuarioOContraseniaIncorrecta();
    const esValido = mensajeEsperado === mensaje || mensajeEsperado === mensajeIngles;
    expect(esValido).to.equal(true, `Mensaje esperado: "${mensaje}" o "${mensajeIngles}", pero recibido: "${mensajeEsperado}"`);
   }

   @When('hago click en buscar')
   async hagoClickEnBuscar(){
        await (await this.validacionLoadPage).seCierraSpinnerLoad();
        await (await this.dashboardPage).clickButtonSearch();
   }

   @When('cargo la operatoria creada')
   async cargoLaOperatoriaCreada(){
        await (await this.dashboardPage).completarFiltroNumero();
        await (await this.dashboardPage).clickButtonBuscar();
   }

   @When('cierro sesion')
    async cierroSesion(){
        await browser.url('https://wscalidad.arg.igrupobbva/pkmslogout');
        await browser.url('https://wscalidad.arg.igrupobbva/mep');
    }
}


