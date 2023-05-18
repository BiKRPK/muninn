const puppeteer = require('puppeteer');
const { Semaphore } = require('await-semaphore');
const axios = require('axios');
const fs = require('fs');

const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

const MAX_CONCURRENCY = 1; // Define the maximum number of concurrent executions
const MAX_WINDOW_COUNT = 10; // Maximum allowed browser window count
const concurrencySemaphore = new Semaphore(MAX_CONCURRENCY);
let windowCount = 0;
const clips = [];
let SVGtoAbility = [];
let errors = [];
let lineups = 0;
async function main() {
  

  const rawData1 = await readFileAsync('svg2abKey.json', 'utf8');
  SVGtoAbility = JSON.parse(rawData1);
  

  const rawData = await readFileAsync('clips.json', 'utf8');
  let jsonData = JSON.parse(rawData);

  console.log('File loaded');



  // Create an array of Promises for scraping each item
  // const scrapePromises = jsonData.map((item) => scrape(item, clips, errors));


  // // Limit the concurrency using the semaphore
  // await Promise.all(
  //   scrapePromises.map(async (promise) => {
  //     const release = await concurrencySemaphore.acquire();
  //     try {
  //       await promise;
  //     } finally {
  //       release();
  //     }
  //   })
  // );

  //for (const item of jsonData) {
  for (let i = 0; i<1500; i = i + 100) {
    // Limit the concurrency using the semaphore
    if (windowCount >= MAX_WINDOW_COUNT) { 
      console.log('Max window count reached. Stopping script.');
      break;
    }
    const release = await concurrencySemaphore.acquire();
    try {
      windowCount++;
      lineups++;
      await scrape(jsonData[i], clips, errors);
      windowCount--;
    } catch(error) {
      console.log('Seguimos: ' + error);
      const catchedError = {
        error: `Error occurred while processing ${item.agent}, ${item.map}, ${item.side}, ${item.title}: ${error} \r\n <br>`
      }
      errors.push(catchedError);
    } finally {
      release();
      
      
    }

    if (lineups % 10 == 0) {
      saveData(clips, errors);
    }

  }


  // Close the browser after all scraping is complete
  

  // Rest of your code...

  saveData(clips, errors);
  console.log('ended');
}

function saveData(clips, errors) {
  const data = JSON.stringify(clips);
  fs.writeFileSync('vids.json', data);

  fs.writeFileSync('errorsvids.txt', errors);
}

async function scrape(item, clips, errors) {
  const agent = item.agent;
  const map = item.map;
  const side = item.side;
  const title = item.title;
  const { v4: uuidv4 } = require('uuid');
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      //headless: false,
      args: ['--disable-extensions', '--start-maximized'],
      ignoreHTTPSErrors: true,
    });
  try {
    
    
    // console.log(item.title);
   
    const type = 'LU';
    const url = `https://blitz.gg/valorant/lineups/${map.toLowerCase()}?side=${side.toLowerCase()}&agent=${agent.toLowerCase()}`;

    // Perform operations using agent and title
    const page = await browser.newPage();
    
    // await page.waitForTimeout(5000);
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    // closeOtherBrowsers(url).catch((error) => {
    //   console.error(error);
    // });
    await page.waitForSelector('button.css-47sehv');
    await page.click('button.css-47sehv');

    await page.waitForSelector('ul.⚡10f9359');
    // const lineup = await page.$('ul.⚡10f9359 > li[data-title="'+ title + '"]');
    const titleElement = await page.$('ul.⚡10f9359 > li[data-title^="'+ title + '"] > .⚡b732c378 > .tip-header > span');
    const titleAux = await titleElement?.evaluate((el) => el.textContent?.trim());
    

    const descriptionElement = await page.$('ul.⚡10f9359 > li[data-title^="'+ title + '"] > .⚡b732c378 > .type-caption.tip-description');
    const description = await descriptionElement?.evaluate((el) => el.textContent?.trim());
    

    const abilityElement = await page.$('ul.⚡10f9359 > li[data-title^="'+ title + '"] > .⚡f6f44b85 > .⚡bb582a1b > .ability-icon > path');
    const abilityIcon = await abilityElement?.evaluate((el) => el.getAttribute('d'));
    //console.log(abilityIcon);

    const ability = SVGtoAbility[agent][abilityIcon];
    
            
          
    await page.click('ul.⚡10f9359 > li[data-title^="'+ title + '"]'); // Click on the element
    // await page.waitForTimeout(5000);
    await page.waitForSelector('.⚡85c8d44d > .⚡90fba654 > video > source', {timeout: 100000});
    const videoElement = await page.$('.⚡85c8d44d > .⚡90fba654 > video > source');
    const videoSrc = await videoElement.evaluate((el) => el.getAttribute('src'));
    console.log(title  + " " + videoSrc);
    // await page.waitForTimeout(5000);
    await browser.close();
    const clip = {
      id: uuidv4(),
      agent,
      map,
      side,
      title: titleAux,
      description,
      ability,
      type,
      //abilityIcon,
      src: videoSrc
      
      };
    clips.push(clip);
    // Rest of your scraping logic...
  } catch (error) {
    await browser.close();
    console.error('Error occurred: ' + error);
    const catchedError = {
      error: `Error occurred while processing ${item.agent}, ${item.map}, ${item.side}, ${item.title}: ${error} \r\n <br>`
    }
    errors.push(catchedError);
  } finally {
      // release();
      
  }
}


async function closeOtherBrowsers(browserURL) {
  // const browserURL = 'http://localhost:9222/json'; // Replace with the appropriate browser URL
  const browser = await puppeteer.connect({ browserURL });
  const targets = await browser.targets();

  // Get the ID of the active target
  const activeTargetId = browser.target().page()._targetId;

  // Close all targets except the active target
  for (const target of targets) {
    if (target._targetId !== activeTargetId) {
      await target.page().close();
    }
  }

  // Rest of your code...
}


main().catch((error) => {
  console.error(error);
});

