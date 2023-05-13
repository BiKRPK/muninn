const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');

async function scrape() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    "headless": false,
    "args": ["--disable-extensions", '--start-maximized'],
    "ignoreHTTPSErrors": true,
  });
  const page = await browser.newPage();

  const clips = [];
  let errors = '';
  let SVGtoAbility = [];


  fs.readFile('svg2abKey.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      errors += err + '\r\n'
      return;
    }
    
    SVGtoAbility = JSON.parse(data);
    console.log('file loaded');
    // console.log(SVGtoAbility);
  });



  const maps = ["Haven", "Split", "Ascent", "Icebox", "Breeze", "Fracture", "Pearl", "Lotus"];

  const agents = ["Raze","Viper", "Omen", "Sova","Sage", "Phoenix", "Jett", "Cypher", "Brimstone", "Breach", "Reyna","Killjoy", "Skye", "Yoru", "Astra", "Kayo", "Chamber", "Neon","Fade", "Harbor", "Gekko"];

  const sides = ["Attacking", "Defending"];
  const type = 'LU';
  const { v4: uuidv4 } = require('uuid');

  for  (const agent of agents) {
    for  (const map of maps) {
        for (const side of sides) {
            const url = `https://blitz.gg/valorant/lineups/${map.toLowerCase()}?side=${side.toLowerCase()}&agent=${agent.toLowerCase()}`;
            try { 
              await page.setViewport({ width: 1920, height: 1080});
              await page.goto(url, { waitUntil: 'networkidle2' });
              console.log('agente: ' + agent +  ' mapa: ' + map + ' Side: ' + side);
              await page.waitForSelector('ul.⚡10f9359');
              const lineups = await page.$$('ul.⚡10f9359 > li');
              var reload = false;
              for (const lineup of lineups) {
                  try {                  
                    // await page.waitForTimeout(5000);
                    const titleElement = await lineup.$('.tip-header > span');
                    const title = await titleElement?.evaluate((el) => el.textContent?.trim());
                    
                    await Promise.all([
                      page.evaluate((element) => {
                        element.click()
                      }, titleElement),
                      page.waitForNavigation({waitUntil: 'domcontentloaded'})
                    ]);
                    console.log(title + " " + page.url());

                    clips.push(page.url());
                  } catch (error) {
                    console.error(`Error occurred while processing ${agent}, ${map}, ${side}: ${error}`);
                    errors += `Error occurred while processing ${agent}, ${map}, ${side}, ${lineup}: ${error} \r\n <br>`;
                    continue;
                  }
              }
            } catch (error) {
              console.error(`Error occurred while processing ${agent}, ${map}, ${side}: ${error}`);
              errors += `Error occurred while processing ${agent}, ${map}, ${side}: ${error} \r\n <br>`;
              continue;
            }
        }
    }

  }


  await browser.close();

  const data = JSON.stringify(clips);
  fs.writeFileSync('vids.json', data);

  const data2 = JSON.stringify(errors);
  fs.writeFileSync('errorsvids.txt', data2);
}

scrape().then(() => console.log('Scraping complete!'));