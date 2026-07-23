# Template - Archivo Referencias Automatización con ACIS basado en WebdriverIO

> Template con detalle sobre documentación y forma correcta de automatizar con ACIS basado en WebdriverIO

## ¿Por qué ACIS?
ACIS es un conjunto liviano de servicios construido sobre WebDriverIO, un framework Open Source sólido, probado y ampliamente utilizado. ACIS facilita la implementación de pruebas automatizadas web y sobre dispositivos. Además, incorpora patrones y herramientas que ayudan al desarrollador a resolver problemas complejos habituales, haciendo que el desarrollo de pruebas sea más natural y sencillo.

## ¿Por qué usamos Gherkin con ACIS?
Gherkin es un conjunto de reglas gramaticales que permite estructurar texto plano para la especificación de pruebas. Para ello, utiliza un conjunto de palabras clave seguidas por un texto definido según la necesidad de cada caso.

Las palabras clave principales son:

- `Feature`: solo puede haber una por archivo. Indica el nombre de la suite de pruebas y puede ir seguida de una descripción en las líneas siguientes.
- `Scenario` o `Scenario Outline`: van seguidos por el nombre del caso de prueba que se describe en los pasos posteriores. En el caso de `Scenario Outline`, se pueden especificar ejemplos al final; por cada ejemplo se ejecutará una prueba.
- `Given`, `When`, `Then`, `And`, `But` para los pasos de prueba, o `*`.
- `Tags`: se utilizan antes de las palabras clave `Feature`, `Scenario` o `Examples` para catalogar las pruebas. Permiten seleccionar qué pruebas ejecutar en cada corrida. Algunos ejemplos son: `@smoke`, `@regression`, etc.

Un ejemplo de un documento con sintaxis Gherkin sería:

```gherkin
Feature: Sums in the calculator

  Scenario: Simple one digit addition
    Given I'm using the calculator
    When I enter "1" into the calculator
    And I add "2"
    Then the calculated result is "3"
```

## Estructura y detalles del proyecto

# Estructura del proyecto ACIS

```
.
├── src
|   └── **
|       ├── *.feature
|       ├── *.page.ts
|       └── *.steps.ts
└── config
    └── *.js
```

# ¿Qué es un archivo `*.page.ts`?

Estos archivos contienen los `PageObjects`. Un `PageObject` es una representación abstracta de una vista dentro de la aplicación. Podemos decir que, por cada vista o página de la aplicación bajo prueba, debería existir un `PageObject`.

El `PageObject` expone métodos funcionales que permiten a los steps, o a otros `PageObjects`, ejecutar acciones funcionales sobre la página representada. Por ejemplo, un método llamado `clickLoginButton()` sería incorrecto, mientras que un método llamado `login(userData)` sería una mejor opción.

Tampoco deberían utilizarse métodos como `getThatButton()`. En cambio, métodos como `getProductName()`, que devuelven un string con el nombre del producto, son totalmente válidos.

Los archivos que terminan en `.page.ts` se cargan automáticamente como clases `PageObject`.

# ¿Qué es un archivo `*.feature`?

Un archivo `feature` describe las pruebas que Cucumber va a ejecutar. Este archivo está escrito utilizando la sintaxis Gherkin.

Los archivos ubicados dentro de la carpeta `src` se cargan automáticamente como archivos Gherkin para Cucumber, sin importar la estructura interna de carpetas.

- Ejemplo de contenido para un archivo con escenario llamado welcome.feature:

```
@welcome
Feature: Welcome
    Scenario: Should see products
        Given I´m in the welcome screen
        Then I should see "Men's Outerwear" shop link
        Then I should see "Ladies Outerwear" shop link
        Then I should see "Men's T-Shirts" shop link
        Then I should see "Ladies T-Shirts" shop link
        When I select "Men's Outerwear" category
        Then I should see some products
```

# ¿Qué es un archivo `*.steps.ts`?

Un ejemplo de archivo de steps sería: `welcome.steps.ts`.

