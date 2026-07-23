package steps;


import com.bbva.arch.qe.backend.client.TestingScenario;
import com.google.inject.Inject;
import cucumber.api.Scenario;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
/*import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;*/



public class StepsDefinitions {
    @Inject
    private TestingScenario scenario;
    private final String backend = System.getenv().getOrDefault("BACKEND", "was");

    @Given("se configura {string}")
    public void seConfigura(String cics) {
        scenario
                .http(backend)
                .post(cics)
                .readTimeout(5000)
                .body().json()
                .fromFile("features/onBoarding/bodies/fnetcoreBodyCicsConfig.json")
                .send();
    }

    @And("realizo el prelogin {string}")
    public void realizaElLoginConElAltaDeDatosDelY(String path) {
        scenario
                .http(backend)
                .post(path)
                .readTimeout(5000)
                .body().json()
                .fromFile("features/onBoarding/bodies/fnetcoreBodyLogin.json")
                .send("responseLogin");
    }
    @And("realizo el login {string}")
    public void realizaElLogin(String path) {
        scenario
                .http(backend)
                .post(path)
                .readTimeout(5000)
                .header("authentication","$responseLogin.result.authentication")
                .body().json()
                .fromFile("features/onBoarding/bodies/fnetcoreBodyPostLogin.json")
                .send("responsePostLogin");
    }

    @Then("compruebo que el valor de la propiedad {string} es equivalente a {string}")
    public void comprueboQueElValorDeLaPropiedadEsIgualA(String property, String value) {
        scenario.assertThat(property).is(value);
    }

    @Then("compruebo que el valor de la propiedad {string} es equivalente a {int}")
    public void comprueboQueElValorDeLaPropiedadEsIgualA(String property, int value) {
        scenario.assertThat(property).is(value);
    }

    @Then("compruebo que el valor de la propiedad {string} no es nula")
    public void comprueboQueElValorNoEsNull(String property){
        scenario.assertThat(property).notNull();
    }

    @Then("consulto {string} con cookies y obtengo el response {string}")
    public void consultoConCookies(String path, String response) {
        scenario
                .http(backend)
                .get(path)
                .readTimeout(5000)
                .header("Cookie","$responsePostLogin:headers.Set-Cookie[0]")
                .header("Cookie","$responsePostLogin:headers.Set-Cookie[1]")
                .header("Cookie","$responsePostLogin:headers.Set-Cookie[2]")
                .header("Cookie","$responsePostLogin:headers.Cookie[3]")
                .header("Cookie","$responsePostLogin:headers.Cookie[4]")
                //.header("Cookie", "qaTimeStamp=2025-01-09T16:46:02-0300; qaremember_userName=")
                //.header("Cookie", "TTC=1736451963065; gpv_pageIntent=informacion")
                .send(response);
    }

    /*public static class getDate(){
        String getDate = DateTimeFormatter.ofPattern("MMM dd yyyy hh:mm:ss")
                .format(LocalDateTime.now());
    }*/

}