const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const ipcRenderer = electron.ipcRenderer
const axios = require('axios')

const notifyBtn = document.getElementById('notifyBtn')
let price = document.getElementById('price')
let targetPrice = document.getElementById('targetPrice')
let targetPriceVal

const notification = {
    title: 'BTC',
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/icons/btc.png')
}

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

function getBTC(){
    axios.get('http://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => {
            const cryptos = res.data.BTC.USD
            price.innerHTML = '$'+ cryptos.toLocaleString('en')

            if(targetPrice.innerHTML != '' && res.data.BTC.USD > targetPriceVal){
                const newNotification = new window.Notification(notification.title, notification)
            }
        })
}

getBTC()
setInterval(() => {
    getBTC()
}, 30000);


ipcRenderer.on('target-price-value', function(e, value){
    targetPriceVal = Number(value)
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en')
})