Los archivos `steps.ts` son el lugar donde debe escribirse el código glue de Cucumber. Cucumber utilizará este código para ejecutar cada paso definido en los archivos `feature` para cada escenario. Cada paso `Given`, `Then` y `When` escrito en un archivo `feature` debe estar declarado en algún archivo `*.steps.ts`; si no está declarado en ningún lugar, se lanzará una excepción.

Tené en cuenta que el código escrito en los steps, al igual que los pasos definidos en Gherkin, debe ser totalmente agnóstico de la interfaz. No debe ejecutar directamente clicks, asignar valores a campos ni verificar la visibilidad de elementos. El código de los steps solo puede interactuar con la capa de abstracción `PageObject` (esto se verá más adelante), con otros steps o realizar aserciones.

Los archivos que terminan en `.steps.ts` se cargan automáticamente como clases contenedoras de steps.

```
export class WelcomeSteps {

    get welcomePage () {
        return pageProvider.wait(WelcomePage);
    }

    @Given(/^I'm in the welcome screen$/)
    inTheWelcomeScreen() {
        pageProvider.go(WelcomePage);
    }

    @Then(/^I should see "(.*)" shop link$/)
    shouldSeeShopLink(text:string) {
        expect(this.welcomePage.canSeeCategory(text)).to.be.true;
    }

    @When(/^I select "(.*)" category$/)
    selectOption(text:string) {
        this.welcomePage.selectCategory(text);
    }

}
```

Podés ver que los textos de las annotations coinciden con los textos definidos en el archivo `feature`. Los archivos `feature` y `steps` se relacionan a través de esos textos dentro de las annotations. El test runner recorre los distintos pasos del `feature`, busca la implementación correspondiente para cada uno y la invoca. Si no encuentra un step, la prueba falla.

Las clases de steps se instancian una vez por cada escenario de prueba, por lo que es posible compartir información entre un step y otro utilizando propiedades de la clase. Para obtener una instancia de una clase de steps desde otra clase de steps, por ejemplo para crear macrosteps, podés obtener la instancia correspondiente al escenario actual usando la función `getStepClassInstance` provista por el framework.

# ¿Por qué `Then I should see some products` no está declarado en esta clase de steps?

Porque ese step está declarado en otro archivo llamado `src/categories/category.steps.ts`. Cuando se ejecuta una prueba, el framework busca todos los steps declarados dentro de la carpeta `src`. Por esa razón, la ejecución no falla.

# ¿Cómo correr el test?

Ejecutar el siguiente comando que ejecuta solo el test que contiene el tag '@welcome' : 
```
npm t -- --cucumberOpts.tagExpression '@welcome'
```

# Analizando `category.page.ts`

Las clases `PageObject` son clases normales que extienden de la clase abstracta `Page`. Además, están decoradas con el decorador `@PageContext`, que le proporciona al framework metadatos útiles para su funcionamiento.

```
@PageContext({
    path: '/',
    selector: `/deep/ shop-app[page=home]`,
})
export class WelcomePage extends Page {

    private openResponsiveMenu() {
        const menuButton = $(`${this.context.selector} app-toolbar [aria-label="Categories"]`);
        if(menuButton.isClickable()) {
            menuButton.click();
        }
    }
    private get drawer() {
        return `${this.context.selector} app-drawer`;
    }

    canSeeCategory(text: string, wait = true): boolean {
        this.openResponsiveMenu();
        wait && $(this.drawer).$(`a=${text}`).waitForActionable();
        return $(this.drawer).$(`a=${text}`).isDisplayed();
    }

    selectCategory(text:string) {
        this.openResponsiveMenu();
        $(this.drawer).$(`=${text}`).click();
    }

}
```

Notá en la clase de steps anterior que, para obtener instancias de `PageObject`, el framework ofrece una instancia de utilidad llamada `pageProvider`. `pageProvider` ofrece tres métodos:

