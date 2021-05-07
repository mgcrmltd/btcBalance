import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import { AddWalletPageRoutingModule } from './add-wallet-routing.module';

import { AddWalletPage } from './add-wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddWalletPageRoutingModule
  ],
  declarations: [AddWalletPage]
})
export class AddWalletPageModule {}
