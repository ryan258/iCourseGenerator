// src/utils/logger.js
const fs = require('fs').promises;
const path = require('path');

async function logToFile(content) {
  const logFile = path.join(__dirname, '../../courses.log');
  await fs.appendFile(logFile, content + '\n\n');
}

module.exports = {
  logToFile
};