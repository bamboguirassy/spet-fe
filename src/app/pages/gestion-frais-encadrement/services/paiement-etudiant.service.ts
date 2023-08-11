import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GfcWebServiceService } from './gfc-web-service.service'
import { TokenManagerService } from 'src/app/shared/services/token-manager.service';


@Injectable({
  providedIn: 'root'
})
export class PaiementEtudiantService {

  constructor(private gfcService: GfcWebServiceService, private tokenManager: TokenManagerService,) { }

  inscriptionId: number = 53377;
  token: string;

  getStatus(): Observable<any> {
    this.token = this.tokenManager.getToken()
    const requestData = {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODg3MzQzNTIsImV4cCI6MTcyMDI3MDM1MiwidXNlcm5hbWUiOiJncGUtd3NAdW5pdi10aGllcy5zbiJ9.h_iyQWFn3AXe946zmNxdRhJsfWUnMOHzyrMPxgN0FnkLbQmHBVPlzsxbO95A52kcDdlBrBsk9PCwuLerkA51y_ONyp83OECEUBU08xpN_o8mK7ovXwNngO7eRMSNIacXJnRXbsq0fzodhqjx7iJtgkEzNuS7JIOC7XqaVjRO4zKsyl1KGF16Bo9LlV5WKSJShDFgBoGoefhz3dYS_do8HkftcS9-nhkMmzfISWaMmFc3Uh8wjFuDd0dcQPXJjLwQXGJan8pO-EDiOFDQ8UFpJuSmiUN6iQGxTJdTdxSsh4VLjL9-gfHI9eTE-Rdi_n2fGWfRp1TcLwLa6xZ0_rqeZtDd2lsTIysA9m53-IXTDg9NTKZ1V1Q89P05LlhgGFECGKNoR3K2svtEylx_OWTW5nyeEzpYrCK9Asy8jsnz05z6cl5AjluXEJvVbgysRD-Jx98h8SJ55PhaT0_9_dweVtc1mr54-4kfRsd9Fr-Dgdy3jWg9GuouV5NnsREvNfG_8GTum4r_wzUDon62siYVC_GRuM2dmGb4y37acMVXOIFw-ehdHhPm2KUz0vFSylDYBXATu2ZMiQy7l5U28N38tHsZmU6VocrEjMwRNBa36IZ0Sy6AU18M71qNNdMJFOyYbJeMfTLnXO7eFHqj2UjgtUvw73sefsQCJvfYfaR00to"
    };
    
    console.log(this.token)
    console.log(this.inscriptionId)
    return this.gfcService.post(`/get-paiement-details/${this.inscriptionId}`,requestData, this.token);
  }

  getPayments(): Observable<any> {
    const requestData = {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODg3MzQzNTIsImV4cCI6MTcyMDI3MDM1MiwidXNlcm5hbWUiOiJncGUtd3NAdW5pdi10aGllcy5zbiJ9.h_iyQWFn3AXe946zmNxdRhJsfWUnMOHzyrMPxgN0FnkLbQmHBVPlzsxbO95A52kcDdlBrBsk9PCwuLerkA51y_ONyp83OECEUBU08xpN_o8mK7ovXwNngO7eRMSNIacXJnRXbsq0fzodhqjx7iJtgkEzNuS7JIOC7XqaVjRO4zKsyl1KGF16Bo9LlV5WKSJShDFgBoGoefhz3dYS_do8HkftcS9-nhkMmzfISWaMmFc3Uh8wjFuDd0dcQPXJjLwQXGJan8pO-EDiOFDQ8UFpJuSmiUN6iQGxTJdTdxSsh4VLjL9-gfHI9eTE-Rdi_n2fGWfRp1TcLwLa6xZ0_rqeZtDd2lsTIysA9m53-IXTDg9NTKZ1V1Q89P05LlhgGFECGKNoR3K2svtEylx_OWTW5nyeEzpYrCK9Asy8jsnz05z6cl5AjluXEJvVbgysRD-Jx98h8SJ55PhaT0_9_dweVtc1mr54-4kfRsd9Fr-Dgdy3jWg9GuouV5NnsREvNfG_8GTum4r_wzUDon62siYVC_GRuM2dmGb4y37acMVXOIFw-ehdHhPm2KUz0vFSylDYBXATu2ZMiQy7l5U28N38tHsZmU6VocrEjMwRNBa36IZ0Sy6AU18M71qNNdMJFOyYbJeMfTLnXO7eFHqj2UjgtUvw73sefsQCJvfYfaR00to"
    };
    return this.gfcService.post(`/get-paiements/${this.inscriptionId}`,requestData, this.token)
  }
}
