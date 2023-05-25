const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');



async function scrape() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    // executablePath: 'C:\\Program Files\\Mozilla Firefox\\firefox.exe',
    "headless": false,
    "args": [
      "--disable-extensions", 
      '--start-maximized',
      '--window-size=1920,1080',
      '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36"'
    ],
    "ignoreHTTPSErrors": true,
  });
  const page = await browser.newPage();
  page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36"
  );

  const clips = [];
  let errors = '';

            const url = `https://strats.gg/game/valorant/lineups`;
            try { 
              await page.setViewport({ width: 1920, height: 1080});
              await page.goto(url, { waitUntil: 'networkidle2' });
              await page.waitForSelector('.list');
              const agents = await page.$$('.list > li');
              for (const agent of agents) {
                  try { 

                    const agentNameElement = await agent.$('.name');
                    const agentName = await agentNameElement?.evaluate((el) => el.textContent?.trim());
                    console.log(agentName);

                    agent.click();
                    page.waitForNavigation({waitUntil: 'domcontentloaded'});
                    await page.waitForTimeout(1000);
                    await page.waitForSelector('.utilities__list', {timeout: 100000});
                    const abilities = await page.$$('.utilities__list > div');
                    console.log('Number of elements found:', abilities.length);
                    
                    let cJson = {};
                    let qJson = {};
                    let eJson = {};
                    let xJson = {};
                    if(abilities.length == 5) {
                      const cTitle = await abilities[0].evaluate((el) => el.getAttribute('title'));
                      const cIconContainer = await abilities[0].$('img');
                      const cIcon = await cIconContainer.evaluate((el) => el.getAttribute('src'));
                      cJSON = {
                        title: cTitle,
                        src: cIcon
                      }

                      const qTitle = await abilities[1].evaluate((el) => el.getAttribute('title'));
                      const qIconContainer = await abilities[1].$('img');
                      const qIcon = await qIconContainer.evaluate((el) => el.getAttribute('src'));
                      qJSON = {
                        title: qTitle,
                        src: qIcon
                      }

                      const eTitle = await abilities[3].evaluate((el) => el.getAttribute('title'));
                      const eIconContainer = await abilities[3].$('img');
                      const eIcon = await eIconContainer.evaluate((el) => el.getAttribute('src'));
                      eJSON = {
                        title: eTitle,
                        src: eIcon
                      }

                      const xTitle = await abilities[4].evaluate((el) => el.getAttribute('title'));
                      const xIconContainer = await abilities[4].$('img');
                      const xIcon = await xIconContainer.evaluate((el) => el.getAttribute('src'));
                      xJSON = {
                        title: xTitle,
                        src: xIcon
                      }
                      
                    } else {
                      const cTitle = await abilities[0].evaluate((el) => el.getAttribute('title'));
                      const cIconContainer = await abilities[0].$('img');
                      const cIcon = await cIconContainer.evaluate((el) => el.getAttribute('src'));
                      cJSON = {
                        title: cTitle,
                        src: cIcon
                      }
                        
                      const qTitle = await abilities[1].evaluate((el) => el.getAttribute('title'));
                      const qIconContainer = await abilities[1].$('img');
                      const qIcon = await qIconContainer.evaluate((el) => el.getAttribute('src'));
                      qJSON = {
                        title: qTitle,
                        src: qIcon
                      }

                      const eTitle = await abilities[2].evaluate((el) => el.getAttribute('title'));
                      const eIconContainer = await abilities[2].$('img');
                      const eIcon = await eIconContainer.evaluate((el) => el.getAttribute('src'));
                      eJSON = {
                        title: eTitle,
                        src: eIcon
                      }

                      const xTitle = await abilities[3].evaluate((el) => el.getAttribute('title'));
                      const xIconContainer = await abilities[3].$('img');
                      const xIcon = await xIconContainer.evaluate((el) => el.getAttribute('src'));
                      xJSON = {
                        title: xTitle,
                        src: xIcon
                      }
                      
                    }                   
                    

                    const abilitiesJSON = {
                    C: cJSON,
                    Q: qJSON,
                    E: eJSON,
                    X: xJSON,                    
                    };

                    const agentJSON = {
                      agentName: agentName,
                      agentAbilities: abilitiesJSON
                    }
                  
                    clips.push(agentJSON);
                  } catch (error) {
                    console.error(`Error occurred while processing  ${error}`);
                    errors += `Error occurred while processing  ${error} \r\n <br>`;
                    continue;
                  }
              }
            } catch (error) {
              console.error(`Error occurred while processing ${error}`);
              errors += `Error occurred while processing ${error} \r\n <br>`;
            }



  await browser.close();

  const data = JSON.stringify(clips);
  fs.writeFileSync('abilities.json', data);

  const data2 = JSON.stringify(errors);
  fs.writeFileSync('errors.txt', data2);
}

scrape().then(() => console.log('Scraping complete!'));