- `get`: simplemente proporciona una nueva instancia del `PageObject`.
- `wait`: espera hasta que el navegador o dispositivo se encuentre en la vista representada por el `PageObject` provisto. Para hacerlo:
    - verifica la URL del navegador contra el path definido en el decorador `PageContext`
    - verifica si el selector o los selectores provistos en `PageContext` son visibles
    - invoca el método `isCurrent` de la clase `Page`, que puede sobrescribirse para especializar el comportamiento de detección de página
- `go`: invoca el método `go` de `Page`, cuya implementación por defecto, que también puede sobrescribirse en la page, navega al path definido en el decorador `PageContext` y llama a `pageProvider.wait` sobre la instancia.


## Ejemplo de automatización con ACIS en la Práctica

1. Target del test : encontrar el texto DEMO ONLY en https://shop.polymer-project.org/.
```
@hello-word
Feature: Hello world

    Scenario: is the sentence DEMO ONLY displaying?
        Given I'm in the init screen
        When I look for class '.demo-label' getting '#dom'
        Then the text in '#dom' have to be 'DEMO ONLY'
```

2. EL siguiente paso es crear la page de especificacion donde el test se va a ejecutar  ('src/hello-world/hello-world.page.ts').

Recuerda la anotacion @PageContext donde se especifican el path y selector:

```
import { Page, PageContext } from "@testing/wdio-page-objects";

@PageContext({
  path: "/",
  selector: `/deep/ shop-app[page=home]`
})
export class HelloWorldPage extends Page {
  /**
   *Find element inside shadow dom element
   * @param selector
   */
  getDomElement(selector: string) {
    return $(`${this.context.selector} ${selector}`);
  }
}
```

3. Ahora es el momento de generar el código de testing 'src/hello-world/hello-world.steps.ts'.

@Given le indica al framework qué pagina cargar y verificar que carga correctamente
@When setea el elemento del DOM, guardandolo y verificando que el elemento no sea null
@Then verifica que el elemento del DOM contenga el texto buscado

```
import { pageProvider } from "@testing/wdio-page-objects";
import { HelloWorldPage } from "./hello-world.page";
import { Given, When, Then } from "@testing/cucumber-runner";
import { Element } from "@wdio/sync";
import { expect } from "chai";

export class HelloWorldStep {
  private map = new Map<string, Element>();

  get helloWorldPage() {
    return pageProvider.wait(HelloWorldPage);
  }

  @Given(/^I'm in the init screen$/)
  inTheWelcomeScreen() {
    pageProvider.go(HelloWorldPage);
    expect(this.helloWorldPage.isCurrent()).to.be.true;
  }

  @When(/^I look for class '(.*)' getting '(.*)'$/)
  whenSelectDom(selector: string, key: string) {
    const result = this.helloWorldPage.getDomElement(selector);
    this.map.set(key, result);
    expect(result).to.be.not.null;
  }

  @Then(/^the text in '(.*)' have to be '(.*)'$/)
  matchTest(key: string, text: string) {
    const domElement = this.map.get(key);
    expect(domElement.getText() === text).to.be.true;
  }
}
```

4. Ejecución del Test --> correr el comando "npm t -- --cucumberOpts.tagExpression '@hello-word'"


## Resolución de un Challenge 
Challenge: Crear un nuevo test dentro de 'hello world' para verificar si el número de fotos en la página es 4.

# Pista

Con el método '$$' de WebdriverIO podemos obtener una lista de elementos en vez de uno solo.
Ejemplo:
```
getDomElementList(selector: string) {
    return $$(`${this.context.selector} ${selector}`);
}
```

Resolución:
# src/hello-world/hello-world.page.ts
```
getDomElementList(selector: string) {
    return $$(`${this.context.selector} ${selector}`);
}
```

# src/hello-world/hello-world.steps.ts

```
private map = new Map<string, Element>();
private mapList = new Map<string, ElementArray>();

---

@When(/^I look for list '(.*)' getting '(.*)'$/)
whenSelectListDom(selector: string, key: string) {
    const result = this.helloWorldPage.getDomElementList(selector);
    this.mapList.set(key, result);
    expect(result).to.be.not.null;
}

---

@Then(/^the quantity in '(.*)' have to be ([0-9]+)$/)
countElements(key: string, quantity: string) {
    const domElement = this.mapList.get(key);
    expect(domElement.length === parseInt(quantity)).to.be.true;
}
```

