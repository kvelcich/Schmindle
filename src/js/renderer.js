const { dialog } = require('electron').remote;
const { basename } = require('path');
const fs = require('fs');
const log = require('electron-log');
const path = require('path');
const config = require('./config');

/*
 * Perhaps we should make these asynchronous?
 *
 * TODO: Some checking we'll need to implement some checks here later on.
 *      -       Check if the file is already added.
 *      -       Check if the file name is already used.
 *      -       Etc.
 */
function addNewEntry(fileName, filePath) {
  if (!fs.existsSync(config.local.collectionPath)) {
    fs.mkdirSync(config.local.collectionPath);
  }

  const linkPath = `${config.local.collectionPath}${fileName}`;
  if (!fs.existsSync(linkPath)) {
    fs.linkSync(filePath, `${config.local.collectionPath}${fileName}`);
    log.info(`Created hard link of ${fileName} at \
            ${config.local.collectionPath}`);
  }
}

document.getElementById('open_pdf').addEventListener('click', () => {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'PDFs', extensions: ['pdf'] }],
  }, (filepaths) => {
    const filePath = filepaths[0];
    const fileName = basename(filePath);

    addNewEntry(fileName, filePath);

    const iframe = document.createElement('iframe');
    iframe.src = path.resolve(__dirname, `../../public/pdf.js/web/viewer.html?file=${filePath}`);

    const viewerElement = document.getElementById('viewer');
    viewerElement.innerHTML = '';
    viewerElement.appendChild(iframe);
  });
});
