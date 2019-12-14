const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipcRenderer = electron.ipcRenderer

const closeBtn = document.getElementById('closeBtn')
const updateBtn = document.getElementById('updateBtn')

closeBtn.addEventListener('click', function(e){
    let win = remote.getCurrentWindow()
    win.close()
})

updateBtn.addEventListener('click', function(){
    ipcRenderer.send('update-notification-value', document.getElementById('notifyVal').value)

    let win = remote.getCurrentWindow()
    win.close()
})