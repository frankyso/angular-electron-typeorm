import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as settings from 'electron-settings'

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  setting: typeof settings; //https://github.com/nathanbuchar/electron-settings

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.setting = window.require('electron-settings');

    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

  get appName() {
    return this.remote.app.getName();
  }

  get appDocument() {
    return this.remote.app.getPath("documents") + "/" + this.appName;
  }

  documentInit() {
    if (this.fs.existsSync(this.appDocument) == false) {
      this.fs.mkdirSync(this.appDocument);
    }
  }

  documentPut(file, filename) {
    this.documentInit();
    let nfilename = this.makeid(5) + "-" + filename;
    this.fs.writeFileSync(`${this.appDocument}/${nfilename}`, file, 'binary');
    return filename;
  }

  makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  documentGet() {

  }
}
