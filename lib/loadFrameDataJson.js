const glob = require('glob');
const fs = require('fs');

function loadFrameDataJson(globPattern) {
  return new Promise((resolve) => {
    resolve(glob.sync(globPattern).map((pathToFile) => {
      const fileContents = fs.readFileSync(pathToFile, 'utf-8');
      try {
        return JSON.parse(fileContents);
      } catch (e) {
        throw new Error(`A file did not contain valid JSON: ${pathToFile}`);
      }
    }).filter(fileObject => (fileObject !== null)));
  });
}

module.exports = loadFrameDataJson;
