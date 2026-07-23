import {ErrorPage, PageContext} from "@testing/wdio-page-objects";


@PageContext({
    wrapper: `shop-404-warning`
})
export class Error404Page extends ErrorPage{

    async getErrorDetails() {
        return `
            error: 404
            handler: Error404Page
            url:     ${await browser.getUrl()}
            message: ${await $(`h1`).getText()}
        `;
    }

}
