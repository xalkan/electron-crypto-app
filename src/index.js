const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow

const notifyBtn = document.getElementById('notifyBtn')

notifyBtn.addEventListener('click', function(e){
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({ 
        frame: false, 
        width: 400, 
        height: 200,
        transparent:true,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true
        }
    })
    
    win.on('close', function() { win == null })
    
    win.loadURL(modalPath)
    win.show()
})