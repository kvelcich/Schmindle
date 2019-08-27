const { app, dialog } = require('electron').remote;
const fs = require('fs');
const path = require('path');

document.getElementById('myButton').addEventListener('click', () => {
    dialog.showOpenDialog({
        properties: ['openFile'], 
        filters: [ { name: "PDFs", extensions: ['pdf'] } ] 
    }, (filepaths) => {
        const filePath = filepaths[0];

        console.log(filePath)
        console.log(app.getPath('userData'))

        fs.link(filePath, app.getPath('entryPath') + '1.pdf')
        const iframe = document.createElement('iframe');
        iframe.src = path.resolve(__dirname, `../../public/pdfjs/web/viewer.html?file=${filePath}`);

        const viewerElement = document.getElementById('viewer');
        viewerElement.innerHTML = ''; 
        viewerElement.appendChild(iframe);
    })
})

