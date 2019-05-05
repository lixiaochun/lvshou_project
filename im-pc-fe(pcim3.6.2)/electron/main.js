const electron = require('electron')
const path = require('path');
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app
const ipc = electron.ipcMain
const Tray = electron.Tray
var mainWindow = null;
var timer = null;
const dialog = electron.dialog
const globalShortcut = electron.globalShortcut;
var isNews=false; // 闪烁状态

//登录窗口最小化
ipc.on('window-min', function () {
	mainWindow.minimize();
})
//登录窗口最大化
ipc.on('window-max', function () {
	if(mainWindow.isMaximized()){
      mainWindow.restore();  
  }else{
      mainWindow.maximize(); 
  }
})
// 窗口还原
ipc.on('window-restore', function () {
	 mainWindow.unmaximize();

})
// 关闭隐藏窗口
ipc.on('window-close', function (e) {
	// mainWindow.close();
	if (!mainWindow.isFocused()) {
		mainWindow = null;
	} else {
		e.preventDefault(); /*阻止应用退出*/
		mainWindow.hide(); /*隐藏当前窗口*/
	}
})
// 消息闪烁
ipc.on('news', function () { //news 是自定义的命令 ，只要与页面发过来的命令名字统一就可以
	//系统托盘图标闪烁
	if(!isNews){
		var count = 0;
		timer = setInterval(function () {
			console.log(count)
			count++;
			if (count % 2 == 0) {
				appTray.setImage(path.join(trayIcon, 'empty.ico'))
			} else {
				appTray.setImage(path.join(trayIcon, 'tip.ico'))
			}
		}, 500);
		mainWindow.once('focus', () => mainWindow.flashFrame(false))
		mainWindow.flashFrame(true);
		isNews=true;
	}
	
})

// 取消闪烁
ipc.on('scintillation', function () { //news 是自定义的命令 ，只要与页面发过来的命令名字统一就可以
	//取消闪烁
	appTray.setImage(path.join(trayIcon, 'tip.ico'))
	clearInterval(timer)
	isNews=false;
})

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function () {
	// 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
	// 应用会保持活动状态
	if (process.platform != 'darwin') {
		app.quit();
	}
});
// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function () {
	Menu.setApplicationMenu(null)
	// 创建浏览器窗口。
	mainWindow = new BrowserWindow({
		minWidth: 1024,
		minHeight: 768,
		frame: false,
		resizable: false,
		transparent: true,
		icon: __dirname + 'logo.png',
		show: false,
	});
	mainWindow.on('ready-to-show', function () {
		mainWindow.show();
		mainWindow.focus();
	});
	var trayMenuTemplate = [{
			label: '打开Im',
			click: function () {
				mainWindow.show();
			} //打开相应页面
		},
		{
			label: '退出',
			click: function () {
				app.quit();
				app.quit(); //因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
			}
		}
	];

	// 加载应用的 index.html
	mainWindow.loadURL("http://localhost:8080/");
	// 打开开发工具
	mainWindow.openDevTools();

	// 当 window 被关闭，这个事件会被发出
	mainWindow.on('closed', function () {
		// 取消引用 window 对象，如果你的应用支持多窗口的话，
		// 通常会把多个 window 对象存放在一个数组里面，
		// 但这次不是。
		mainWindow = null;
	});
	mainWindow.on('focus',function () {
	    if(isNews){
	      appTray.setImage(path.join(trayIcon, 'tip.ico'))
	      clearInterval(timer)
	      isNews=false;
	    }
    })
	trayIcon = path.join(__dirname, '');
	appTray = new Tray(path.join(trayIcon, 'tip.ico'));
	appTray.setToolTip('Im');
	appTray.on('click', function () {
		if (!!timer) {
			appTray.setImage(path.join(trayIcon, 'tip.ico'))
			clearInterval(timer)
			isNews=false;
		}
		mainWindow.show();
	})
	const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
	appTray.setContextMenu(contextMenu);

	var handleStartupEvent = function () {
  if (process.platform !== 'win32') {
    return false;
  }

  var squirrelCommand = process.argv[1];

  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':
      install();
      return true;
    case '--squirrel-uninstall':
      uninstall();
      app.quit();
      return true;
    case '--squirrel-obsolete':
      app.quit();
      return true;
  }
    // 安装
  function install() {
    var cp = require('child_process');    
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);
    var child = cp.spawn(updateDotExe, ["--createShortcut", target], { detached: true });
    child.on('close', function(code) {
        app.quit();
    });
  }
   // 卸载
   function uninstall() {
    var cp = require('child_process');    
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);
    var child = cp.spawn(updateDotExe, ["--removeShortcut", target], { detached: true });
    child.on('close', function(code) {
        app.quit();
    });
  }

};

if (handleStartupEvent()) {
  return;
}
});
