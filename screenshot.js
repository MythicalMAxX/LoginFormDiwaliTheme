const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    console.log('Launching browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();
    console.log('Navigating to page...');
    await page.goto('file:///app/index.html', { waitUntil: 'networkidle0' });
    console.log('Waiting for animations (e.g., 1.5 seconds)...');
    await new Promise(resolve => setTimeout(resolve, 1500)); // Wait for animations
    console.log('Taking screenshot...');
    await page.screenshot({ path: 'screenshot.png' });
    console.log('Screenshot saved as screenshot.png');
  } catch (err) {
    console.error('Error during puppeteer script execution:', err);
  } finally {
    if (browser) {
      await browser.close();
      console.log('Browser closed.');
    }
  }
})();
