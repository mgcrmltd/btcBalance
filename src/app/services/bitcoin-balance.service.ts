import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BitcoinBalanceService {

  constructor(private httpClient: HttpClient) { }

  async getBalance(walletInfos: Object[]){

    var sArr: String[] = walletInfos.map((x) => {return x["address"]});
    var qs = sArr.toString().replaceAll(',','|');
    return this.httpClient.get("https://blockchain.info/balance?active=" + qs).toPromise().then(
      x => { return x;}
    )
  }

  async validateAddress(address: string) : Promise<boolean>{
    return this.httpClient.get("https://blockchain.info/balance?active=" + address).toPromise().then(
      x => { 
        return true;
      },
      error => {
        return false;
      }
    )
  }

  getBtcUsd(){
    return this.httpClient.get("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT").toPromise();
  }
}