# src/hello-world/hello-world.feature

```
---
Scenario: are there 3 images?
        Given I'm in the init screen
        When I look for list 'img' getting '#dom'
        Then the quantity in '#dom' have to be 4
---
```

## Error Pages

- Gestionar condiciones de error inesperadas en pruebas E2E de front es difícil. Normalmente, si la aplicación bajo prueba falla por cualquier motivo, se abrirá un diálogo de error, pero la prueba quedará bloqueada en algún punto esperando que ocurra algo y fallará con un mensaje similar a que no se pudo encontrar el selector `blah blah` después de 50 segundos. Esto implica una pérdida de tiempo tanto para los recursos de la infraestructura de testing como para vos, ya que vas a tener que revisar el video para identificar el diálogo de error que apareció y entender qué fue lo que realmente ocurrió en la aplicación.
- Para resolver esta situación, el framework provee la clase abstracta `ErrorPage`.

- ¿Cómo funciona?
Cuando llamás al método `pageProvider.wait` o `pageProvider.go` esperando que se alcance un `PageObject` específico, el framework también verifica si hay alguna `ErrorPage` presente en el navegador. Si detecta una, falla de forma temprana y muestra como detalle del error el resultado del método `.getErrorDetails`.

- Ejemplo de clase implementada:
El proyecto de ejemplo generado incluye la `Error404Page`, que detecta este tipo de errores verificando la presencia del elemento `shop-404-warning` en la página.

```
import {ErrorPage, PageContext} from "@testing/wdio-page-objects";

@PageContext({
    // Path is an optional property
    selector: `/deep/ shop-404-warning`
})
export class Error404Page extends ErrorPage{

    getErrorDetails() {
        return `
            error: 404
            handler: Error404Page
            url:     ${browser.getUrl()}
            message: ${$(`${this.context.selector} h1`).getText()}
        `;
    }

}
```

# Ejemplo de Error Handling

Para demostrar el funcionamiento, creamos un escenario en 'src/hello-world/hello-world.feature'

```
@hello-world-failure
Scenario: Sample failure
    Given I'm in the 'no_existing' page
    Then message error of 'no_existing' must contain 'message: Sorry, we couldn't find that page'
```

Creamos los métodos GIVEN y THEN en 'src/hello-world/hello-world.steps.ts':

```
import { CategoryPage } from "../categories/category.page";
---
private mapList = new Map<string, ElementArray>();
private mapError = new Map<string, string>();
---
@Given(/^I'm in the '(.*)' page$/)
inTheCategoryPage(categoryId: string) {
    try {
      pageProvider.go(CategoryPage, { categoryId });
    } catch (error) {
      this.mapError.set(categoryId, error.message);
    }
}
---
@Then(/^message error of '(.*)' must contain '(.*)'$/)
errorContains(page: string, find: string) {
    const errorMessage = this.mapError.get(page);
    const index = errorMessage.indexOf(find);
    expect(index !== -1).to.be.true;
 }
```

- Observá el método `@Given`: con el `try catch` evitamos que el código detenga la ejecución del paso siguiente y almacenamos el error para analizarlo más tarde.

- El método `@Then` valida si el texto mostrado en el sitio web es `Sorry, we couldn't find that page`, pero en `hello-world.feature` la frase es `message: Sorry, we couldn't find that page`. El prefijo `message:` proviene de la clase `Error404Page`.

- Tené en cuenta que, si por algún motivo querés verificar explícitamente si ocurre un error durante una prueba, siempre podés invocar `pageProvider.wait(Error404Page)` para obtener esa instancia. ACIS no disparará un fallo si la página que estás esperando es una `ErrorPage`.

## Gestión de modales, pop-ups, etc. inesperados

