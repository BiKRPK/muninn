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

  const svg2abKey = {};
  const abKey2Name = {};

  const agents = ["Raze", "Viper", "Omen", "Sova","Sage", "Phoenix", "Jett", "Cypher", "Brimstone", "Breach", "Reyna","Killjoy", "Skye", "Yoru", "Astra", "Kayo", "Chamber", "Neon","Fade", "Harbor", "Gekko"];



  for (const agent of agents) {
    const agentName = agent;
    const url = `https://blitz.gg/valorant/agents/${agent.toLowerCase()}`;
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('div.⚡8372027d');
    const abilitiesIcons = await page.$$('div.⚡8372027d > div');
    const agentAbilities = {};
    const agentAbTitles = {};
    for (const abilityDiv of abilitiesIcons) {
        const abilityElement = await abilityDiv.$('div > .ability-icon > path');
        const abilityIcon = await abilityElement?.evaluate((el) => el.getAttribute('d'));

        const abilityText = await abilityDiv.$('div > .type-caption--bold.keybind');
        const abilityLetter = await abilityText?.evaluate((el) => el.textContent?.trim());
        //data-tip
        // const abilityTittleText = await abilityDiv.$('div');
        // const abilityTittle = await abilityTittleText?.evaluate((el) => el.getAttribute('data-tip'));
        const abilityTittle = await abilityDiv?.evaluate((el) => el.getAttribute('data-tip'));

        console.log(agent + ': ' + abilityLetter + " - " + abilityTittle);
        agentAbilities[abilityIcon] = abilityLetter;
        agentAbTitles[abilityLetter] = abilityTittle;
    }
    svg2abKey[agentName] = agentAbilities;
    abKey2Name[agentName] = agentAbTitles;
  }


  await browser.close();

  const data = JSON.stringify(svg2abKey);
  fs.writeFileSync('svg2abKey.json', data);

  const data2 = JSON.stringify(abKey2Name);
  fs.writeFileSync('abKey2Name.json', data2);
}

scrape().then(() => console.log('Scraping complete!'));