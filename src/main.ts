import { APP_INITIALIZER } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { defineCustomElements as pwaElements} from '@ionic/pwa-elements/loader';
import { defineCustomElements as jeepSqlite} from 'jeep-sqlite/loader';
import { Capacitor } from '@capacitor/core';
import { InitializeAppService } from './app/services/initialize.app.service';
import { SQLiteService } from './app/services/sqlite.service';
import { StorageService } from './app/services/storage.service';
import { DbnameVersionService } from './app/services/dbname-version.service';

// --> Below only required if you want to use a web platform
const platform = Capacitor.getPlatform();
if(platform === "web") {

    // required for toast component in Browser
    pwaElements(window);

    // required for jeep-sqlite Stencil component
    // to use a SQLite database in Browser
    jeepSqlite(window);

    window.addEventListener('DOMContentLoaded', async () => {
        const jeepEl = document.createElement("jeep-sqlite");
        document.body.appendChild(jeepEl);
        jeepEl.autoSave = true;
    });
}
// Define the APP_INITIALIZER factory
export function initializeFactory(init: InitializeAppService) {
  return () => init.initializeApp();
}

bootstrapApplication(AppComponent, {
    providers: [SQLiteService,
        InitializeAppService,
        StorageService,
        DbnameVersionService,
        {
        provide: APP_INITIALIZER,
        useFactory: initializeFactory,
        deps: [InitializeAppService],
        multi: true
        }
    ],
});