- Al igual que con las `ErrorPage`, el framework también provee la clase abstracta `DiscardablePage`, cuya presencia se verifica en cada invocación de `pageProvider.wait`.
- La diferencia con las páginas de error es que la prueba no fallará cuando aparezca inesperadamente una página descartable, sino que invocará el método `.discard` de esa página, cuya responsabilidad es cerrar el diálogo o modal.
- Esto permite, por ejemplo, descartar automáticamente mensajes de bienvenida, notificaciones de cumpleaños para usuarios o pop-ups de promociones especiales, sin necesidad de preparar previamente el código de testing para este tipo de situaciones.

- Ejemplo:
En la aplicación de ejemplo de ACIS generada al inicializar el proyecto, se incluye la página descartable `ShopCartModal` para mostrar esta funcionalidad. Cada vez que la prueba agrega algo al carrito, este diálogo aparece y el framework de testing de ACIS lo descarta automáticamente.

```
@PageContext({
    selector: `/deep/ shop-app shop-cart-modal.opened`
})
export class ShopCartModal extends DiscardablePage{

    discard() {
        const timeout = (browser.config as Config).timeouts.S;
        $(`${this.context.selector} #closeBtn`).click();
        browser.waitUntil(() => !this.isCurrent(), timeout, "dialog not hidden");
    }

}
```

- Al igual que las páginas de error, las páginas descartables no se descartan automáticamente si lo que solicitaste al método `wait` fue precisamente esa página descartable esperada. Por ejemplo, si invocás `pageProvider.wait(ShopCartModal)` después de agregar un producto al carrito, vas a obtener la instancia de `ShopCartModal` sin que sea descartada automáticamente.

## Debuggear un test

- Por último, quiero explicar cómo debuggear con VS Code. Si no sabés qué es debuggear, podés leer más sobre eso aquí.
- Mucha gente sobreestima o subestima el poder del debugging; cada persona piensa distinto, pero debuggear es más importante de lo que suele parecer.

## Configurar `launch.json`

- `launch.json` es el archivo que VS Code lee cuando tiene que ejecutar el modo debug. Este archivo se usa para configurar las acciones del modo de depuración.
- Copiá el contenido siguiente en `.vscode/launch.json` y después vas a poder ejecutar en modo debug. Si estás usando `acis-generator`, este archivo ya existe.

```
{
    // Use IntelliSense para saber los atributos posibles.
    // Mantenga el puntero para ver las descripciones de los existentes atributos.
    // Para más información, visite: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug tests",
            "port": 5859,
            "timeout": 30000,
            "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/wdio",
            "cwd": "${workspaceRoot}",
            "console": "integratedTerminal",
            "autoAttachChildProcesses": true,
            "args": [
                "config/browser.js"
            ],
            "env": {
                "DEBUG": "true"
            }
        }
    ]
}
```

## Debuggear un archivo específico

- Con la configuración anterior se ejecutan todos los tests del proyecto, pero también podés debuggear únicamente el test que estás ejecutando. Para eso, en la propiedad `args` tenés que agregar:

```json
"args": [
    "config/browser.js",
    // Set to a spec file and line to only run that one
    "--spec",
    "src/hello-world/hello-world.feature:4"
]
```

- Observá que el formato es `archivo:numero-de-linea`. El número de línea corresponde a la línea del escenario dentro del archivo `feature`.

## Iniciar el modo debug

- Buscá la barra lateral que tiene varios íconos, según los plugins que tengas instalados, y encontrá el de ejecutar y debuggear. La vista debería cambiar.
- En esa vista debería aparecer un botón de ejecución. Antes de presionarlo, agregá un breakpoint: abrí el archivo `src/hello-world/hello-world.steps.ts` y en la línea 21 hacé clic izquierdo sobre el margen izquierdo del número de línea. Debería aparecer un círculo rojo.
- Cuando esté todo listo, presioná el botón de ejecución.
- Durante la ejecución vas a ver cómo el código se detiene en el círculo rojo. Con eso ya vas a estar debuggeando.

