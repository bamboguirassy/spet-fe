import { Injectable } from '@angular/core';
import { GfcWebServiceService } from './gfc-web-service.service';
import { TokenManagerService } from 'src/app/shared/services/token-manager.service';

@Injectable({
  providedIn: 'root'
})
export class PaiementTemporaireService {

  constructor(private webService: GfcWebServiceService, private tokenManager: TokenManagerService) { }

  public getDetailsTransactionEnCours(): Promise<any> {
    // const transactionId = this.tokenManager.getTransactionId(); // Obtenez le numéro de transaction depuis le TokenManagerService
    const transactionId = "15";

    const endpoint = `/etudiant/transaction-en-cours/${transactionId}`;
    const token = this.tokenManager.getToken();

    return this.webService.get(endpoint, token).toPromise();
  }

}
