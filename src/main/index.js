import { app, BrowserWindow, ipcMain } from 'electron'

// import { autoUpdater } from "electron-updater"

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let printWindow; 
  
const winURL = process.env.NODE_ENV === 'development' ?
  `http://localhost:9080` :
  `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      webSecurity: false
    }
  })

  mainWindow.maximize();

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function openPrintWindow(args) {
  const windowOptions = {
    width: 1000,
    height: 563,
    title: '打印页',
    show: false,
  }
  printWindow = new BrowserWindow(windowOptions);
  printWindow.loadURL(`file://E:/work/yq-hospital/yq-hospital-admin/hospital-admin/src/renderer/components/print/print.html`);
  printWindow.webContents.on('did-finish-load', () => {
    console.log(args)
    var list = args.date;
    var payType = args.payType;
    var html1 = "";

    var pay = "";
    if(payType != undefined) {
      payType.forEach(item => {
        if(item.amount != 0 && item.amount != undefined) {
          pay += "<span>" + item.pay_type_name + ':</span><span class="moneyclass">' + item.amount + "元</span>";
        }
      })
      pay += '<span>本次收费:</span><span class="moneyclass">' + args.pay + '元</span><span>本次欠款:</span><span class="moneyclass">' + args.arrears + "元</span>";
    }

    for(var z = 0; z < list.length; z++) {
      var html = "";
      for(var i = 0;i < list[z].length; i++) {
        var p = new Object();
        if(list[z][i].position != undefined && list[z][i].position != null) {
          var p = JSON.parse(list[z][i].position);
        } else {
          p.left = "";
          p.right = "";
          p.bottom = ""; 
          p.lebottom = "";
        }
        html += '<tr><td class="left_right">'+
							'<div class="top_left"><span>' + p.left + '</span></div>'+
							'<div class="top_right"><span>'+ p.lebottom + '</span></div>'+
							'<div class="bottom_left"><span>'+ p.bottom +'</span></div>'+
							'<div class="bottom_right"><span>'+ p.right +'</span></div>'+
							'</td><td>'+ list[z][i].name + '</td> <td>'+ list[z][i].quantity +'</td> <td>项</td> <td>'+ list[z][i].unit_price +'</td>'+
							'<td>0</td> <td>'+ list[z][i].unit_price*list[z][i].quantity + '</td></tr></td>';
      }
      html1 +='<div class="section">'+
              '<h1>' + args.hospital_name + '</h1><p><span class="name">姓名:' + args.username + '</span><span class="case">病历号:' + args.case_number +
              '<span class="time" style="display: inline-block; padding-left: 50px; font-weight: bold; text-align: left; font-weight: 400;" id="time">' + args.time + '</span>'+
              '<img class="img" id="barcode' + z + '" /></span></p>'+
							'<div class="table"><table border="0" style="border-collapse:collapse;" class="list"><tr class="top"><th style="text-indent: 12px;">牙位</th>'+
								'<th>处置名称</th><th>数量</th><th>单位</th><th>单价（元）</th><th>折扣</th><th>总价</th></tr>'+ 
                html +'</table><div class="footer">'+
                pay
                    +
                  '<p>合计应收:<span class="total">' + args.all_price + '元</span></p></div><div style="display: inline-block; width: 100%; margin-top: 5px;">'+
                  '<h2 style="display: inline-block; width: 23%; text-align: left; font-weight: 400; text-indent:12px;">收银员:' + args.cashier_name + '</h2>'+
                  '<h2 style="display: inline-block; width: 24%; text-align: left; font-weight: 400;">主治医生:' + args.docter_name + '</h2>'+
                  '<h2 style="display: inline-block; width: 24%; text-align: left; font-weight: 400;">电话:' + args.docter_mobile + '</h2>'+
                  '<span style="display: inline-block;  width: 24%; text-align: left;">顾客签字:</span></div>'+
                  '<div style="display: inline-block; width: 100%; margin-top: 5px; font-weight: 400;">'+
                  '<h2 style="display: inline-block; width: 100%; text-align: left; font-weight: 400; text-indent:12px;">地址:' + args.address + '</h2>'+
                  '</div></div></div>'
    }

    //故使用以下方法调用打印
    printWindow.webContents.executeJavaScript("$('.sectionClass').append('" + html1 + "')");
    for(var z = 0; z < list.length; z++) {
      printWindow.webContents.executeJavaScript("JsBarcode(document.getElementById('barcode" + z + "'), " + args.case_number + ", {'format': 'CODE128','displayValue': false,'fontSize': 18,'height': 100})");
    }
    // printWindow.show();
    printWindow.webContents.executeJavaScript("window.print()");
  })
}

ipcMain.on('print', (event, args) => {
  openPrintWindow(args);
})

app.on('ready', function() {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */


import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update', "新版本下载完成，开始更新!")
})

ipcMain.on("checkForUpdate",()=>{
  //执行自动更新检查
  autoUpdater.quitAndInstall();
})

autoUpdater.on('update-available', function (info) {
  mainWindow.webContents.send('message', "检测到新版本，正在下载...!")
});

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})

 