const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');

async function scrape() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    "headless": false,
    "args": ["--disable-extensions", '--start-maximized'],
    "ignoreHTTPSErrors": true,
  });
  const page = await browser.newPage();

  const clips = [];
  let errors = '';
  let SVGtoAbility = [];

  fs.readFile('abilities.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      errors += err + '\r\n'
      return;
    }
    
    SVGtoAbility = JSON.parse(data);
    console.log('file loaded');
    // console.log(SVGtoAbility);
  });

  const maps = ["Haven"]//, "Split", "Ascent", "Icebox", "Breeze", "Fracture", "Pearl", "Lotus"];

  const agents = ["Raze"]//,"Viper", "Omen", "Sova","Sage", "Phoenix", "Jett", "Cypher", "Brimstone", "Breach", "Reyna","Killjoy", "Skye", "Yoru", "Astra", "Kayo", "Chamber", "Neon","Fade", "Harbor", "Gekko"];

  const sides = ["Attacking", "Defending"];

  const difficulties = ["Easy", "Medium", "Pro"];

  const { v4: uuidv4 } = require('uuid');

  for  (map of maps) {
    for (agent of agents) {
        for (side of sides) {
            for (difficulty of difficulties) {
                const url = `https://blitz.gg/valorant/videos?agent=${agent}&map=${map}&difficulty=${difficulty}&side=${side}`;
                try { 
                    await page.setViewport({ width: 1920, height: 1080});
                    await page.goto(url, { waitUntil: 'networkidle2' });
                    console.log('agente: ' + agent +  ' mapa: ' + map + ' Side: ' + side);
                    await page.waitForSelector('div.⚡27578a69');
                    const lineups = await page.$$('div.⚡27578a69 > div.fb6a514b');
                    for (const lineup of lineups) {
                        try { 
                            // await page.waitForTimeout(5000);
                            const titleElement = await lineup.$('.tip-header > span');
                            const title = await titleElement?.evaluate((el) => el.textContent?.trim());
                            console.log(title);

                            const descriptionElement = await lineup.$('.type-caption.tip-description');
                            const description = await descriptionElement?.evaluate((el) => el.textContent?.trim());
                            console.log(description);

                            const abilityElement = await lineup.$('.ability-icon > path');
                            const abilityIcon = await abilityElement?.evaluate((el) => el.getAttribute('d'));
                            //console.log(abilityIcon);

                            const ability = SVGtoAbility[agent][abilityIcon];
                            console.log(ability);
                            // await Promise.all([
                            //   page.evaluate((element) => {
                            //     element.click()
                            //   }, titleElement),
                            //   page.waitForNavigation({waitUntil: 'domcontentloaded'})
                            // ]);
                            
                            // await page.waitForTimeout(1000);
                            // await page.waitForSelector('.⚡85c8d44d > .⚡90fba654 > video > source', {timeout: 100000});
                            // const videoParentElement = await page.$('.⚡85c8d44d > .⚡90fba654');
                            // const videoElement = await videoParentElement.$('video > source');
                            // const videoSrc = await videoElement.evaluate((el) => el.getAttribute('src'));
                            // const closeVideoElement = await videoParentElement.$('.⚡82426748');
                            
                            // await Promise.all([
                            //   page.evaluate((element) => {
                            //     element.click()
                            //   }, closeVideoElement),
                            //   page.waitForNavigation({waitUntil: 'domcontentloaded'})
                            // ]);
                            // console.log(videoSrc);

                            // await page.waitForTimeout(1000);
                            let Site = "Uknown";
                            const clip = {
                            id: uuidv4(),
                            data: {
                                agent,
                                map,
                                side,
                                title,
                                description,
                                ability,
                                //abilityIcon,
                                // videoSrc
                            }
                            };
                        
                            clips.push(clip);
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
  }


  await browser.close();

  const data = JSON.stringify(clips);
  fs.writeFileSync('razeclips.json', data);

  const data2 = JSON.stringify(errors);
  fs.writeFileSync('errors.txt', data2);
}

scrape().then(() => console.log('Scraping complete!'));