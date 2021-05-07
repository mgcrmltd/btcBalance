import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor() { }

  getStoredData() {
    return Storage.get({ key: "Wallets" }).then(
      (res) => {
        if(res != null && res != undefined && res.value != null)
          return JSON.parse(res.value);
        else
          return null;
      }
    )
  };

  saveWallets(val: Object[]) {
    var jsonString = JSON.stringify(val);
    Storage.set({ key: "Wallets", value: jsonString });
  }
}
