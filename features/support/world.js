const { World, setWorldConstructor, Before, After } = require("@cucumber/cucumber");
const { Builder } = require("selenium-webdriver");

class MyWorld extends World {
    constructor(options) {
        super(options);
        this.driver = null;
    }

    async initDriver() {
        this.driver = await new Builder().forBrowser('firefox').build();
    }

    async closeDriver() {
        if(this.driver) {
            await this.driver.close()
        }
    }
}

setWorldConstructor(MyWorld);

Before(async function () {
    await this.initDriver();
});

After(async function () {
    await this.closeDriver();
});