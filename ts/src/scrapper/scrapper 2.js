const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');

async function scrape() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    "headless": false,
    "args": ["--fast-start", "--disable-extensions", "--no-sandbox"],
    "ignoreHTTPSErrors": true
  });
  const page = await browser.newPage();

  const abilities = [];

  const agents = ["Raze", "Viper", "Omen", "Sova","Sage", "Phoenix", "Jett", "Cypher", "Brimstone", "Breach", "Reyna","Killjoy", "Skye", "Yoru", "Astra", "KAY/O", "Chamber", "Neon","Fade", "Harbor", "Gekko"];



  for (const agent of agents) {
    const url = `https://blitz.gg/valorant/agents/${agent.toLowerCase()}`;
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('div.⚡8372027d');
    const abilitiesIcons = await page.$$('div.⚡8372027d');
    const agentAbilities = {};
    for (const abilityDiv of abilitiesIcons) {
            
        const abilityElement = await abilityDiv.$('.ability-icon > path');
        const abilityIcon = await abilityElement?.evaluate((el) => el.getAttribute('d'));
        console.log(abilityIcon);

        const abilityText = await ability.$('.type-caption--bold.keybind');
        const abilityLetter = await abilityText?.evaluate((el) => el.textContent?.trim());
        console.log(ability);

        agentAbilities[abilityLetter] = abilityIcon;

    }
    abilities.push(agentAbilities);
  }


  await browser.close();

  const data = JSON.stringify(abilities);
  fs.writeFileSync('abilities.json', data);
}

scrape().then(() => console.log('Scraping complete!'));