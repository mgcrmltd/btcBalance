import { Plugins } from '@capacitor/core';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service'
import { BitcoinBalanceService } from '../services/bitcoin-balance.service'
const { Browser } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  walletInfos: any = [];
  coinTotal: string = "0";
  usdTotal: string = "£0.00";


  constructor(private navCtrl: NavController, private alertController: AlertController,
    private storageService: StorageService, private bitcoinBalanceService: BitcoinBalanceService) {

  }

  ngOnInit(): void {
  }

  ionViewWillEnter(): void {
    this.updateWallets();
  }


  updateWallets() {
    this.storageService.getStoredData().then(x => {
      this.walletInfos = x;
      this.showTotals();
    });
  }

  delete(walletInfo) {
    this.walletInfos = this.walletInfos.filter(x => x["name"] != walletInfo["name"]);
    this.storageService.saveWallets(this.walletInfos);
    this.updateWallets();
  }

  addWallet() {
    this.navCtrl.navigateForward("/add-wallet");
  }

  async showDetails(walletInfo: Object) {
    console.log(JSON.stringify(walletInfo));

    var wi = await this.bitcoinBalanceService.getBalance([walletInfo]);
    var btcUsd = await this.bitcoinBalanceService.getBtcUsd();
    
    var btcCount = wi[walletInfo["address"]]["final_balance"] / 100000000;

    const alert = await this.alertController.create({
      header: walletInfo["name"],
      subHeader: btcCount.toString() + " Btc",
      message: "$" + (btcCount * +btcUsd["price"]).toFixed(2),
      buttons: ['OK']
    });

    await alert.present();
  }

  async showGoogleConversion(){
    //I could not find a free currency coversion API
    await Browser.open({ url: 'https://duckduckgo.com/?q=' + this.usdTotal +'+usd+in+gbp' });
  }

  async showTotals(){
    var wi = await this.bitcoinBalanceService.getBalance(this.walletInfos);

    var gg = this.walletInfos.map((x) => {return wi[x["address"]]["final_balance"] / 100000000});

    this.coinTotal = gg.reduce((a, b) => a + b, 0);
    var btcUsd = await this.bitcoinBalanceService.getBtcUsd();

    this.usdTotal = (+this.coinTotal * +btcUsd["price"]).toFixed(2);
  }

}
