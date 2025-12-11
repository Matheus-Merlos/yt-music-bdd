const { Given, When, Then } = require("@cucumber/cucumber");
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


When('I request to create a playlist with the name "DO ROCK"', { timeout: 30000 }, async function () {
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

    await this.driver.sleep(2000);
});

Then('the playlist should be created successfully', { timeout: 30000 }, async function () {
    const sidebarXpath = `//ytmusic-guide-renderer//yt-formatted-string[text()='DO ROCK']`;

    const playlistInSidebar = await this.driver.wait(
        until.elementLocated(By.xpath(sidebarXpath)),
        TIMEOUT
    );

    expect(await playlistInSidebar.isDisplayed()).to.be.true;
});


When('I request to create a playlist without providing a name', { timeout: 30000 }, async function () {
    const newPlaylistBtn = await this.driver.wait(
        until.elementLocated(By.xpath("//button[.//text()='Nova playlist']")),
        TIMEOUT
    );
    await newPlaylistBtn.click();
    await this.driver.sleep(1000);

    const createPlaylistBtn = await this.driver.wait(
        until.elementLocated(By.xpath("//button[.//text()='Criar']")),
        TIMEOUT
    );
    createPlaylistBtn.click();

    await this.driver.sleep(2000);
});

Then('the system should reject the request', { timeout: 30000 }, async function () {
    const rejectMessage = `//div[.//text()='Obrigatório']`;

    const rejectMessageElement = await this.driver.wait(
        until.elementLocated(By.xpath(rejectMessage)),
        TIMEOUT
    );

    expect(await rejectMessageElement.isDisplayed()).to.be.true;
});

Given('I have a playlist named "DO ROCK"', { timeout: 30000 }, async function () {
    const sidebarXpath = `//ytmusic-guide-renderer//yt-formatted-string[text()='DO ROCK']`;

    const playlistInSidebar = await this.driver.wait(
        until.elementLocated(By.xpath(sidebarXpath)),
        TIMEOUT
    );

    expect(await playlistInSidebar.isDisplayed()).to.be.true;
});

When('I request to delete the playlist', { timeout: 30000 }, async function () {
    const sidebarXpath = `//ytmusic-guide-renderer//yt-formatted-string[text()='DO ROCK']`;

    const playlistInSidebar = await this.driver.wait(
        until.elementLocated(By.xpath(sidebarXpath)),
        TIMEOUT
    );
    await playlistInSidebar.click();

    const menuButtonXpath = "//ytmusic-editable-playlist-detail-header-renderer//ytmusic-menu-renderer//button";
    
    const menuButton = await this.driver.wait(
        until.elementLocated(By.xpath(menuButtonXpath)),
        TIMEOUT
    );
    await menuButton.click();
    
    await this.driver.sleep(1000);


    const deleteOptionXpath = "//ytmusic-menu-popup-renderer//yt-formatted-string[contains(text(), 'Excluir') or contains(text(), 'Delete')]";
    
    const deleteOption = await this.driver.wait(
        until.elementLocated(By.xpath(deleteOptionXpath)),
        TIMEOUT
    );
    await deleteOption.click();



    const confirmButton = await this.driver.wait(
        until.elementLocated(By.css("yt-confirm-dialog-renderer #confirm-button")),
        TIMEOUT
    );
    await confirmButton.click();
    
    await this.driver.sleep(2000);
});

Then('the playlist should no longer appear in my playlist list', { timeout: 30000 }, async function () {
    const sidebarXpath = `//ytmusic-guide-renderer//yt-formatted-string[text()='DO ROCK']`;

    await this.driver.wait(async () => {
        const elements = await this.driver.findElements(By.xpath(sidebarXpath));
        return elements.length === 0;
    }, TIMEOUT, 'A playlist ainda está visível após o tempo limite');

    const elements = await this.driver.findElements(By.xpath(sidebarXpath));
    expect(elements.length).to.equal(0);
});


When('I rename the playlist to "DO SAMBA"', { timeout: 30000 }, async function () {
    const sidebarXpath = `//ytmusic-guide-renderer//yt-formatted-string[text()='DO ROCK']`;

    const playlistInSidebar = await this.driver.wait(
        until.elementLocated(By.xpath(sidebarXpath)),
        TIMEOUT
    );
    await playlistInSidebar.click();

    const editButton = await this.driver.wait(
        until.elementLocated(By.xpath("//button[@aria-label='Editar playlist' or @aria-label='Edit playlist']")),
        TIMEOUT
    );
    await editButton.click();
    
    await this.driver.sleep(1000);

    const playlistNameInput = await this.driver.wait(
        until.elementLocated(By.css("ytmusic-playlist-form input")),
        TIMEOUT
    );
    await playlistNameInput.sendKeys(Key.CONTROL, 'a'); 
    await playlistNameInput.sendKeys(Key.BACK_SPACE);
    await playlistNameInput.sendKeys('DO SAMBA')
    
    await this.driver.sleep(2000);

    const editPlaylistBtn = await this.driver.wait(
        until.elementLocated(By.xpath("//button[.//text()='Salvar']")),
        TIMEOUT
    );
    editPlaylistBtn.click();

    await this.driver.sleep(2000);
});

Then('the new playlist name should be saved', { timeout: 30000 }, async function () {
    await this.driver.navigate().refresh();

    const sidebarXpath = `//ytmusic-guide-renderer//yt-formatted-string[text()='DO SAMBA']`;

    const playlistInSidebar = await this.driver.wait(
        until.elementLocated(By.xpath(sidebarXpath)),
        TIMEOUT
    );

    expect(await playlistInSidebar.isDisplayed()).to.be.true;
});