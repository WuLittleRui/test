const {ipcRenderer} = require('electron');

const printBtn = document.getElementById('print');

printBtn.addEventListener('click', (event) => {
    ipcRenderer.send('print');
})