import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatabaseService]
})
export class AppComponent {
  constructor(public electronService: ElectronService,
    private translate: TranslateService,
    private activateRoute: ActivatedRoute) {
    translate.setDefaultLang('id');
    if (electronService.isElectron()) {
      console.log('Mode electron');
    } else {
      console.log('Mode web');
    }
  }

  ngOnInit() {
    this.electronService.remote.getCurrentWindow().maximize();
    // this.electronService.remote.getCurrentWindow().webContents.openDevTools();
  }

  minimize() {
    this.electronService.remote.getCurrentWindow().minimize();
  }
  maximize() {
    if (this.electronService.remote.getCurrentWindow().isResizable() == false) {
      this.electronService.remote.getCurrentWindow().unmaximize();
      this.electronService.remote.getCurrentWindow().setResizable(true);
    } else {
      this.electronService.remote.getCurrentWindow().maximize();
      this.electronService.remote.getCurrentWindow().setResizable(false);
    }
  }
  close() {
    this.electronService.remote.getCurrentWindow().close();
  }
}
