// locate a Chrome / Chromium / Edge executable for puppeteer-core. Override with the CHROME_PATH environment variable.
const fs = require('fs');
module.exports = () => {
  const c = [process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'];
  const p = c.find(x => x && fs.existsSync(x));
  if (!p) throw new Error('Chrome not found. Set CHROME_PATH to your Chrome/Chromium/Edge executable.');
  return p;
};