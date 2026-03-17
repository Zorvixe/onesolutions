// install-puppeteer.js
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function installPuppeteer() {
  console.log('📦 Installing Puppeteer with Chrome...');
  
  try {
    // First, try to install system dependencies
    console.log('🔧 Installing system dependencies...');
    await execPromise('apt-get update && apt-get install -y wget gnupg');
    
    // Install Chrome
    console.log('🌐 Installing Chrome...');
    await execPromise('wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -');
    await execPromise('echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list');
    await execPromise('apt-get update && apt-get install -y google-chrome-stable');
    
    // Install Puppeteer dependencies
    console.log('📚 Installing Puppeteer dependencies...');
    await execPromise('apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils');
    
    // Install Puppeteer
    console.log('🤖 Installing Puppeteer...');
    await execPromise('npm install puppeteer');
    
    // Set environment variable
    process.env.PUPPETEER_EXECUTABLE_PATH = '/usr/bin/google-chrome-stable';
    
    console.log('✅ Puppeteer installation complete!');
    console.log('🔍 You can now use Chrome at: /usr/bin/google-chrome-stable');
    
  } catch (error) {
    console.error('❌ Installation failed:', error.message);
    process.exit(1);
  }
}

installPuppeteer();