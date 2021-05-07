import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {StorageService} from '../services/storage.service';
import {BitcoinBalanceService} from '../services/bitcoin-balance.service'

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.page.html',
  styleUrls: ['./add-wallet.page.scss'],
})
export class AddWalletPage implements OnInit {
  loginForm: FormGroup;

  validation_messages = {
    'walletName': [
        { type: 'minlength', message: 'Wallet name must be at least 3 characters' },
        { type: 'maxlength', message: 'Wallet name must be max 10 characters' }
      ],
      'bitcoinAddress': [
        { type: 'minlength', message: 'Address must be at least 34 characters' },
        { type: 'maxlength', message: 'Address must be max 42 characters' }
      ],
    }

  constructor(private navCtrl: NavController, private storageService:StorageService, private btcService: BitcoinBalanceService) { }

  ngOnInit() {
   
    this.loginForm = new FormGroup({
      walletName : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      bitcoinAddress: new FormControl(null, [Validators.required, Validators.minLength(34)]),
  });
  }

  addWallet(){
    var obj = new Object();
    obj["name"] = this.loginForm.controls.walletName.value.trim();
    obj["address"] = this.loginForm.controls.bitcoinAddress.value.trim();

    this.btcService.validateAddress(this.loginForm.controls.bitcoinAddress.value.trim()).then(
      res =>{
        if(res == false) 
        {
          alert('Invalid address');
        }
        else{
          this.storageService.getStoredData().then(
            x => {
              if(x == null)
                this.storageService.saveWallets( [obj]);
              else{
                x.push(obj);
                this.storageService.saveWallets(x);
              }
            }
          )
          this.navCtrl.navigateBack("/home");
        }
      },
      err =>{
        alert('Invalid address');
      }
    );
  }

  cancel(){
    this.navCtrl.navigateBack("/home");
  }
}
