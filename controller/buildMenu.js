const { app, Menu, ipcMain } = require("electron");
const action = require("./saveas");

const isMac = process.platform === "darwin";

let event = null;
ipcMain.on("on-opendialog-event", (e, args) => {
  event = e;
});

const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideOthers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: "文件",
    submenu: [
      {
        label: "打开",
        click: () => {
          action.openFile();
        },
      },
      {
        label: "新建",
        click: () => {
          
        },
      },
      { label: "关闭" },
      { label: "另存为" },
      { label: "保存" },
    ],
  },

  {
    label: "段落",
    submenu: [
      { label: "标题" },
      
    ],
  },

  {
    label: "格式",
    submenu: [
      {
        label: "黑体",
      },
     
    ],
  },

  // { role: 'editMenu' }
  {
    label: "编辑",
    submenu: [
      { label: "撤销", role: "undo" },
      { label: "取消撤销", role: "redo" },
      { type: "separator" },
      { label: "剪切", role: "cut" },
      { label: "复制", role: "copy" },
      { label: "粘贴", role: "paste" },
      ...(isMac
        ? [
            { label: "粘贴并匹配", role: "pasteAndMatchStyle" },
            { label: "删除", role: "delete" },
            { label: "全选", role: "selectAll" },
            { type: "separator" },
            {
              label: "朗读",
              submenu: [
                { label: "开始朗读", role: "startSpeaking" },
                { label: "结束朗读", role: "stopSpeaking" },
              ],
            },
          ]
        : [
            { label: "删除", role: "delete" },
            { type: "separator" },
            { label: "全选", role: "selectAll" },
          ]),
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "视图",
    submenu: [
      { label: "重新加载", role: "reload" },
      { label: "强制加载", role: "forceReload" },
      { label: "打开调试", role: "toggleDevTools" },
      { type: "separator" },
      { label: "重置视图", role: "resetZoom" },
      { label: "视图减小", role: "zoomIn" },
      { label: "视图放大", role: "zoomOut" },
      { type: "separator" },
      { label: "全屏幕", role: "togglefullscreen" },
      { label: "最小化", role: "minimize" },
      ...(isMac
        ? [
            { type: "separator" },
            { role: "front" },
            { type: "separator" },
            { role: "window" },
          ]
        : [{ label: "关闭", role: "close" }]),
    ],
  },
  // { role: 'windowMenu' }
  {
    label: "帮助",
    submenu: [
      {
        label: "更多帮助",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://github.com/aiai0603");
        },
      },
    ],
  },
  // {
  //   label: 'actions',
  //   submenu: [
  //     {
  //       label: '添加',
  //       click: () => {
  //         event.sender.send('on-renderer-event', 'add')
  //       },
  //       accelerator: 'CommandOrControl+Alt+O'
  //     }
  //   ],
  // }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
