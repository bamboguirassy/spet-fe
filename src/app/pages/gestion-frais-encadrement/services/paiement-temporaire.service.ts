import { Injectable } from '@angular/core';
import { GfcWebServiceService } from './gfc-web-service.service';
import { TokenManagerService } from 'src/app/shared/services/token-manager.service';

@Injectable({
  providedIn: 'root'
})
export class PaiementTemporaireService {


  constructor(private webService: GfcWebServiceService, private tokenManager: TokenManagerService) { }

  public getDetailsTransactionEnCours(inscriptionId: number): Promise<any> {
    const endpoint = `/etudiant/transaction-en-cours/${inscriptionId}`;
    const token = this.tokenManager.getToken();
    console.log(token)
    const data = { token: token }; 

    return this.webService.post(endpoint, data).toPromise();
  }

}


