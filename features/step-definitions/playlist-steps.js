const { Given, When } = require("@cucumber/cucumber");
const { By, Key, until } = require("selenium-webdriver");
const { config } = require('dotenv');
const { expect } = require("chai");
config();

const TIMEOUT = 10000;

const EMAIL = 'matheusmerlos@alunos.utfpr.edu.br'
const PASSWORD = process.env.PASSWORD;

Given('I am authenticated in YouTube Music', { timeout: 30000 }, async function () {
    await this.driver.get('https://music.youtube.com/');

    const signInButton = await this.driver.wait(
        until.elementLocated(By.className("sign-in-link")), 
        TIMEOUT
    );
    signInButton.click();

    const emailInput = await this.driver.wait(
        until.elementLocated(By.id("identifierId")), 
        TIMEOUT
    );
    await emailInput.sendKeys(EMAIL, Key.RETURN);

    await this.driver.sleep(2500);

    const passwordInput = await this.driver.wait(
        until.elementLocated(By.name("Passwd")),
        TIMEOUT
    );
    await passwordInput.sendKeys(PASSWORD, Key.RETURN);
    await this.driver.sleep(2500);
});


When('I request to create a playlist with the name "DO ROCK"', async function () {
    const newPlaylistBtn = await this.driver.wait(
        until.elementLocated(By.xpath("//button[.//text()='Nova playlist']")),
        TIMEOUT
    );
    await newPlaylistBtn.click();
    await this.driver.sleep(1000);

    const playlistNameInput = await this.driver.wait(
        until.elementLocated(By.css("ytmusic-playlist-form input")),
        TIMEOUT
    );
    await playlistNameInput.sendKeys('DO ROCK')
    
    await this.driver.sleep(2000);

    const createPlaylistBtn = await this.driver.wait(
        until.elementLocated(By.xpath("//button[.//text()='Criar']")),
        TIMEOUT
    );
    createPlaylistBtn.click();
});