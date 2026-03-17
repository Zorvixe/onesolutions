// check-chrome.js
const { exec } = require('child_process');
const fs = require('fs');
const util = require('util');
const execPromise = util.promisify(exec);

async function checkChrome() {
  console.log('🔍 Checking Chrome/Chromium installation...');
  
  // Check common paths
  const paths = [
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/snap/bin/chromium',
  ];
  
  console.log('\n📁 Checking common paths:');
  for (const path of paths) {
    const exists = fs.existsSync(path);
    console.log(`  ${path}: ${exists ? '✅ Found' : '❌ Not found'}`);
  }
  
  // Try to find using which command
  try {
    const { stdout: chromePath } = await execPromise('which google-chrome-stable');
    console.log(`\n🔍 which google-chrome-stable: ${chromePath.trim() || 'Not found'}`);
  } catch (e) {
    console.log('❌ google-chrome-stable not found in PATH');
  }
  
  try {
    const { stdout: chromiumPath } = await execPromise('which chromium-browser');
    console.log(`🔍 which chromium-browser: ${chromiumPath.trim() || 'Not found'}`);
  } catch (e) {
    console.log('❌ chromium-browser not found in PATH');
  }
  
  // Check Puppeteer configuration
  console.log('\n🤖 Checking Puppeteer:');
  try {
    const puppeteer = require('puppeteer');
    const executablePath = puppeteer.executablePath();
    console.log(`  Puppeteer default executable path: ${executablePath}`);
    console.log(`  File exists: ${fs.existsSync(executablePath) ? '✅' : '❌'}`);
  } catch (e) {
    console.log('  Error getting Puppeteer path:', e.message);
  }
  
  // Check environment variable
  console.log(`\n🌍 PUPPETEER_EXECUTABLE_PATH: ${process.env.PUPPETEER_EXECUTABLE_PATH || 'Not set'}`);
}

checkChrome();